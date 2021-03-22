import { TRootApplicationState } from "@/client-state/types";
import { createSelector } from "reselect";

const stateSelector = (s: TRootApplicationState) => s.userAccount;
const user = createSelector(stateSelector, (s) => s.user);
const enterprise = createSelector(stateSelector, (s) => s.enterprise);

export default {
  stateSelector,
  user,
  enterprise,
};
