import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import * as ducks from "@/client-state/ducks";

const rootReducer = combineReducers({
  userAccount: ducks.userAccount.reducer,
  apiClient: ducks.apiClient.reducer,
  notification: ducks.notification.reducer,
  lastAction: (state = null, action) => action,
});

export default (state, action): ReturnType<typeof rootReducer> => {
  // Hydrate client-side store with preloaded state.
  if (action.type === HYDRATE) {
    return { ...state, ...JSON.parse(action.payload) };
  }
  // Otherwise, normal reducer behavior.
  return rootReducer(state, action);
};
