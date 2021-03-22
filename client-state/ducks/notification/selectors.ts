import { TRootApplicationState } from "@/client-state/types";

const stateSelector = (s: TRootApplicationState) => s.notification;

export default {
  stateSelector,
};
