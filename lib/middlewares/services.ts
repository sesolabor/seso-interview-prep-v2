import type { SesoNextApiRequest, SesoNextApiResponse, NextCallbackSignature } from "@/lib/types";
import repositories from "@/repositories";
import serviceConstructor from "@/services";

let services;
export const attachServicesMiddleware = (
  req: SesoNextApiRequest,
  res: SesoNextApiResponse,
  next: NextCallbackSignature
) => {
  req.repositories = repositories();
  req.services = services || serviceConstructor(req.repositories);
  services = req.services;
  next();
};
