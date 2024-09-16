import callApi from "@/api/callApi";
import {
  startRequestForgotPassword,
  startRequestForgotPasswordFail,
  startRequestForgotPasswordSuccess,
  startRequestGetMe,
  startRequestGetMeFail,
  startRequestGetMeSuccess,
  startRequestLogin,
  startRequestLoginFail,
  startRequestLoginSuccess,
  startRequestLogout,
  startRequestLogoutSuccess,
  startRequestLogoutFail,
  startRequestResetPassword,
  startRequestResetPasswordSuccess,
  startRequestResetPasswordFail,
  startRequestRegisterSuccess,
  startRequestRegister,
  startRequestRegisterFail,
} from "@/states/modules/auth";

export const login = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: '/admin/auth/login',
    actionTypes: [
      startRequestLogin,
      startRequestLoginSuccess,
      startRequestLoginFail
    ],
    variables: {
      email: data.email,
      password: data.password,
    },
    dispatch,
    getState
  })
}

export const logout = () => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: '/admin/auth/logout',
    actionTypes: [
      startRequestLogout,
      startRequestLogoutSuccess,
      startRequestLogoutFail,
    ],
    variables: {},
    dispatch,
    getState
  })
}

export const getMe = () => async (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: '/admin/auth/me',
    actionTypes: [
      startRequestGetMe,
      startRequestGetMeSuccess,
      startRequestGetMeFail
    ],
    variables: {},
    dispatch,
    getState
  })
}

export const forgotPassword = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: '/admin/auth/forgot-password',
    actionTypes: [
      startRequestForgotPassword,
      startRequestForgotPasswordSuccess,
      startRequestForgotPasswordFail
    ],
    variables: {
      email: data.email
    },
    dispatch,
    getState
  })
}

export const resetPassword = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'put',
    apiPath: `/admin/auth/reset-password/${data.token}`,
    actionTypes: [
      startRequestResetPassword,
      startRequestResetPasswordSuccess,
      startRequestResetPasswordFail
    ],
    variables: {
      new_password: data.password,
    },
    dispatch,
    getState,
  })
}


export const register = (data) => (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: '/admin/auth/register',
    actionTypes: [startRequestRegister, startRequestRegisterSuccess, startRequestRegisterFail],
    variables: data,
    dispatch,
    getState,
  });
}
