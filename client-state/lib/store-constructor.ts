import type { Store } from "redux";
import { bindActionCreators, createStore, applyMiddleware, compose } from "redux";
import type { InferableComponentEnhancerWithProps } from "react-redux";
import { connect } from "react-redux";
import { createBrowserHistory, createMemoryHistory } from "history";
import type { BrowserHistory, MemoryHistory } from "history";
import createSagaMiddleware from "redux-saga";
import { logger } from "redux-logger";
import type {
  IDuck,
  ReducerSignature,
  SagaConstructorSignature,
  SelectorSignature,
  TActionCreators,
  TDucks,
} from "@/client-state/types";
import log from "@/lib/log";

export type TBestConnect = (selectorMap: {
  [propname: string]: SelectorSignature;
}) => InferableComponentEnhancerWithProps<any, any>;
export type TGlobal = typeof window;
export type THistoryType = BrowserHistory | MemoryHistory;
export type TSagaDependencies = {
  historyRef: THistoryType;
  globalRef: TGlobal;
  ducks: TDucks;
};
export type TSesoStore = Store & {
  actionCreators: TActionCreators;
  bestConnect: TBestConnect;
  historyRef: THistoryType;
  globalRef: TGlobal;
};

const storeConstructor = ({
  rootSaga,
  rootReducer,
  ducks,
  initialState,
}: {
  rootSaga: SagaConstructorSignature;
  rootReducer: ReducerSignature;
  ducks: { [duckName: string]: IDuck };
  initialState: object;
}): TSesoStore => {
  const isServer = typeof window === "undefined";
  const loggerMiddleware = !["production", "test"].includes(process.env.NODE_ENV) && !isServer ? logger : [];
  const historyRef = isServer ? createMemoryHistory() : createBrowserHistory();
  const globalRef = (isServer ? { location: { href: "" } } : window) as Window;

  const sagaMiddleware = createSagaMiddleware({
    onError: (err) => {
      log.error(err.message);
      log.error(err.stack);
      // Todo: This might be redundant - <ErrorBoundry /> *may* capture this
      throw err;
    },
  });
  const middleware = [sagaMiddleware].concat(loggerMiddleware);

  // Inspired by: https://github.com/vercel/next.js/blob/canary/examples/with-redux-saga/store.js
  let composedEnhancers;
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    composedEnhancers = composeWithDevTools(applyMiddleware(...middleware));
  } else {
    composedEnhancers = compose(applyMiddleware(...middleware));
  }

  const store: TSesoStore = createStore(rootReducer, initialState, composedEnhancers);

  // Globally available blob of actionCreators, passed to every component
  const actionCreators = Object.values(ducks).reduce((acc, nextDuck) => {
    acc[nextDuck.namespace] = bindActionCreators(nextDuck.actionCreators, store.dispatch);
    return acc;
  }, {} as TActionCreators);

  sagaMiddleware
    // We pass the history singleton down to all the sagas.
    // Its a clean way to allow sagas to manipulate history stuff.
    // See: https://github.com/ReactTraining/react-router/issues/3972#issuecomment-251189856
    .run(rootSaga, {
      // Todo: fakeWindowHack is gross. Kill it somehow. Anything different.
      globalRef: globalRef,
      historyRef: historyRef,
      ducks,
    });

  const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    // Look at this. Its a singleton obj that contains all actionCreators.
    // provided as a prop to all connected components.
    actionCreators,
  });

  const bestConnect: TBestConnect = (selectorMap) => {
    const connector = connect(
      (state) =>
        Object.entries(selectorMap).reduce((acc, [propName, selector]) => {
          acc[propName] = selector(state);
          return acc;
        }, {}), // mapStateToProps
      null, // mapDispatchToProps
      mergeProps // mergeProps
    );

    return connector;
  };

  store.bestConnect = bestConnect;
  store.actionCreators = actionCreators;
  store.historyRef = historyRef;
  // @ts-ignore
  store.globalRef = globalRef;
  return store;
};

export default storeConstructor;
