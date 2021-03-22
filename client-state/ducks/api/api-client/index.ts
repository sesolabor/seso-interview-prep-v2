import { apiMethodConstructor } from "./utils";
import type { TCreateUserResponse, TCreateUserParams } from "@/pages/api/users";

import type {
  TCreateUserAndEnterpriseParams,
  TCreateUserAndEnterpriseResponse,
} from "@/pages/api/users/create-user-and-enterprise";
import type { TLoginUserParams, TLoginUserResponse } from "@/pages/api/users/login";

const apiClient = {
  createUser: apiMethodConstructor<TCreateUserParams, TCreateUserResponse>({
    auth: false,
    method: "POST",
    path: "/api/users",
  }),
  loginUser: apiMethodConstructor<TLoginUserParams, TLoginUserResponse>({
    auth: false,
    method: "POST",
    path: "/api/users/login",
  }),
  createUserAndEnterprise: apiMethodConstructor<TCreateUserAndEnterpriseParams, TCreateUserAndEnterpriseResponse>({
    auth: true,
    method: "POST",
    path: "/api/users/create-user-and-enterprise",
  }),
} as const;

export default apiClient;
