import {all, fork, put, select, takeLatest} from 'redux-saga/effects';
import {setTitlePage} from '../app';
import {
  changePassWordOtherFail,
  changePassWordOtherSuccess,
  changePassWordStudentFail,
  changePassWordStudentSuccess,
  changePassWordTeacherFail,
  changePassWordTeacherSuccess,
  changeStatusOtherFail,
  changeStatusOtherSuccess,
  changeStatusStudentFail,
  changeStatusStudentSuccess,
  changeStatusTeacherFail,
  changeStatusTeacherSuccess,
  createOtherFail,
  createOtherSuccess,
  createStudentFail,
  createStudentSuccess,
  createTeacherFail,
  createTeacherSuccess,
  deleteOtherFail,
  deleteOtherSuccess,
  deleteStudentFail,
  deleteStudentSuccess,
  deleteTeacherFail,
  deleteTeacherSuccess,
  setDataFilterOther,
  setDataFilterStudent,
  setDataFilterTeacher,
  setErrorDataChangePassOther,
  setErrorDataChangePassStudent,
  setErrorDataChangePassTeacher,
  setErrorInfoOther,
  setErrorInfoStudent,
  setErrorInfoTeacher,
  setVisibleModalChangePass,
  setVisibleModalChangePassStudent,
  setVisibleModalChangePassTeacher,
  setVisibleModalCreateOrUpdateOther,
  setVisibleModalCreateOrUpdateStudent,
  setVisibleModalCreateOrUpdateTeacher,
  updateOtherFail,
  updateOtherSuccess,
  updateStudentFail,
  updateStudentSuccess,
  updateTeacherFail,
  updateTeacherSuccess,
} from '.';
import {getNotification} from '@/utils/helper';
import {requestGetListOther, requestGetListStudent, requestGetListTeacher} from '@/api/partners';

function* loadRouteData() {
  yield put(setTitlePage('Quản lý người dùng'));
}

