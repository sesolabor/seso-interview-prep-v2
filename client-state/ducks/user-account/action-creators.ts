import { createAction } from "typesafe-actions";
import type { TCreateUserAndEnterpriseParams } from "@/pages/api/users/create-user-and-enterprise";
import type { TCreateUserParams } from "@/pages/api/users";
import type { TLoginUserParams } from "@/pages/api/users/login";
import type Enterprise from "@/repositories/entities/enterprise";
import actions from "./actions";

export default {
  createUser: createAction(actions.createUser, (payload: TCreateUserParams) => payload)(),
  loginUser: createAction(actions.loginUser, (payload: TLoginUserParams) => payload)(),
  createUserAndEnterprise: createAction(
    actions.createUserAndEnterprise,
    (payload: TCreateUserAndEnterpriseParams) => payload
  )(),
  logoutUser: createAction(actions.logoutUser, (payload: void) => payload)(),
  loadEnterprise: createAction(actions.loadEnterprise, (payload: Enterprise) => payload)(),
  resetUserState: createAction(actions.resetUserState, (payload: void) => payload)(),
};
