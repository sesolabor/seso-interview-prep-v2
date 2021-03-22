import type { AnyAction } from "redux";
import type { ForkEffect } from "redux-saga/effects";
import type { SagaGenerator } from "typed-redux-saga";
import type { ActionType, PayloadAction } from "typesafe-actions";
import type { History } from "history";

import rootSaga from "./root-saga";
import rootReducer from "./root-reducer";
import * as ducks from "./ducks";

export type { TBestConnect, THistoryType, TSagaDependencies, TSesoStore } from "@/client-state/lib/store-constructor";
declare module "typesafe-actions" {
  // See: https://github.com/piotrwitek/typesafe-actions#reducers
  interface Types {
    RootAction: RootAction;
  }
}
export type TDucks = typeof ducks;
export type TRootApplicationState = ReturnType<typeof rootReducer> & { screenWidth: number | null };
export type RootAction = ActionType<
  typeof ducks.apiClient.actionCreators &
    typeof ducks.notification.actionCreators &
    typeof ducks.userAccount.actionCreators
>;
export type TActionCreators = {
  userAccount: typeof ducks.userAccount.actionCreators;
  apiClient: typeof ducks.apiClient.actionCreators;
  notification: typeof ducks.notification.actionCreators;
};

export type ApiClientMethod = (params: object, token?: string) => Promise<any>;
export type HistoryAction<TAction> = TAction & { history: History };
export type ReducerSignature = (state: any, action: AnyAction) => any;
export type SagaConstructorSignature = (sagaParams: any) => SagaType;
export type SagaType = ReturnType<typeof rootSaga>;
export type SelectorSignature = (state: any) => any;
export type ActionCallbacks = {
  onComplete: (res: any) => void;
  onError: (err: any) => void;
  onProgress?: (progress?: number, status?: string, target?: any) => void;
};
export interface ActionCreatorSignature {
  (payload: any): { type: string; payload: any };
}
export interface IReducerBlob {
  [key: string]: ReducerSignature;
}
export interface IScopedActionsMap {
  [actionName: string]: string;
}
export interface IDuck {
  actions: Record<string, string>;
  actionCreators: {
    [actionCreatorName: string]: (payload: any) => PayloadAction<any, any>;
  };
  reducer: ReducerSignature;
  sagas: (sagaParams: any) => SagaGenerator<never, ForkEffect<never>>[];
  selectors?: { [selectorName: string]: SelectorSignature };
  namespace: string;
  storePath: string[];
}

export type TDisplayType<T> = { [key in keyof T]: string };
