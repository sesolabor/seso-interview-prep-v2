import { all } from "typed-redux-saga";
import * as ducks from "@/client-state/ducks";

function* rootSaga(sagaParams) {
  yield all([
    ...ducks.userAccount.sagas(sagaParams),
    ...ducks.apiClient.sagas(sagaParams),
    ...ducks.notification.sagas(sagaParams),
  ]);
}

export default rootSaga;
