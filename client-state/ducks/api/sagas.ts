import { takeEvery } from "typed-redux-saga";
import Cookies from "js-cookie";
import { sesoAuthCookieName } from "@/client-state/constants";

import actionCreators from "./action-creators";

const userAccountSagas = ({ globalRef }) => [
  takeEvery(actionCreators.setAuthToken, function* setAuthTokenSaga(action) {
    Cookies.set(sesoAuthCookieName, action.payload);
  }),
  takeEvery(actionCreators.clearAuthToken, function* clearAuthTokenSaga(action) {
    Cookies.remove(sesoAuthCookieName);
    globalRef.location.href = "/";
  }),
];

export default userAccountSagas;
