import callApi from '../callApi.js';
import {
  requestCreateRole,
  requestCreateRoleFail,
  requestCreateRoleSuccess,
  requestDeleteEmployeeOfRole,
  requestDeleteEmployeeOfRoleFail,
  requestDeleteEmployeeOfRoleSuccess,
  requestDeleteRole,
  requestDeleteRoleFail,
  requestDeleteRoleSuccess,
  requestGetEmployeeOfRoleFail,
  requestGetEmployeeOfRoleSuccess,
  requestGetEmployeeWithoutRoleFail,
  requestGetEmployeeWithoutRoleSuccess,
  requestGetListEmployeeOfRole,
  requestGetListEmployeeWithoutRole,
  requestGetListPermission,
  requestGetListRole,
  requestGetListType,
  requestGetPermissionFail,
  requestGetPermissionSuccess,
  requestGetRoleFail,
  requestGetRoleSuccess,
  requestGetTypeFail,
  requestGetTypeSuccess,
  requestUpdateEmployeeOfRole,
  requestUpdateEmployeeOfRoleFail,
  requestUpdateEmployeeOfRoleSuccess,
  requestUpdateRole,
  requestUpdateRoleFail,
  requestUpdateRoleSuccess,
  requestUpdateUpdatePermissionRole,
  requestUpdateUpdatePermissionRoleFail,
  requestUpdateUpdatePermissionRoleSuccess,
} from '@/states/modules/permissions/index.js';

export const handleGetRoles = () => async (dispatch, getState) => {
  return await callApi({
    method: 'get',
    apiPath: `/admin/roles`,
    actionTypes: [requestGetListRole, requestGetRoleSuccess, requestGetRoleFail],
    dispatch,
    getState,
  });
};

export const handleCreateRole = (data) => async (dispatch, getState) => {
  return await callApi({
    method: 'post',
    apiPath: `/admin/roles`,
    actionTypes: [requestCreateRole, requestCreateRoleSuccess, requestCreateRoleFail],
    variables: {
      name: data.name,
      description: data.description,
      parent_id: data.parent_id,
    },
    dispatch,
    getState,
  });
};

export const handleUpdateRole = (permissionId, data) => async (dispatch, getState) => {
  return await callApi({
    method: 'put',
    apiPath: `/admin/roles/${permissionId}`,
    actionTypes: [requestUpdateRole, requestUpdateRoleSuccess, requestUpdateRoleFail],
    variables: {
      name: data.name,
      description: data.description,
      parent_id: data.parent_id,
    },
    dispatch,
    getState,
  });
};

export const handleDeleteRole = (roleId) => async (dispatch, getState) => {
  return callApi({
    method: 'delete',
    apiPath: `/admin/roles/${roleId}`,
    actionTypes: [requestDeleteRole, requestDeleteRoleSuccess, requestDeleteRoleFail],
    variables: {},
    dispatch,
    getState,
  });
};

export const handleUpdateAddEmployeeOfRole = (roleId, data) => async (dispatch, getState) => {
  return await callApi({
    method: 'put',
    apiPath: `/admin/roles/${roleId}/update-role-admin`,
    actionTypes: [
      requestUpdateEmployeeOfRole, 
      requestUpdateEmployeeOfRoleSuccess, 
      requestUpdateEmployeeOfRoleFail
    ],
    variables: {
      admin_ids: data.employee_ids,
    },
    dispatch,
    getState,
  });
};

export const handleGetEmployeeOfRole = (roleId) => async (dispatch, getState) => {
  return await callApi({
    method: 'get',
    apiPath: `/admin/roles/${roleId}/employees`,
    actionTypes: [
      requestGetListEmployeeOfRole, 
      requestGetEmployeeOfRoleSuccess, 
      requestGetEmployeeOfRoleFail
    ],
    dispatch,
    getState,
  });
};

export const handleEmployeeWithoutRole = (roleId) => async (dispatch, getState) => {
  let query = getState().permission.queryEmployeeWithoutRole;
  let variables = {};
  if (query.page) {
    variables.q = query.q;
  }
  if (query.page) {
    variables.page = query.page;
  }
  if (query.page_size) {
    variables.page_size = query.page_size;
  }
  return await callApi({
    method: 'get',
    apiPath: `/admin/roles/${roleId}/employees-without-role`,
    actionTypes: [
      requestGetListEmployeeWithoutRole,
      requestGetEmployeeWithoutRoleSuccess,
      requestGetEmployeeWithoutRoleFail,
    ],
    variables: variables,
    dispatch,
    getState,
  });
};

export const handleDeleteEmployeeOfRole = (roleId, employeeId) => async (dispatch, getState) => {
  return callApi({
    method: 'delete',
    apiPath: `/admin/roles/${roleId}/remove-role-admin/${employeeId}/`,
    actionTypes: [
      requestDeleteEmployeeOfRole, 
      requestDeleteEmployeeOfRoleSuccess, 
      requestDeleteEmployeeOfRoleFail
    ],
    dispatch,
    getState,
  });
};

export const handleUpdatePermissionRole = (id, permissionId) => async (dispatch, getState) => {
  return await callApi({
    method: 'put',
    apiPath: `/admin/roles/${id}/update-permission-for-role/${permissionId}`,
    actionTypes: [
      requestUpdateUpdatePermissionRole,
      requestUpdateUpdatePermissionRoleSuccess,
      requestUpdateUpdatePermissionRoleFail,
    ],
    dispatch,
    getState,
  });
};

export const handleGetTypes = () => async (dispatch, getState) => {
  return await callApi({
    method: 'get',
    apiPath: `/admin/permissions/types`,
    actionTypes: [requestGetListType, requestGetTypeSuccess, requestGetTypeFail],
    dispatch,
    getState,
  });
};

export const handleGetPermissionOfRole = (roleId) => async (dispatch, getState) => {
  return await callApi({
    method: 'get',
    apiPath: `/admin/permissions/${roleId}`,
    actionTypes: [
      requestGetListPermission, 
      requestGetPermissionSuccess, 
      requestGetPermissionFail
    ],
    dispatch,
    getState,
  });
};
