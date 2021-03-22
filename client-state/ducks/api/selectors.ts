import { createSelector } from "reselect";
import type { TRootApplicationState } from "@/client-state/types";

const stateSelector = (s: TRootApplicationState) => s.apiClient;
const authToken = createSelector(stateSelector, (s) => s.authToken);

const _isFetching = createSelector(stateSelector, (s) => s.isFetching);
const isFetching = (apiMethodName: string) => (globalState) => {
  const s = _isFetching(globalState);
  return s && !!s[apiMethodName];
};

export default {
  authToken,
  isFetching,
};
