import type { ActionCreatorSignature } from "@/client-state/types";
export { default as createReducer } from "./create-reducer";
export { default as storeConstructor } from "./store-constructor";

export const createActionCreator = (typeString: string): ActionCreatorSignature => (payload) => {
  return { type: typeString, payload };
};

// See: https://stackoverflow.com/questions/58014438/typescript-generic-union-type
export const actionCreatorMapFromActionMap = (
  actionMap: Record<string, string>
): Record<string, ActionCreatorSignature> =>
  Object.entries(actionMap).reduce((acc, [actionName, scopedActionName]) => {
    acc[actionName] = createActionCreator(scopedActionName);
    return acc;
  }, {});
