import { ezRoute, ezHandler } from "@/lib";
import type { TypedSesoNextApiRequest, TypedSesoNextApiResponse } from "@/lib/types";
import User from "@/repositories/entities/user";

export default ezRoute().get(
  ezHandler<TypedSesoNextApiRequest<void>, TypedSesoNextApiResponse<{ message: string }>>({
    handler: async (req, res, next) => {
      await req.repositories.User.createQueryBuilder().select("fakevalue").from(User, "u").where("u.id=1").getOne();
      return res.json({ message: "Should not get here" });
    },
  })
);
