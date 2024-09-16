import {all, fork, takeLatest, put} from "redux-saga/effects";
import {
  setErrorForgotPassword,
  setErrorLogin,
  setErrorRegister,
  setErrorResetPassword,
  startRequestForgotPasswordFail,
  startRequestForgotPasswordSuccess,
  startRequestGetMeFail,
  startRequestLoginFail,
  startRequestLoginSuccess,
  startRequestRegisterFail,
  startRequestRegisterSuccess,
  startRequestResetPasswordFail,
  startRequestResetPasswordSuccess,
  startRequestSendMailRegisterFail,
  startRequestSendMailRegisterSuccess
} from "./index.js";
import {setAuthToken} from "@/utils/localStorage";
import { getNotification } from "@/utils/helper.js";
import _ from "lodash";
import {goToPage} from "@/states/modules/app/index.js";

function* loadRouteData() {
  //
}

function* handleActions() {
  yield takeLatest(startRequestLoginSuccess, function* (action) {
    let token = action.payload.data.access_token;
    setAuthToken(token);
    yield put(goToPage({
      path: "/"
    }))
    getNotification('success', 'Sv.doc Chào mừng bạn đã trở lại ^^');
  });
  
  yield takeLatest(startRequestLoginFail, function* (action) {
    let statusError = action.payload.status
    if (statusError === 400) {
      let errors = action.payload.data.detail
      yield put(setErrorLogin({
        email: _.get(errors, 'email', ''),
        password: _.get(errors, 'password', '')
      }));
      !errors && getNotification('error', action.payload.data.message);
    } else if (statusError === 401) {
      getNotification('error', action.payload.data.message);
    } else {
      getNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau!');
    }
  });
  
  yield takeLatest(startRequestGetMeFail, function (action) {
    let status = action.payload.data.code
    if (status === 401) {
      getNotification('error', action.payload.data.message)
    }
  });
  
  yield takeLatest(startRequestForgotPasswordSuccess, function* () {
    getNotification('success', 'Vui lòng kiểm tra email.');
    yield put(goToPage({
      path: "/login"
    }))
  });
  
  yield takeLatest(startRequestForgotPasswordFail, function* (action) {
    let statusError = action.payload.status
    if (statusError === 400) {
      let errors = action.payload.data.detail
      yield put(setErrorForgotPassword({
        email: _.get(errors, 'email', ''),
      }));
    } else if (statusError === 401) {
      getNotification('error', 'Thông tin email không chính xác.');
    } else {
      getNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
    }
  });
  
  yield takeLatest(startRequestResetPasswordSuccess, function* () {
    getNotification('success', 'Đặt lại mật khẩu thành công.');
    yield put(goToPage({
      path: "/"
    }))
  });
  
  yield takeLatest(startRequestResetPasswordFail, function* (action) {
    let statusError = action.payload.status
    if (statusError === 400) {
      let errors = action.payload.data.detail
      yield put(setErrorResetPassword({
        password: _.get(errors, 'new_password', ''),
        confirmPassword: _.get(errors, 'confirm_password', ''),
      }));
    } else if (statusError === 401) {
      const message = action.payload.data.message;
      getNotification('error', (message ? message : 'Thông tin mật khẩu không hợp lệ.'));
    } else {
      getNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
    }
  });

  yield takeLatest(startRequestRegisterSuccess, function* (action) {
    getNotification('success', 'Đăng ký tài khoản thành công');
    let token = action.payload.data.access_token;
    setAuthToken(token);
    yield put(goToPage({
      path: "/"
    }))
  });

  yield takeLatest(startRequestRegisterFail, function* (action) {
    let errors = action.payload.data.detail
    if (errors) {
      yield put(setErrorRegister(errors));
    } else {
      getNotification('error', action.payload.data.message);
    }
  });

  yield takeLatest(startRequestSendMailRegisterSuccess, function () {
    getNotification('success', 'Gửi thành công. Vui lòng kiểm tra email.');
  });

  yield takeLatest(startRequestSendMailRegisterFail, function* (action) {
    let errors = action.payload.data.detail
    if (errors) {
      yield put(setErrorRegister(errors));
    }else {
      getNotification('error', action.payload.data.message);
    }
  });
}

export default function* loadAuthSaga() {
  yield all([
    fork(loadRouteData),
    fork(handleActions)
  ]);
}
