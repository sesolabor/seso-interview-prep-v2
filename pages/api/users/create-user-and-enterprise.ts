import { body } from "express-validator";

import { ezRoute, ezHandler } from "@/lib";
import { getJwtForUser } from "@/lib/auth";
import type { AsyncReturnType, TypedSesoNextApiRequest, TypedSesoNextApiResponse } from "@/lib/types";
import { IServices } from "@/services/types";

type CParams = Parameters<IServices["Users"]["createUserAndEnterprise"]>[0];
type UserCreateParams = CParams["user"] & { passwordConfirmation: string };
type EnterpriseCreateParams = CParams["enterprise"];

export type TCreateUserAndEnterpriseParams = {
  user: UserCreateParams;
  enterprise: EnterpriseCreateParams;
};
export type TCreateUserAndEnterpriseResponse = AsyncReturnType<IServices["Users"]["createUserAndEnterprise"]> & {
  token: string;
};

export default ezRoute().post(
  ezHandler<
    TypedSesoNextApiRequest<TCreateUserAndEnterpriseParams>,
    TypedSesoNextApiResponse<TCreateUserAndEnterpriseResponse>
  >({
    validation: [
      body("user.email").isEmail(),
      body("user.firstName").isString(),
      body("user.lastName").isString(),
      body("user.jobTitle").isString(),
      body("user.phoneNumber").isString(),
      body("user.password").isLength({ min: 6 }),
      body("user.passwordConfirmation").custom((value, { req }) => {
        if (value === req.body.user.password) return true;
        throw new Error("Password confirmation does not match password");
      }),
      body("enterprise.legalName").isString(),
      body("enterprise.isFirstTimeHiringH2a").isBoolean().optional(), // Is this being used?
    ],
    handler: async (req, res) => {
      const { enterprise, user } = req.body;

      const { user: newUser, enterprise: newEnterprise } = await req.services.Users.createUserAndEnterprise({
        user,
        enterprise,
      });

      const token: string = getJwtForUser({
        userId: newUser.id,
        email: newUser.email,
      });

      return res.json({ token, user: newUser, enterprise: newEnterprise });
    },
  })
);
