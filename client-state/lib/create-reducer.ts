import type { AnyAction } from "redux";
import type { IReducerBlob } from "@/client-state/types";

export default function createReducer(initialState: object, handlers: IReducerBlob) {
  return function reducer(state = initialState, action: AnyAction) {
    const handler = handlers[action.type];
    return handler ? handler(state, action) : state;
  };
}
