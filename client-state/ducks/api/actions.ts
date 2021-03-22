import * as R from "ramda";
import apiClient from "./api-client";
import namespace from "./namespace";
import type { ApiClientMethods } from "./api-client/types";

type ScopedApiClientActions = Record<ApiClientMethods | "setAuthToken" | "clearAuthToken", string>;

const actions = Object.keys(apiClient).concat(["setAuthToken", "clearAuthToken"]);

const finalActions = R.zipObj(
  actions,
  actions.map((s) => `${namespace}/${s}`)
) as ScopedApiClientActions;

export default finalActions;
