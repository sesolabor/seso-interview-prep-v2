import { getRepository } from "typeorm";
import entities from "./entities";

const repositoriesConstructor = () => ({
  User: getRepository(entities.User),
  UserPasswordResetToken: getRepository(entities.UserPasswordResetToken),
  Enterprise: getRepository(entities.Enterprise),
});

export default repositoriesConstructor;
