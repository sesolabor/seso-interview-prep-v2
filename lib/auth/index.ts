import config from "config";
import { sign } from "jsonwebtoken";

const secret = config.get("passport.secret");

export const getJwtForUser = (loginParams: { userId: number; email: string; impersonatingUserId?: number | null }) => {
  const token = sign(
    { email: loginParams.email, id: loginParams.userId, impersonatingUserId: loginParams.impersonatingUserId },
    secret
  );

  return token;
};
