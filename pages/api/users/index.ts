import { body } from "express-validator";

import { ezRoute, ezHandler } from "@/lib";
import type { TypedSesoNextApiRequest, TypedSesoNextApiResponse } from "@/lib/types";
import { getJwtForUser } from "@/lib/auth";
import User from "@/repositories/entities/user";

export type TCreateUserResponse = { token: string; user: User };

export type TCreateUserParams = Omit<User, "id" | "createdAt" | "updatedAt" | "enterprise" | "toString" | "toJSON"> & {
  passwordConfirmation: string;
};

export default ezRoute().post(
  ezHandler<TypedSesoNextApiRequest<TCreateUserParams>, TypedSesoNextApiResponse<TCreateUserResponse>>({
    validation: [
      body("email").isEmail(),
      body("password").isLength({ min: 6 }),
      body("passwordConfirmation").custom((value, { req }) => {
        if (value !== req.body.password) throw new Error("Password confirmation does not match password");
        return true;
      }),
    ],
    handler: async (req, res, next) => {
      const user = await req.services.Users.createUser({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        jobTitle: req.body.jobTitle,
      });
      const token = getJwtForUser({ email: user.email, userId: user.id });
      return res.json({ token, user });
    },
  })
);
