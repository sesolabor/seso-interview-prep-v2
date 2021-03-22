import * as R from "ramda";

import passport from "@/lib/passport";
import log from "@/lib/log";
import type { NextCallbackSignature, TypedSesoNextApiRequest, TypedSesoNextApiResponse } from "@/lib/types";
import type User from "@/repositories/entities/user";

const executionContextMiddleware = async (
  req: TypedSesoNextApiRequest<any>,
  res: TypedSesoNextApiResponse<any>,
  next: NextCallbackSignature
) => {
  return passport.authenticate(
    "jwt",
    { session: false, failWithError: true },
    (error: any, hydratedJwtPayload: { user: User | null }) => {
      if (error) return next(error);

      const { user } = hydratedJwtPayload;

      req.ec = {
        apiUrl: req.originalUrl || req.url,
        apiMethod: req.method,
        requestId: R.pathOr(null, ["headers", "x-request-id"], req),
        user: user || null,
        enterprise: user ? user.enterprise : null,
      };

      if (user) log.info(`Seso Session present for user: ${user.id}`);

      return next();
    }
  )(req, res, next);
};

export default executionContextMiddleware;
