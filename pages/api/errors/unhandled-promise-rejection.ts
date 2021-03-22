import { ezRoute, ezHandler } from "@/lib";
import type { TypedSesoNextApiRequest, TypedSesoNextApiResponse } from "@/lib/types";

export default ezRoute().get(
  ezHandler<TypedSesoNextApiRequest<void>, TypedSesoNextApiResponse<{ message: string }>>({
    handler: async (req, res, next) => {
      Promise.reject("unhandled-promise-rejection");
      return res.json({ message: "Rejected promise" });
    },
  })
);
