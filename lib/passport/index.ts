import config from "config";
import P from "bluebird";
import passport from "passport";
import Cookies from "cookies";
import { Strategy, ExtractJwt } from "passport-jwt";

import log from "@/lib/log";
import { sesoAuthCookieName } from "@/client-state/constants";
import type { TypedSesoNextApiRequest, SesoAuthToken } from "@/lib/types";

const options = {
  jwtFromRequest: (request) => {
    const cookies = new Cookies(request);
    const authCookie = cookies.get(sesoAuthCookieName);
    const bearerToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    const finalToken = bearerToken || authCookie;

    if (bearerToken) {
      log.info(`User session present via Bearer Token: ${bearerToken}`);
      return bearerToken;
    }

    if (authCookie) {
      log.info(`User session present via Cookie Token: ${authCookie}`);
      return authCookie;
    }

    if (finalToken) return finalToken;

    return log.info("Neither Bearer nor Cookie token - no user session present.");
  },
  secretOrKey: config.get("passport.secret"),
  passReqToCallback: true,
};

passport.use(
  "jwt",
  new Strategy(options, async (req: TypedSesoNextApiRequest<any>, jwtPayload: SesoAuthToken | null, done) => {
    if (!jwtPayload) return done(null, false);

    const [user, impersonatingUser] = await P.all([
      req.services.Users.findUserById(jwtPayload.id, { relations: ["enterprise"] }),
      jwtPayload.impersonatingUserId ? req.services.Users.findUserById(jwtPayload.impersonatingUserId) : null,
    ]);

    if (user) {
      log.info(`Passport Session present for user: ${user.id}`);
      return done(null, { user, impersonatingUser });
    } else {
      return done(null, false);
    }
  })
);

export default passport;
