import { takeEvery, takeLatest, put } from "typed-redux-saga";

import actionCreators from "./action-creators";

const notificationSagas = (params) => [
  takeEvery(actionCreators.showNotification, function* showNotificationSaga() {
    // These get rendered by <Notification />, clearing them immediately prevents dupes.
    yield put(actionCreators.queueClearNotifications());
  }),
  takeLatest(actionCreators.queueClearNotifications, function* queueClearNotificationsSaga() {
    yield put(actionCreators.clearNotifications());
  }),
];

export default notificationSagas;
