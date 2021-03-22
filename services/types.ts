import userServiceConstructor from "./user";
import enterpriseServiceConstructor from "./enterprise";
export interface IServices {
  Users: ReturnType<typeof userServiceConstructor>;
  Enterprises: ReturnType<typeof enterpriseServiceConstructor>;
}
