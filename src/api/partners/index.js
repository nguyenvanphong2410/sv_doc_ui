import callApi from '@/api/callApi';
import {
  changePassWordOther,
  changePassWordOtherFail,
  changePassWordOtherSuccess,
  changePassWordStudent,
  changePassWordStudentFail,
  changePassWordStudentSuccess,
  changePassWordTeacher,
  changePassWordTeacherFail,
  changePassWordTeacherSuccess,
  changeStatusOther,
  changeStatusOtherFail,
  changeStatusOtherSuccess,
  changeStatusStudent,
  changeStatusStudentFail,
  changeStatusStudentSuccess,
  changeStatusTeacher,
  changeStatusTeacherFail,
  changeStatusTeacherSuccess,
  createOther,
  createOtherFail,
  createOtherSuccess,
  createStudent,
  createStudentFail,
  createStudentSuccess,
  createTeacher,
  createTeacherFail,
  createTeacherSuccess,
  deleteOther,
  deleteOtherFail,
  deleteOtherSuccess,
  deleteStudent,
  deleteStudentFail,
  deleteStudentSuccess,
  deleteTeacher,
  deleteTeacherFail,
  deleteTeacherSuccess,
  getListOther,
  getListOtherFailure,
  getListOtherSuccess,
  getListStudent,
  getListStudentFailure,
  getListStudentSuccess,
  getListTeacher,
  getListTeacherFailure,
  getListTeacherSuccess,
  updateOther,
  updateOtherFail,
  updateOtherSuccess,
  updateStudent,
  updateStudentFail,
  updateStudentSuccess,
  updateTeacher,
  updateTeacherFail,
  updateTeacherSuccess,
} from '@/states/modules/partner';
import _ from 'lodash';

//Other
export const requestGetListOther = () => async (dispatch, getState) => {
  const dataFilter = getState().partner.dataFilterOther;
  let path = `/admin/user-type/other?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

  if (dataFilter.keySearch) {
    path += `&q=${dataFilter.keySearch}`;
  }

  if (dataFilter.sort_order) {
    path += `&sort_order=${dataFilter.sort_order}&field=${dataFilter.column}`;
  }

  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [getListOther, getListOtherSuccess, getListOtherFailure],
    variables: {},
    dispatch,
    getState,
  });
};

export const requestCreateOther = (data) => async (dispatch, getState) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  return callApi({
    method: 'post',
    apiPath: '/admin/user-type/other',
    actionTypes: [createOther, createOtherSuccess, createOtherFail],
    variables: {...data},
    dispatch,
    getState,
    headers,
  });
};

export const requestUpdateOther = (id, data) => async (dispatch, getState) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };

  let dataOther = _.cloneDeep(data);
  delete dataOther?._id;

  if (dataOther.avatar !== 'delete' && typeof dataOther.avatar === 'string') {
    delete dataOther.avatar;
  }
  return callApi({
    method: 'put',
    apiPath: `admin/user-type/other/${id}`,
    actionTypes: [updateOther, updateOtherSuccess, updateOtherFail],
    variables: {...dataOther},
    dispatch,
    getState,
    headers,
  });
};

export const handleChangeStatusOther = (id, data) => async (dispatch, getState) => {
  return callApi({
    method: 'put',
    apiPath: `/admin/user-type/other/update-status/${id}`,
    actionTypes: [changeStatusOther, changeStatusOtherSuccess, changeStatusOtherFail],
    variables: {
      status: data,
    },
    dispatch,
    getState,
  });
};

export const handleChangePassOther = (id, data) => async (dispatch, getState) => {
  return callApi({
    method: 'patch',
    apiPath: `/admin/user-type/other/reset-password/${id}`,
    actionTypes: [changePassWordOther, changePassWordOtherSuccess, changePassWordOtherFail],
    variables: {
      ...data,
    },
    dispatch,
    getState,
  });
};

export const requestDeleteOther = (id) => async (dispatch, getState) => {
  return callApi({
    method: 'delete',
    apiPath: `/admin/user-type/other/${id}`,
    actionTypes: [deleteOther, deleteOtherSuccess, deleteOtherFail],
    variables: {},
    dispatch,
    getState,
  });
};

//Teacher
export const requestGetListTeacher = () => async (dispatch, getState) => {
  const dataFilter = getState().partner.dataFilterTeacher;
  let path = `/admin/user-type/teacher?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

  if (dataFilter.keySearch) {
    path += `&q=${dataFilter.keySearch}`;
  }

  if (dataFilter.sort_order) {
    path += `&sort_order=${dataFilter.sort_order}&field=${dataFilter.column}`;
  }

  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [getListTeacher, getListTeacherSuccess, getListTeacherFailure],
    variables: {},
    dispatch,
    getState,
  });
};

