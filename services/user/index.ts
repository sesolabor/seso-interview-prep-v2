import type { Connection, FindOneOptions } from "typeorm";
import Boom from "@hapi/boom";
import { generateHash, validPassword } from "@/services/user/utils";
import type { IRepositories } from "@/repositories/types";
import type { IServices } from "@/services/types";
import type User from "@/repositories/entities/user";
import type Enterprise from "@/repositories/entities/enterprise";

const createUser = (repos: IRepositories, services: IServices, conection: Connection) => async ({
  email,
  password,
  firstName,
  lastName,
  jobTitle,
}: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
}) => {
  const hashedPassword = await generateHash(password);
  const user = await repos.User.save({
    email,
    password: hashedPassword,
    firstName,
    lastName,
    jobTitle,
  });
  delete user.password;
  return user;
};

const validateUserCredentials = (repos: IRepositories, services: IServices, conection: Connection) => async ({
  email,
  passwordToCompare,
}: {
  email: string;
  passwordToCompare: string;
}) => {
  const user = await repos.User.findOne(
    { email },
    { relations: ["enterprise"], select: ["id", "password", "email", "createdAt", "updatedAt"] }
  );

  if (user) {
    const isMatch = await validPassword(passwordToCompare, user.password);
    if (isMatch) {
      delete user.password;
      return user;
    }
  }

  return null;
};

const findUserById = (repos: IRepositories, services: IServices, conection: Connection) => async (
  id: number,
  options: FindOneOptions = {}
) => {
  const user = await repos.User.findOne(id, options);
  // Todo: Handle this somewhere deeper
  if (user) delete user.password;
  return user;
};

const createUserAndEnterprise = (repos: IRepositories, services: IServices, connection: Connection) => async ({
  user,
  enterprise,
}: {
  user: Partial<User>;
  enterprise: Partial<Enterprise>;
  // user: { email: string; password: string; jobTitle: string; firstName: string; lastName: string };
  // enterprise: { legalName: string; isFirstTimeHiringH2a: boolean };
}): Promise<{ user: User; enterprise: Enterprise }> => {
  const existsAlready = await repos.User.count({ email: user.email });

  if (existsAlready) throw Boom.conflict("Account already exists.");

  return new Promise(async (res) => {
    await connection.transaction(async (manager) => {
      const hashedPassword = await generateHash(user.password);
      const newUser = await manager.save(
        repos.User.create({
          ...user,
          password: hashedPassword,
        })
      );

      const newEnterprise = await manager.save(
        repos.Enterprise.create({
          ...enterprise,
          employees: [newUser],
        })
      );

      res({ user: newUser, enterprise: newEnterprise });
    });
  });
};

const getUsers = (repos: IRepositories, services: IServices, connection: Connection) => async () => {
  return repos.User.find({});
};

const serviceConstructor = (repos: IRepositories, services: IServices, connection: Connection) => ({
  createUserAndEnterprise: createUserAndEnterprise(repos, services, connection),
  createUser: createUser(repos, services, connection),
  findUserById: findUserById(repos, services, connection),
  validateUserCredentials: validateUserCredentials(repos, services, connection),
  getUsers: getUsers(repos, services, connection),
});

export default serviceConstructor;
