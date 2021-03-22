import { createWrapper } from "next-redux-wrapper";
import Cookies from "js-cookie";
import { createSelectorHook } from "react-redux";
import log from "@/lib/log";
import { sesoAuthCookieName } from "@/client-state/constants";
import type { TRootApplicationState } from "./types";
import { storeConstructor } from "./lib";
import * as ducks from "./ducks";
import rootReducer from "./root-reducer";
import rootSaga from "./root-saga";

export const buildStore = (logLastAction = false) => {
  const store = storeConstructor({
    rootReducer,
    rootSaga,
    ducks,
    initialState: {
      apiClient: {
        authToken: Cookies.get(sesoAuthCookieName) || null,
      },
    },
  });

  if (logLastAction)
    store.subscribe(() => {
      log.log(store.getState().lastAction);
    });

  return store;
};

export const store = buildStore(false);
export const actionCreators = store.actionCreators;
export const bestConnect = store.bestConnect;
export const historyRef = store.historyRef;
export const globalRef = store.globalRef;

export const useTypedSelector = createSelectorHook<TRootApplicationState>();
export const useTypedActionCreators = () => actionCreators;
export const makeStore = () => store;
export const wrapper = createWrapper(makeStore, { debug: false });
