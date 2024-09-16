import callApi from '@/api/callApi'
import { getListDocumentChecked, getListDocumentCheckedFailure, getListDocumentCheckedSuccess, getListDocumentLock, getListDocumentLockFailure, getListDocumentLockSuccess, getListDocumentPending, getListDocumentPendingFailure, getListDocumentPendingSuccess } from '@/states/modules/document'
import { 
  changePassWordEmployee, 
  changePassWordEmployeeFail, 
  changePassWordEmployeeSuccess, 
  changeStatusEmployee, 
  changeStatusEmployeeFail, 
  changeStatusEmployeeSuccess, 
  createEmployee, 
  createEmployeeFail, 
  createEmployeeSuccess, 
  deleteEmployee, 
  deleteEmployeeFail, 
  deleteEmployeeSuccess, 
  getDetailEmployee, 
  getDetailEmployeeFailure, 
  getDetailEmployeeSuccess, 
  getListEmployee, 
  getListEmployeeFailure, 
  getListEmployeeSuccess, 
  updateEmployee, 
  updateEmployeeFail, 
  updateEmployeeSuccess 
} from '@/states/modules/employee'
import _ from 'lodash'

export const getListEmployees = () => async (dispatch, getState) => {
  const dataFilter = getState().employee.dataFilter
  let path = `/admin/employees?per_page=${dataFilter.perPage}&page=${dataFilter.page}`
  
  if (dataFilter.keySearch) {
    path += `&q=${dataFilter.keySearch}`
  }
  
  if (dataFilter.sort_order) {
    path += `&sort_order=${dataFilter.sort_order}&field=${dataFilter.column}`
  }
  
  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [
      getListEmployee,
      getListEmployeeSuccess,
      getListEmployeeFailure
    ],
    variables: {},
    dispatch,
    getState,
  })
}

export const getDetailEmployees = (id) => (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: `/admin/employees/${id}`,
    actionTypes: [
      getDetailEmployee,
      getDetailEmployeeSuccess,
      getDetailEmployeeFailure
    ],
    variables: {},
    dispatch,
    getState,
  })
}

export const handleCreateEmployee = (data) => async (dispatch, getState) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  }
  
  return callApi({
    method: 'post',
    apiPath: '/admin/employees',
    actionTypes: [
      createEmployee,
      createEmployeeSuccess,
      createEmployeeFail
    ],
    variables: {...data},
    dispatch,
    getState,
    headers,
  })
}

export const handleUpdateEmployee = (id, data) => async (dispatch, getState) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  }
  
  let dataEmployee = _.cloneDeep(data)
  delete dataEmployee?._id
  
  if (dataEmployee.avatar !== 'delete' && typeof dataEmployee.avatar === 'string') {
    delete dataEmployee.avatar
  }
  
  return callApi({
    method: 'put',
    apiPath: `/admin/employees/${id}`,
    actionTypes: [
      updateEmployee,
      updateEmployeeSuccess,
      updateEmployeeFail
    ],
    variables: {...dataEmployee},
    dispatch,
    getState,
    headers,
  })
}

export const handleChangeStatusEmployee = (id, data) => async (dispatch, getState) => {
  return callApi({
    method: 'put',
    apiPath: `/admin/employees/update-status/${id}`,
    actionTypes: [
      changeStatusEmployee,
      changeStatusEmployeeSuccess,
      changeStatusEmployeeFail
    ],
    variables: {
      status: data,
    },
    dispatch,
    getState,
  })
}

export const handleChangePassEmployee = (id, data) => async (dispatch, getState) => {
  return callApi({
    method: 'patch',
    apiPath: `/admin/employees/reset-password/${id}`,
    actionTypes: [
      changePassWordEmployee,
      changePassWordEmployeeSuccess,
      changePassWordEmployeeFail
    ],
    variables: {
      ...data,
    },
    dispatch,
    getState,
  })
}

export const handleDeleteEmployee = (id) => async (dispatch, getState) => {
  return callApi({
    method: 'delete',
    apiPath: `/admin/employees/${id}`,
    actionTypes: [
      deleteEmployee,
      deleteEmployeeSuccess,
      deleteEmployeeFail
    ],
    variables: {},
    dispatch,
    getState,
  })
}


// Doc P - C - L

export const requestGetListDocumentsPendingForAdmin = (id) => async (dispatch, getState) => {
  const dataFilter = getState().document.dataFilterPending;
  let path = `/user/document/my-doc-pending/${id}?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

  if (dataFilter.keySearch) {
    path += `&q=${dataFilter.keySearch}`;
  }

  if (dataFilter.sort_order) {
    path += `&sort_order=${dataFilter.sort_order}&field=${dataFilter.column}`;
  }

  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [getListDocumentPending, getListDocumentPendingSuccess, getListDocumentPendingFailure],
    variables: {},
    dispatch,
    getState,
  });
};

export const requestGetListDocumentsCheckedForAdmin = (id) => async (dispatch, getState) => {
  const dataFilter = getState().document.dataFilterChecked;
  let path = `/user/document/my-doc-checked/${id}?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

  if (dataFilter.keySearch) {
    path += `&q=${dataFilter.keySearch}`;
  }

  if (dataFilter.sort_order) {
    path += `&sort_order=${dataFilter.sort_order}&field=${dataFilter.column}`;
  }

  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [getListDocumentChecked, getListDocumentCheckedSuccess, getListDocumentCheckedFailure],
    variables: {},
    dispatch,
    getState,
  });
};

export const requestGetListDocumentsLockForAdmin = (id) => async (dispatch, getState) => {
  const dataFilter = getState().document.dataFilterLock;
  let path = `/user/document/my-doc-lock/${id}?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

  if (dataFilter.keySearch) {
    path += `&q=${dataFilter.keySearch}`;
  }

  if (dataFilter.sort_order) {
    path += `&sort_order=${dataFilter.sort_order}&field=${dataFilter.column}`;
  }

  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [getListDocumentLock, getListDocumentLockSuccess, getListDocumentLockFailure],
    variables: {},
    dispatch,
    getState,
  });
};