import { call, put, select } from "@/client-state/lib/sagas";
import * as ducks from "@/client-state/ducks";
import rawClient from "./api-client";
import type { AsyncReturnType } from "@/lib/types";
import type { SesoApiError, RawApiClient } from "./api-client/types";
import actionCreators from "./action-creators";
import { getStartActionType, getResolvedActionType, getErroredActionType } from "./helpers";

import actions from "./actions";

// See: https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types
// Note: This parameter is technically a lie - it types each method as a Promise return function.
// However, each method is a saga. We do this sidestep issues with typing `const x: ? = yield* call(...)`
export type SagaConnectedApiClient = {
  [P in keyof RawApiClient]: (
    params: Parameters<RawApiClient[P]>[0]
  ) => [AsyncReturnType<RawApiClient[P]>, null] | [null, SesoApiError];
};

const errorCodesWeResetFor = [401, 403, 405, 406, 422];
const sagaConnectedApiClient = Object.entries(rawClient).reduce((acc, [rawClientMethodName, promiseReturningAPIFn]) => {
  acc[rawClientMethodName] = function* wrappedApiClientMethodGenerator(
    payload: Parameters<typeof promiseReturningAPIFn>
  ) {
    // Select the token from state
    const authtoken = yield* select(ducks.apiClient.selectors.authToken);
    // Emit the 'before' event
    yield* put({
      type: getStartActionType(actions[rawClientMethodName]),
      payload,
    });

    try {
      // Fire the api call
      const resultOfAsyncCall = yield* call(
        // @ts-ignore
        promiseReturningAPIFn,
        payload,
        authtoken
      );
      // Dispatch the 'after' event
      yield* put({
        type: getResolvedActionType(actions[rawClientMethodName]),
        payload: resultOfAsyncCall,
        originalRequestPayload: payload,
      });

      return [resultOfAsyncCall, null];
    } catch (error) {
      // Dispatch the 'err' event
      yield* put({
        type: getErroredActionType(actions[rawClientMethodName]),
        originalRequestPayload: payload,
        payload: error.message,
      });

      if (errorCodesWeResetFor.includes(error.responseStatus)) {
        actionCreators.clearAuthToken();
      }

      return [null, error];
    }
  };

  return acc;
}, {} as SagaConnectedApiClient);

export default sagaConnectedApiClient;
