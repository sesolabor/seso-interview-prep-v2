import { call, takeEvery, put } from "typed-redux-saga";
import type { TSagaDependencies } from "@/client-state/types";
import actionCreators from "./action-creators";

const userAccountSagas = ({ ducks, historyRef }: TSagaDependencies) => [
  takeEvery(actionCreators.logoutUser, function* logoutUserSaga(action) {
    yield* put(ducks.userAccount.actionCreators.resetUserState());
    yield* put(ducks.apiClient.actionCreators.setAuthToken(null));
  }),
  takeEvery(actionCreators.createUserAndEnterprise, function* createUserAndEnterpriseActionSaga(action) {
    const { payload } = action;
    const [response, error] = yield* call(ducks.apiClient.sagaClient.createUserAndEnterprise, {
      user: payload.user,
      enterprise: payload.enterprise,
    });

    if (error) {
      if (error.responseStatus === 409) {
        return yield* put(
          ducks.notification.actionCreators.showNotification({
            type: "error",
            message: error.message,
            description: "An account with that email already exists.",
          })
        );
      }
      throw error;
    }
    yield* put(ducks.apiClient.actionCreators.setAuthToken(response.token));
    window.location.href = "/";
  }),
  takeEvery(actionCreators.loginUser, function* loginUserSaga(action) {
    const { payload } = action;
    const [response, error] = yield* call(ducks.apiClient.sagaClient.loginUser, {
      email: payload.email,
      password: payload.password,
    });

    if (error && error.responseStatus === 404) {
      return yield* put(
        ducks.notification.actionCreators.showNotification({
          type: "error",
          message: "Account not found",
          description: "Have you created an account?",
        })
      );
    }
    const { token } = response;
    yield* put(ducks.apiClient.actionCreators.setAuthToken(token));
    window.location.href = "/";
  }),
];

export default userAccountSagas;
