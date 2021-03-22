import { getConnection } from "typeorm";
import type { IRepositories } from "@/repositories/types";
import type { IServices } from "@/services/types";
import userServiceConstructor from "./user";
import enterpriseServiceConstructor from "./enterprise";

// * Why do we do this? *
// There's often a wierd moment where Services need to reference other services.
// This is a clean way to achieve that.
const services = {} as IServices;

const servicesConstructor = (repos: IRepositories): IServices => {
  const connection = getConnection();
  services.Users = userServiceConstructor(repos, services, connection);
  services.Enterprises = enterpriseServiceConstructor(repos, services, connection);
  return services;
};

export default servicesConstructor;
