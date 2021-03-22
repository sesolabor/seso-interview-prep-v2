import { createAction } from "typesafe-actions";

import actions from "./actions";

export default {
  setAuthToken: createAction(actions.setAuthToken, (payload: string) => payload)(),
  clearAuthToken: createAction(actions.clearAuthToken, (payload: void) => payload)(),
};
