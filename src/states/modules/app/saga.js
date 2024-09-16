import {
  all,
  fork,
  takeLatest,
  put
} from "redux-saga/effects";
import {startRequestLogoutSuccess} from "@/states/modules/auth/index.js";
import {removeAuthToken} from "@/utils/localStorage.js";
import {goToPage} from "@/states/modules/app/index.js";

function* loadRouteData() {
  yield
}

function* handleActions() {
  yield takeLatest(startRequestLogoutSuccess, function* () {
    removeAuthToken();
    yield put(goToPage({
      path: "/login"
    }));
  });
}

export default function* appSaga() {
  yield all([
    fork(loadRouteData),
    fork(handleActions)
  ]);
}
