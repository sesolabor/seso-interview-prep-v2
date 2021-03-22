import { notification } from "antd";
import * as ducks from "@/client-state/ducks";
import { useTypedSelector } from "@/client-state/store";

const i = "info";
export default () => {
  const notifications = useTypedSelector(ducks.notification.selectors.stateSelector);
  notifications.forEach((n) => {
    return notification[n.type || i]({
      message: n.message,
      description: n.description,
      duration: 6,
    });
  });

  return null;
};
