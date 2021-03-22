import { createReducer } from "typesafe-actions";
import actionCreators from "./action-creators";
import type { TNotification } from "./action-creators";

type TNotificationState = TNotification[];
const initialState: TNotificationState = [];

export default createReducer(initialState)
  .handleAction(actionCreators.showNotification, (state, action) => {
    return state.concat(action.payload);
  })
  .handleAction(actionCreators.clearNotifications, (state, action) => {
    return [];
  });
