import { all, fork, put, takeLatest, call, select } from 'redux-saga/effects';
import { setBreadcrumb, setTitlePage } from '../app/index.js';
import { getNotification } from '../../../utils/helper.js';
import {
  setEmployeeeIds,
  setErrorEmployeeIds,
  requestCreateRoleFail,
  requestCreateRoleSuccess,
  requestDeleteEmployeeOfRoleFail,
  requestDeleteEmployeeOfRoleSuccess,
  requestDeleteRoleSuccess,
  requestDeleteRoleFail,
  requestUpdateEmployeeOfRoleFail,
  requestUpdateEmployeeOfRoleSuccess,
  requestUpdateRoleFail,
  requestUpdateRoleSuccess,
  requestUpdateUpdatePermissionRoleFail,
  requestUpdateUpdatePermissionRoleSuccess,
  setErrorCreateOrUpdateRole,
  setVisibleModalUpdatePermissionRole,
  setQueryEmployeeWithoutRole,
  initialQueryEmployeeWithoutRole,
  setVisibleModalCreateOrUpdateRole,
  setVisibleModalAddEmployeeOfRole,
  setVisibleModalDeleteEmployeeOfRole,
  setVisibleModalDeleteRole,
  setInfoRoleSelected,
} from './index.js';
import _ from 'lodash';
import {
  handleEmployeeWithoutRole,
  handleGetEmployeeOfRole,
  handleGetPermissionOfRole,
  handleGetRoles,
} from '@/api/permission/index.js';

function* loadRouteData() {
  yield put(setTitlePage('Quản lý vai trò'));
  yield put(
    setBreadcrumb([
      {
        path: '/',
        name: 'Trang chủ',
      },
      {
        path: '/permission',
        name: 'Quản lý vai trò',
      },
    ])
  );
  yield put(handleGetRoles());
  yield put(setVisibleModalDeleteRole(false));
  yield put(setVisibleModalAddEmployeeOfRole(false));
  yield put(setVisibleModalCreateOrUpdateRole(false));
  yield put(setVisibleModalDeleteEmployeeOfRole(false));
  yield put(setVisibleModalUpdatePermissionRole(false));
}

function* handleActions() {
  //Role
  yield takeLatest(requestCreateRoleSuccess, function* () {
    getNotification('success', 'Tạo mới vai trò thành công.');
    yield put(handleGetRoles());
  });

  yield takeLatest(requestCreateRoleFail, function* (action) {
    let statusError = action.payload.status;
    if (statusError === 400) {
      let errors = action.payload.data.detail;
      yield put(
        setErrorCreateOrUpdateRole({
          name: _.get(errors, 'name', ''),
          description: _.get(errors, 'description', ''),
        })
      );
    } else if (statusError === 401) {
      getNotification('error', 'Thông tin không hợp lệ.');
    } else {
      getNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
    }
  });

  yield takeLatest(requestUpdateRoleSuccess, function* () {
    getNotification('success', 'Cập nhật vai trò thành công.');
    yield put(handleGetRoles());
  });

  yield takeLatest(requestUpdateRoleFail, function* (action) {
    let statusError = action.payload.status;
    if (statusError === 400) {
      let errors = action.payload.data.detail;
      yield put(
        setErrorCreateOrUpdateRole({
          name: _.get(errors, 'name', ''),
          description: _.get(errors, 'description', ''),
        })
      );
    } else if (statusError === 401) {
      getNotification('error', 'Thông tin không hợp lệ.');
    } else {
      getNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
    }
  });

  yield takeLatest(requestDeleteRoleSuccess, function* () {
    getNotification('success', 'Xóa vai trò thành công.');
    yield put(setInfoRoleSelected({
      name: "",
      description: ""
    }));
    yield put(handleGetRoles());
  });

  yield takeLatest(requestDeleteRoleFail, function* () {
    yield call(getNotification, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
  });

  //Employee Of Role
  yield takeLatest(requestUpdateEmployeeOfRoleSuccess, function* () {
    const idRoleSelected = yield select((state) => state.permission.infoRoleSelected);

    yield setEmployeeeIds({ employee_ids: [] });
    yield setErrorEmployeeIds({ employee_ids: '' });
    yield put(handleGetEmployeeOfRole(idRoleSelected._id));
    yield put(handleEmployeeWithoutRole(idRoleSelected._id));
    yield (setQueryEmployeeWithoutRole(initialQueryEmployeeWithoutRole));
    yield getNotification('success', 'Cập nhật thành công.');
  });

  yield takeLatest(requestUpdateEmployeeOfRoleFail, function* (action) {
    let statusError = action.payload.status;
    if (statusError === 400) {
      let errors = action.payload.data.detail;
      yield put(
        setErrorEmployeeIds({
          employee_ids: _.get(errors, 'employee_ids', ''),
        })
      );
    } else if (statusError === 401) {
      getNotification('error', 'Thông tin không hợp lệ.');
    } else {
      getNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
    }
  });

  yield takeLatest(requestDeleteEmployeeOfRoleSuccess, function* () {
    const idRoleSelected = yield select((state) => state.permission.infoRoleSelected);

    yield put(handleEmployeeWithoutRole(idRoleSelected._id));
    yield put(handleGetEmployeeOfRole(idRoleSelected._id));
    yield getNotification('success', 'Xóa tài khoản khỏi vai trò thành công.');
  });

  yield takeLatest(requestDeleteEmployeeOfRoleFail, function* () {
    yield call(getNotification, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
  });

  //Update permission role
  yield takeLatest(requestUpdateUpdatePermissionRoleSuccess, function* () {
    const idRoleSelected = yield select((state) => state.permission.infoRoleSelected);

    yield put(handleGetPermissionOfRole(idRoleSelected._id));
    yield put(setVisibleModalUpdatePermissionRole(false));
    yield getNotification('success', 'Cập nhật quyền hạn thành công.');
  });

  yield takeLatest(requestUpdateUpdatePermissionRoleFail, function* () {
    yield call(getNotification, 'error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
  });
}

export default function* loadUserSaga() {
  yield all([fork(loadRouteData), fork(handleActions)]);
}
