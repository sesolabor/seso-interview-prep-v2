import type { Connection } from "typeorm";
import type { IRepositories } from "@/repositories/types";
import type { IServices } from "@/services/types";
import type { IExecutionContext } from "@/lib/types";

const getEnterpriseById = (repos: IRepositories, services: IServices, connection: Connection) => async (
  enterpriseId: number,
  ec: IExecutionContext
) => {
  return repos.Enterprise.findOne({ id: enterpriseId });
};

const serviceConstructor = (repos: IRepositories, services: IServices, connection: Connection) => ({
  getEnterpriseById: getEnterpriseById(repos, services, connection),
});

export default serviceConstructor;