export const requestCreateTeacher = (data) => async (dispatch, getState) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  return callApi({
    method: 'post',
    apiPath: '/admin/user-type/teacher',
    actionTypes: [createTeacher, createTeacherSuccess, createTeacherFail],
    variables: {...data},
    dispatch,
    getState,
    headers,
  });
};

export const requestUpdateTeacher = (id, data) => async (dispatch, getState) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };

  let dataTeacher = _.cloneDeep(data);
  delete dataTeacher?._id;

  if (dataTeacher.avatar !== 'delete' && typeof dataTeacher.avatar === 'string') {
    delete dataTeacher.avatar;
  }
  return callApi({
    method: 'put',
    apiPath: `admin/user-type/teacher/${id}`,
    actionTypes: [updateTeacher, updateTeacherSuccess, updateTeacherFail],
    variables: {...dataTeacher},
    dispatch,
    getState,
    headers,
  });
};

export const handleChangeStatusTeacher = (id, data) => async (dispatch, getState) => {
  return callApi({
    method: 'put',
    apiPath: `/admin/user-type/teacher/update-status/${id}`,
    actionTypes: [changeStatusTeacher, changeStatusTeacherSuccess, changeStatusTeacherFail],
    variables: {
      status: data,
    },
    dispatch,
    getState,
  });
};

export const handleChangePassTeacher = (id, data) => async (dispatch, getState) => {
  return callApi({
    method: 'patch',
    apiPath: `/admin/user-type/teacher/reset-password/${id}`,
    actionTypes: [changePassWordTeacher, changePassWordTeacherSuccess, changePassWordTeacherFail],
    variables: {
      ...data,
    },
    dispatch,
    getState,
  });
};
export const requestDeleteTeacher = (id) => async (dispatch, getState) => {
  return callApi({
    method: 'delete',
    apiPath: `/admin/user-type/teacher/${id}`,
    actionTypes: [deleteTeacher, deleteTeacherSuccess, deleteTeacherFail],
    variables: {},
    dispatch,
    getState,
  });
};

//Student
export const requestGetListStudent = () => async (dispatch, getState) => {
  const dataFilter = getState().partner.dataFilterStudent;
  let path = `/admin/user-type/student?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

  if (dataFilter.keySearch) {
    path += `&q=${dataFilter.keySearch}`;
  }

  if (dataFilter.sort_order) {
    path += `&sort_order=${dataFilter.sort_order}&field=${dataFilter.column}`;
  }

  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [getListStudent, getListStudentSuccess, getListStudentFailure],
    variables: {},
    dispatch,
    getState,
  });
};

export const requestCreateStudent = (data) => async (dispatch, getState) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  return callApi({
    method: 'post',
    apiPath: '/admin/user-type/student',
    actionTypes: [createStudent, createStudentSuccess, createStudentFail],
    variables: {...data},
    dispatch,
    getState,
    headers,
  });
};

export const requestUpdateStudent = (id, data) => async (dispatch, getState) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };

  let dataStudent = _.cloneDeep(data);
  delete dataStudent?._id;

  if (dataStudent.avatar !== 'delete' && typeof dataStudent.avatar === 'string') {
    delete dataStudent.avatar;
  }
  return callApi({
    method: 'put',
    apiPath: `admin/user-type/student/${id}`,
    actionTypes: [updateStudent, updateStudentSuccess, updateStudentFail],
    variables: {...dataStudent},
    dispatch,
    getState,
    headers,
  });
};

export const handleChangeStatusStudent = (id, data) => async (dispatch, getState) => {
  return callApi({
    method: 'put',
    apiPath: `/admin/user-type/student/update-status/${id}`,
    actionTypes: [changeStatusStudent, changeStatusStudentSuccess, changeStatusStudentFail],
    variables: {
      status: data,
    },
    dispatch,
    getState,
  });
};

export const handleChangePassStudent = (id, data) => async (dispatch, getState) => {
  return callApi({
    method: 'patch',
    apiPath: `/admin/user-type/student/reset-password/${id}`,
    actionTypes: [changePassWordStudent, changePassWordStudentSuccess, changePassWordStudentFail],
    variables: {
      ...data,
    },
    dispatch,
    getState,
  });
};
export const requestDeleteStudent = (id) => async (dispatch, getState) => {
  return callApi({
    method: 'delete',
    apiPath: `/admin/user-type/student/${id}`,
    actionTypes: [deleteStudent, deleteStudentSuccess, deleteStudentFail],
    variables: {},
    dispatch,
    getState,
  });
};