import { body } from "express-validator";
import Boom from "@hapi/boom";

import { ezRoute, ezHandler } from "@/lib";
import type { TypedSesoNextApiRequest, TypedSesoNextApiResponse } from "@/lib/types";
import { getJwtForUser } from "@/lib/auth";
import type User from "@/repositories/entities/user";
import type Enterprise from "@/repositories/entities/enterprise";

export type TLoginUserResponse = {
  token: string;
  user: User;
  enterprise: Enterprise;
};

export type TLoginUserParams = {
  email: string;
  password: string;
};

export default ezRoute().post(
  ezHandler<TypedSesoNextApiRequest<TLoginUserParams>, TypedSesoNextApiResponse<TLoginUserResponse>>({
    validation: [body("email").isEmail(), body("password").isString()],
    handler: async (req, res) => {
      const { email, password } = req.body;

      const user = await req.services.Users.validateUserCredentials({
        email,
        passwordToCompare: password,
      });

      if (user) {
        const token = getJwtForUser({
          userId: user.id,
          email: user.email,
        });

        const enterprise = user.enterprise;

        delete user.enterprise;

        return res.json({ token, user, enterprise });
      }
      throw Boom.notFound("Not found.");
    },
  })
);
