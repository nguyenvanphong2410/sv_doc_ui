import {all, call, fork, put, select, takeLatest} from "redux-saga/effects";
import {setTitlePage} from "../app";
import {
  changePassWordEmployeeFail,
  changePassWordEmployeeSuccess,
  changeStatusEmployeeSuccess,
  createEmployeeFail,
  createEmployeeSuccess,
  deleteEmployeeFail,
  deleteEmployeeSuccess,
  setDataFilter,
  setErrorDataChangePassEmployee,
  setErrorInfoEmployee,
  setVisibleModalChangePass,
  updateEmployeeFail,
  updateEmployeeSuccess,
  setVisibleModalCreateOrUpdateEmployee,
} from "./index";
import { getListEmployees } from "@/api/employees";
import { getNotification } from "@/utils/helper";

function* loadRouteData() {
  yield put(setTitlePage("Quản lý tài khoản"));
  yield put(setDataFilter({
    keySearch: "",
    perPage: 20,
    page: 1,
    sort_order: null,
    column: null,
  }));
  yield put(getListEmployees());
}

function* handleActions() {
  yield takeLatest(changeStatusEmployeeSuccess, function* () {
    yield put(getListEmployees());
    getNotification("success", "Thay đổi trạng thái thành công.");
  });
  
  yield takeLatest(createEmployeeSuccess, function* () {
    yield put(getListEmployees());
    // yield put(setVisibleModalCreateOrUpdateEmployee(false));
    getNotification("success", "Tạo mới tài khoản thành công.");
  });
  
  yield takeLatest(createEmployeeFail, function* (action) {
    let status = action.payload.status;
    if (status === 400) {
      let errors = action.payload.data.detail;
      yield put(
        setErrorInfoEmployee({
          ...errors,
        })
      );
    } else {
      getNotification("error", "Tạo mới tài khoản thất bại.");
    }
  });
  
  yield takeLatest(updateEmployeeSuccess, function* () {
    yield put(getListEmployees());
    yield put(setVisibleModalCreateOrUpdateEmployee(false));
    getNotification("success", "Cập nhật tài khoản thành công.");
  });
  
  yield takeLatest(updateEmployeeFail, function* (action) {
    let status = action.payload.status;
    if (status === 400) {
      let errors = action.payload.data.detail;
      yield put(
        setErrorInfoEmployee({
          ...errors,
        })
      );
    } else {
      getNotification("error", "Cập nhật tài khoản thất bại.");
    }
  });
  
  yield takeLatest(changePassWordEmployeeSuccess, function* () {
    getNotification("success", "Thay đổi mật khẩu thành công.");
    yield put(setVisibleModalChangePass(false));
  });
  
  yield takeLatest(changePassWordEmployeeFail, function* (action) {
    let status = action.payload.status;
    if (status === 400) {
      let errors = action.payload.data.detail;
      yield put(
        setErrorDataChangePassEmployee({
          ...errors,
        })
      );
    }
    getNotification("error", "Thay đổi mật khẩu thất bại.");
  });
  
  yield takeLatest(deleteEmployeeSuccess, function* () {
    const employeeState = yield select((state) => state.employee);
    const {currentPage, perPage, totalRecord} = employeeState.paginationListEmployees;

    if (currentPage !== 1 && totalRecord % perPage === 1) {
      yield put(setDataFilter({...employeeState.dataFilter, page: currentPage - 1}));
    }
    getNotification("success", "Xoá tài khoản thành công.");
    yield put(getListEmployees());
  });
  
  yield takeLatest(deleteEmployeeFail, function* () {
    yield call(getNotification, "error", "Xoá tài khoản thất bại.");
  });
}

export default function* employeeSaga() {
  yield all([fork(loadRouteData), fork(handleActions)]);
}
