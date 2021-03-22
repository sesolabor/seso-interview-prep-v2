import { createAction } from "typesafe-actions";
import actions from "./actions";

export type TNotification = {
  type: "success" | "error" | "info";
  message: string;
  description: string;
};

export default {
  showNotification: createAction(actions.showNotification, (payload: TNotification) => payload)(),
  clearNotifications: createAction(actions.clearNotifications, () => {})(),
  queueClearNotifications: createAction(actions.queueClearNotifications, () => {})(),
};
