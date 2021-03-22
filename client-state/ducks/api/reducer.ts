import { createReducer } from "typesafe-actions";
import { isAPIStartEvent, isApiSuccessEvent, isApiErrorEvent, getActionTypeFromSuffixedAction } from "./helpers";
import actionCreators from "./action-creators";

export type TApiClientState = {
  authToken?: string | null;
  isFetching: { [fetchingMethodName: string]: boolean | void };
};

const initialState: TApiClientState = { isFetching: {} };

const actualReducer = createReducer(initialState).handleAction(actionCreators.setAuthToken, (state, action) => {
  return {
    ...state,
    authToken: action.payload,
  };
});

const exportedReducer = (state = initialState, action) => {
  if (!action || !action.type) return state;

  const isStartFetch = isAPIStartEvent(action);
  const isEndFetch = isApiSuccessEvent(action) || isApiErrorEvent(action);
  return actualReducer(
    isStartFetch || isEndFetch
      ? {
          ...state,
          isFetching: {
            ...state.isFetching,
            [getActionTypeFromSuffixedAction(action.type)]: isStartFetch || false,
          },
        }
      : state,
    action
  );
};

export default exportedReducer;