function* handleActions() {
  yield takeLatest(createOtherSuccess, function* () {
    yield put(requestGetListOther());
    yield put(setVisibleModalCreateOrUpdateOther(false));
    getNotification('success', 'Tạo mới người dùng thành công.');
  });

  yield takeLatest(createOtherFail, function* (action) {
    let status = action.payload.status;
    if (status === 400) {
      let errors = action.payload.data.detail;
      yield put(
        setErrorInfoOther({
          ...errors,
        })
      );
    } else {
      getNotification('error', 'Tạo mới người dùng thất bại.');
    }
  });

  yield takeLatest(updateOtherSuccess, function* () {
    yield put(requestGetListOther());
    yield put(setVisibleModalCreateOrUpdateOther(false));
    getNotification('success', 'Cập nhật người dùng thành công.');
  });

  yield takeLatest(updateOtherFail, function* (action) {
    let status = action.payload.status;
    if (status === 400) {
      let errors = action.payload.data.detail;
      yield put(
        setErrorInfoOther({
          ...errors,
        })
      );
    } else {
      getNotification('error', 'Cập nhật người dùng thất bại.');
    }
  });

  yield takeLatest(deleteOtherSuccess, function* () {
    const partnerState = yield select((state) => state.partner);
    const {currentPage, perPage, totalRecord} = partnerState.paginationListOther;

    if (currentPage !== 1 && totalRecord % perPage === 1) {
      yield put(setDataFilterOther({...partnerState.dataFilterOther, page: currentPage - 1}));
    }
    getNotification('success', 'Xoá người dùng thành công.');
    yield put(requestGetListOther());
  });

  yield takeLatest(deleteOtherFail, function () {
    getNotification('error', 'Xoá người dùng thất bại.');
  });

  yield takeLatest(changeStatusOtherSuccess, function* () {
    yield put(requestGetListOther());
    getNotification("success", "Thay đổi trạng thái thành công.");
  });

  yield takeLatest(changeStatusOtherFail, function () {
    getNotification("success", "Thay đổi trạng thái thất bại.");
  });
  

  //Teacher
  yield takeLatest(createTeacherSuccess, function* () {
    yield put(requestGetListTeacher());
    yield put(setVisibleModalCreateOrUpdateTeacher(false));
    getNotification('success', 'Tạo mới giáo viên thành công.');
  });

  yield takeLatest(createTeacherFail, function* (action) {
    let status = action.payload.status;
    if (status === 400) {
      let errors = action.payload.data.detail;
      yield put(
        setErrorInfoTeacher({
          ...errors,
        })
      );
    } else {
      getNotification('error', 'Tạo mới giáo viên thất bại.');
    }
  });

  yield takeLatest(updateTeacherSuccess, function* () {
    yield put(requestGetListTeacher());
    yield put(setVisibleModalCreateOrUpdateTeacher(false));
    getNotification('success', 'Cập nhật giáo viên thành công.');
  });

  yield takeLatest(updateTeacherFail, function* (action) {
    let status = action.payload.status;
    if (status === 400) {
      let errors = action.payload.data.detail;
      yield put(
        setErrorInfoTeacher({
          ...errors,
        })
      );
    } else {
      getNotification('error', 'Cập nhật giáo viên thất bại.');
    }
  });

  yield takeLatest(deleteTeacherSuccess, function* () {
    const partnerState = yield select((state) => state.partner);
    const {currentPage, perPage, totalRecord} = partnerState.paginationListTeacher;

    if (currentPage !== 1 && totalRecord % perPage === 1) {
      yield put(setDataFilterTeacher({...partnerState.dataFilterTeacher, page: currentPage - 1}));
    }
    getNotification('success', 'Xoá giáo viên thành công.');
    yield put(requestGetListTeacher());
  });

  yield takeLatest(deleteTeacherFail, function () {
    getNotification('error', 'Xoá giáo viên thất bại.');
  });

  yield takeLatest(changePassWordOtherSuccess, function* () {
    getNotification("success", "Thay đổi mật khẩu thành công.");
    yield put(setVisibleModalChangePass(false));
  });
  
  yield takeLatest(changePassWordOtherFail, function* (action) {
    let status = action.payload.status;
    if (status === 400) {
      let errors = action.payload.data.detail;
      yield put(
        setErrorDataChangePassOther({
          ...errors,
        })
      );
    }
    getNotification("error", "Thay đổi mật khẩu thất bại.");
  });
  yield takeLatest(changeStatusTeacherSuccess, function* () {
    yield put(requestGetListTeacher());
    getNotification("success", "Thay đổi trạng thái thành công.");
  });

  yield takeLatest(changeStatusTeacherFail, function () {
    getNotification("success", "Thay đổi trạng thái thất bại.");
  });

  //Student
  yield takeLatest(createStudentSuccess, function* () {
    yield put(requestGetListStudent());
    yield put(setVisibleModalCreateOrUpdateStudent(false));
    getNotification('success', 'Tạo mới giáo viên thành công.');
  });

  yield takeLatest(createStudentFail, function* (action) {
    let status = action.payload.status;
    if (status === 400) {
      let errors = action.payload.data.detail;
      yield put(
        setErrorInfoStudent({
          ...errors,
        })
      );
    } else {
      getNotification('error', 'Tạo mới giáo viên thất bại.');
    }
  });

  yield takeLatest(updateStudentSuccess, function* () {
    yield put(requestGetListStudent());
    yield put(setVisibleModalCreateOrUpdateStudent(false));
    getNotification('success', 'Cập nhật giáo viên thành công.');
  });

  yield takeLatest(updateStudentFail, function* (action) {
    let status = action.payload.status;
    if (status === 400) {
      let errors = action.payload.data.detail;
      yield put(
        setErrorInfoStudent({
          ...errors,
        })
      );
    } else {
      getNotification('error', 'Cập nhật giáo viên thất bại.');
    }
  });

  yield takeLatest(deleteStudentSuccess, function* () {
    const partnerState = yield select((state) => state.partner);
    const {currentPage, perPage, totalRecord} = partnerState.paginationListStudent;

    if (currentPage !== 1 && totalRecord % perPage === 1) {
      yield put(setDataFilterStudent({...partnerState.dataFilterStudent, page: currentPage - 1}));
    }
    getNotification('success', 'Xoá giáo viên thành công.');
    yield put(requestGetListStudent());
  });

  yield takeLatest(deleteStudentFail, function () {
    getNotification('error', 'Xoá giáo viên thất bại.');
  });
  yield takeLatest(changePassWordStudentSuccess, function* () {
    getNotification("success", "Thay đổi mật khẩu thành công.");
    yield put(setVisibleModalChangePassStudent(false));
  });
  
  yield takeLatest(changePassWordStudentFail, function* (action) {
    let status = action.payload.status;
    if (status === 400) {
      let errors = action.payload.data.detail;
      yield put(
        setErrorDataChangePassStudent({
          ...errors,
        })
      );
    }
    getNotification("error", "Thay đổi mật khẩu thất bại.");
  });
  yield takeLatest(changeStatusStudentSuccess, function* () {
    yield put(requestGetListStudent());
    getNotification("success", "Thay đổi trạng thái thành công.");
  });

  yield takeLatest(changeStatusStudentFail, function () {
    getNotification("success", "Thay đổi trạng thái thất bại.");
  });
}

export default function* partnerSaga() {
  yield all([fork(loadRouteData), fork(handleActions)]);
}
