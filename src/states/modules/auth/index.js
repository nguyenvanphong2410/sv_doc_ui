import {createSlice} from "@reduxjs/toolkit";
import { initInfoRegister } from "./initState";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthSuccess: false,
    authUser: {},
    errorLogin: {
      email: '',
      password: ''
    },
    isLoadingBtnLogin: false,
    errorForgotPassword: {
      email: ''
    },
    isLoadingBtnForgotPassword: false,

    //Register
    infoRegister: initInfoRegister,
    errorResetPassword: {
      password: '',
      confirmPassword: ''
    },
    isLoadingBtnResetPassword: false,
    errorRegister: {},
    isLoadingBtnRegister: false,
    isLoadingSendMailRegister: false,

  },
  reducers: {
    setErrorLogin: (state, action) => ({
      ...state,
      errorLogin: action.payload
    }),
    startRequestLogin: (state) => ({
      ...state,
      isLoadingBtnLogin: true
    }),
    startRequestLoginSuccess: (state) => ({
      ...state,
      isLoadingBtnLogin: false
    }),
    startRequestLoginFail: (state) => ({
      ...state,
      isLoadingBtnLogin: false
    }),
    startRequestLogout: (state) => ({
      ...state,
    }),
    startRequestLogoutSuccess: (state) => ({
      ...state,
      isAuthSuccess: false,
      authUser: {}
    }),
    startRequestLogoutFail: (state) => ({
      ...state,
    }),
    startRequestGetMe: (state) => ({
      ...state,
    }),
    startRequestGetMeSuccess: (state, action) => ({
      ...state,
      isAuthSuccess: true,
      authUser: action.payload.data
    }),
    startRequestGetMeFail: (state) => ({
      ...state,
      isAuthSuccess: false,
      authUser: {}
    }),
    setErrorForgotPassword: (state, action) => ({
      ...state,
      errorForgotPassword: action.payload
    }),
    startRequestForgotPassword: (state) => ({
      ...state,
      isLoadingBtnForgotPassword: true
    }),
    startRequestForgotPasswordSuccess: (state) => ({
      ...state,
      isLoadingBtnForgotPassword: false
    }),
    startRequestForgotPasswordFail: (state) => ({
      ...state,
      isLoadingBtnForgotPassword: false
    }),
    setErrorResetPassword: (state, action) => ({
      ...state,
      errorResetPassword: action.payload
    }),
    startRequestResetPassword: (state) => ({
      ...state,
      isLoadingBtnResetPassword: true
    }),
    startRequestResetPasswordSuccess: (state) => ({
      ...state,
      isLoadingBtnResetPassword: false
    }),
    startRequestResetPasswordFail: (state) => ({
      ...state,
      isLoadingBtnResetPassword: false
    }),
    setAuthSuccess: (state, action) => ({
      ...state,
      isAuthSuccess: action.payload
    }),
    
    //Register
    setDataRegister: (state,action) => ({
      ...state,
      infoRegister: action.payload,
    }),
    setErrorRegister: (state,action) => ({
      ...state,
      errorRegister: action.payload,
    }),

    startRequestRegister: (state) => ({
      ...state,
      isLoadingBtnRegister: true,
    }),
    startRequestRegisterSuccess: (state) => ({
      ...state,
      isLoadingBtnRegister: false,
    }),
    startRequestRegisterFail: (state) => ({
      ...state,
      isLoadingBtnRegister: false,
    }),
    startRequestSendMailRegister: (state) => ({
      ...state,
      isLoadingSendMailRegister: true,
    }),
    startRequestSendMailRegisterSuccess: (state) => ({
      ...state,
      isLoadingSendMailRegister: false,
    }),
    startRequestSendMailRegisterFail: (state) => ({
      ...state,
      isLoadingSendMailRegister: false,
    }),

  }
})

export const {
  setErrorLogin,
  setErrorForgotPassword,
  setErrorResetPassword,
  setAuthSuccess,
  startRequestLogin,
  startRequestLoginSuccess,
  startRequestLoginFail,
  startRequestLogout,
  startRequestLogoutSuccess,
  startRequestLogoutFail,
  startRequestGetMe,
  startRequestGetMeSuccess,
  startRequestGetMeFail,
  startRequestForgotPassword,
  startRequestForgotPasswordSuccess,
  startRequestForgotPasswordFail,
  startRequestResetPassword,
  startRequestResetPasswordSuccess,
  startRequestResetPasswordFail,

  //Register
  setDataRegister,
  setErrorRegister,
  startRequestRegister,
  startRequestRegisterSuccess,
  startRequestRegisterFail,
  startRequestSendMailRegister,
  startRequestSendMailRegisterSuccess,
  startRequestSendMailRegisterFail,

} = authSlice.actions

export default authSlice.reducer;
