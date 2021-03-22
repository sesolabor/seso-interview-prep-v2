import constants from "./constants";

const delimeter = "/";
export const getStartActionType = (actionType: string) => `${actionType}${delimeter}${constants.startSuffix}`;
export const getResolvedActionType = (actionType: string) => `${actionType}${delimeter}${constants.successSuffix}`;
export const getErroredActionType = (actionType: string) => `${actionType}${delimeter}${constants.errorSuffix}`;
export const isAPIStartEvent = (action) => action.type.endsWith(constants.startSuffix);
export const isApiSuccessEvent = (action) => action.type.endsWith(constants.successSuffix);
export const isApiErrorEvent = (action) => action.type.endsWith(constants.errorSuffix);
export const getActionTypeFromSuffixedAction = (actionTypeWithSuffix: string) =>
  actionTypeWithSuffix.split("/fetch/")[0];
