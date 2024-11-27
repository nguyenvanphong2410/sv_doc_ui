import {createSlice} from '@reduxjs/toolkit';
import {
  initConfigModalPartner,
  initDataFilterPartner,
  initInfoPartner,
  initPaginationListPartner,
} from './initState';

const partnerSlice = createSlice({
  name: 'partner',
  initialState: {
    //Others
    isLoadingTableOther: false,
    isLoadingBtnCreateOther: false,
    isLoadingBtnUpdateOther: false,
    isLoadingBtnDeleteOther: false,
    visibleModalCreateOrUpdateOther: false,
    isLoadingBtnChangePassWordOther: false,
    visibleModalChangePassOther: false,
    visibleModalListDocOther: false,

    infoOther: initInfoPartner,
    errorInfoOther: initInfoPartner,
    dataFilterOther: initDataFilterPartner,
    paginationListOther: initPaginationListPartner,
    others: [],
    configModalOther: initConfigModalPartner,
    dataChangePassOther: {
      new_password: '',
      confirm_password: '',
    },
    errorDataChangePassOther: {
      new_password: '',
      confirm_password: '',
    },

    //Teacher
    isLoadingTableTeacher: false,
    isLoadingBtnCreateTeacher: false,
    isLoadingBtnUpdateTeacher: false,
    isLoadingBtnDeleteTeacher: false,
    visibleModalCreateOrUpdateTeacher: false,
    visibleModalListDocTeacher: false,
    visibleModalChangePassTeacher: false,

    infoTeacher: initInfoPartner,
    errorInfoTeacher: initInfoPartner,
    dataFilterTeacher: initDataFilterPartner,
    paginationListTeacher: initPaginationListPartner,
    teachers: [],
    configModalTeacher: initConfigModalPartner,
    dataChangePassTeacher: {
      new_password: '',
      confirm_password: '',
    },
    errorDataChangePassTeacher: {
      new_password: '',
      confirm_password: '',
    },

    //Student
    isLoadingTableStudent: false,
    isLoadingBtnCreateStudent: false,
    isLoadingBtnUpdateStudent: false,
    isLoadingBtnDeleteStudent: false,
    visibleModalCreateOrUpdateStudent: false,
    visibleModalListDocStudent: false,
    visibleModalChangePassStudent: false,

    infoStudent: initInfoPartner,
    errorInfoStudent: initInfoPartner,
    dataFilterStudent: initDataFilterPartner,
    paginationListStudent: initPaginationListPartner,
    student: [],
    configModalStudent: initConfigModalPartner,
    dataChangePassStudent: {
      new_password: '',
      confirm_password: '',
    },
    errorDataChangePassStudent: {
      new_password: '',
      confirm_password: '',
    },
  },
  reducers: {
    //Others
    setVisibleModalCreateOrUpdateOther: (state, action) => ({
      ...state,
      visibleModalCreateOrUpdateOther: action.payload,
    }),
    setInfoOther: (state, action) => ({
      ...state,
      infoOther: action.payload,
    }),
    setErrorInfoOther: (state, action) => ({
      ...state,
      errorInfoOther: action.payload,
    }),
    getListOther: (state) => ({
      ...state,
      isLoadingTableOther: true,
    }),
    getListOtherSuccess: (state, action) => ({
      ...state,
      isLoadingTableOther: false,
      others: action.payload.data.usersType,
      paginationListOther: {
        currentPage: action.payload.data.page,
        perPage: action.payload.data.per_page,
        totalRecord: action.payload.data.total,
      },
    }),
    getListOtherFailure: (state) => ({
      ...state,
      isLoadingTableOther: false,
    }),
    setDataFilterOther: (state, action) => ({
      ...state,
      dataFilterOther: action.payload,
    }),
    setPaginationListOther: (state, action) => ({
      ...state,
      paginationListOther: action.payload,
    }),
    createOther: (state) => ({
      ...state,
      isLoadingBtnCreateOther: true,
    }),
    createOtherSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateOther: false,
    }),
    createOtherFail: (state) => ({
      ...state,
      isLoadingBtnCreateOther: false,
    }),
    updateOther: (state) => ({
      ...state,
      isLoadingBtnUpdateOther: true,
    }),
    updateOtherSuccess: (state) => ({
      ...state,
      isLoadingBtnUpdateOther: false,
    }),
    updateOtherFail: (state) => ({
      ...state,
      isLoadingBtnUpdateOther: false,
    }),
    deleteOther: (state) => ({
      ...state,
      isLoadingBtnDeleteOther: true,
    }),
    deleteOtherSuccess: (state) => ({
      ...state,
      isLoadingBtnDeleteOther: false,
    }),
    deleteOtherFail: (state) => ({
      ...state,
      isLoadingBtnDeleteOther: false,
    }),
    setConfigModalOther: (state, action) => ({
      ...state,
      configModalOther: action.payload,
    }),
    changeStatusOther: (state) => ({
      ...state,
      status: '',
    }),
    changeStatusOtherSuccess: (state, action) => ({
      ...state,
      status: action.payload,
    }),
    changeStatusOtherFail: (state) => ({
      ...state,
      status: '',
    }),
    changePassWordOther: (state) => ({
      ...state,
      isLoadingBtnChangePassWordOther: true,
    }),
    changePassWordOtherSuccess: (state) => ({
      ...state,
      isLoadingBtnChangePassWordOther: false,
    }),
    changePassWordOtherFail: (state) => ({
      ...state,
      isLoadingBtnChangePassWordOther: false,
    }),
    setDataChangePassOther: (state, action) => ({
      ...state,
      dataChangePassOther: action.payload,
    }),
    setErrorDataChangePassOther: (state, action) => ({
      ...state,
      errorDataChangePassOther: action.payload,
    }),
    setVisibleModalChangePassOther: (state, action) => ({
      ...state,
      visibleModalChangePassOther: action.payload,
    }),
    setVisibleModalListDocOther: (state, action) => ({
      ...state,
      visibleModalListDocOther: action.payload,
    }),
    
    //////////////////////////////////////////////////////////////////////////////
    //Teacher
    setVisibleModalCreateOrUpdateTeacher: (state, action) => ({
      ...state,
      visibleModalCreateOrUpdateTeacher: action.payload,
    }),
    setInfoTeacher: (state, action) => ({
      ...state,
      infoTeacher: action.payload,
    }),
    setErrorInfoTeacher: (state, action) => ({
      ...state,
      errorInfoTeacher: action.payload,
    }),
    getListTeacher: (state) => ({
      ...state,
      isLoadingTableTeacher: true,
    }),
    getListTeacherSuccess: (state, action) => ({
      ...state,
      isLoadingTableTeacher: false,
      teachers: action.payload.data.teachers,
      paginationListTeacher: {
        currentPage: action.payload.data.page,
        perPage: action.payload.data.per_page,
        totalRecord: action.payload.data.total,
      },
    }),
    getListTeacherFailure: (state) => ({
      ...state,
      isLoadingTableTeacher: false,
    }),
    setDataFilterTeacher: (state, action) => ({
      ...state,
      dataFilterTeacher: action.payload,
    }),
    setPaginationListTeacher: (state, action) => ({
      ...state,
      paginationListTeacher: action.payload,
    }),
    createTeacher: (state) => ({
      ...state,
      isLoadingBtnCreateTeacher: true,
    }),
    createTeacherSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateTeacher: false,
    }),
    createTeacherFail: (state) => ({
      ...state,
      isLoadingBtnCreateTeacher: false,
    }),
    updateTeacher: (state) => ({
      ...state,
      isLoadingBtnUpdateTeacher: true,
    }),
    updateTeacherSuccess: (state) => ({
      ...state,
      isLoadingBtnUpdateTeacher: false,
    }),
    updateTeacherFail: (state) => ({
      ...state,
      isLoadingBtnUpdateTeacher: false,
    }),
    deleteTeacher: (state) => ({
      ...state,
      isLoadingBtnDeleteTeacher: true,
    }),
    deleteTeacherSuccess: (state) => ({
      ...state,
      isLoadingBtnDeleteTeacher: false,
    }),
    deleteTeacherFail: (state) => ({
      ...state,
      isLoadingBtnDeleteTeacher: false,
    }),
    setConfigModalTeacher: (state, action) => ({
      ...state,
      configModalTeacher: action.payload,
    }),
    changeStatusTeacher: (state) => ({
      ...state,
      status: '',
    }),
    changeStatusTeacherSuccess: (state, action) => ({
      ...state,
      status: action.payload,
    }),
    changeStatusTeacherFail: (state) => ({
      ...state,
      status: '',
    }),
    changePassWordTeacher: (state) => ({
      ...state,
      isLoadingBtnChangePassWordTeacher: true,
    }),
    changePassWordTeacherSuccess: (state) => ({
      ...state,
      isLoadingBtnChangePassWordTeacher: false,
      visibleModalChangePassTeacher: false,
    }),
    changePassWordTeacherFail: (state) => ({
      ...state,
      isLoadingBtnChangePassWordTeacher: false,
    }),
    setDataChangePassTeacher: (state, action) => ({
      ...state,
      dataChangePassTeacher: action.payload,
    }),
    setErrorDataChangePassTeacher: (state, action) => ({
      ...state,
      errorDataChangePassTeacher: action.payload,
    }),
    setVisibleModalChangePassTeacher: (state, action) => ({
      ...state,
      visibleModalChangePassTeacher: action.payload,
    }),
    setVisibleModalListDocTeacher: (state, action) => ({
      ...state,
      visibleModalListDocTeacher: action.payload,
    }),

    //////////////////////////////////////////////////////////
    //Student
    setVisibleModalCreateOrUpdateStudent: (state, action) => ({
      ...state,
      visibleModalCreateOrUpdateStudent: action.payload,
    }),
    setInfoStudent: (state, action) => ({
      ...state,
      infoStudent: action.payload,
    }),
    setErrorInfoStudent: (state, action) => ({
      ...state,
      errorInfoStudent: action.payload,
    }),
    getListStudent: (state) => ({
      ...state,
      isLoadingTableStudent: true,
    }),
    getListStudentSuccess: (state, action) => ({
      ...state,
      isLoadingTableStudent: false,
      students: action.payload.data.students,
      paginationListStudent: {
        currentPage: action.payload.data.page,
        perPage: action.payload.data.per_page,
        totalRecord: action.payload.data.total,
      },
    }),
    getListStudentFailure: (state) => ({
      ...state,
      isLoadingTableStudent: false,
    }),
    setDataFilterStudent: (state, action) => ({
      ...state,
      dataFilterStudent: action.payload,
    }),
    setPaginationListStudent: (state, action) => ({
      ...state,
      paginationListStudent: action.payload,
    }),
    createStudent: (state) => ({
      ...state,
      isLoadingBtnCreateStudent: true,
    }),
    createStudentSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateStudent: false,
    }),
    createStudentFail: (state) => ({
      ...state,
      isLoadingBtnCreateStudent: false,
    }),
    updateStudent: (state) => ({
      ...state,
      isLoadingBtnUpdateStudent: true,
    }),
    updateStudentSuccess: (state) => ({
      ...state,
      isLoadingBtnUpdateStudent: false,
    }),
    updateStudentFail: (state) => ({
      ...state,
      isLoadingBtnUpdateStudent: false,
    }),
    deleteStudent: (state) => ({
      ...state,
      isLoadingBtnDeleteStudent: true,
    }),
    deleteStudentSuccess: (state) => ({
      ...state,
      isLoadingBtnDeleteStudent: false,
    }),
    deleteStudentFail: (state) => ({
      ...state,
      isLoadingBtnDeleteStudent: false,
    }),
    setConfigModalStudent: (state, action) => ({
      ...state,
      configModalStudent: action.payload,
    }),
    changeStatusStudent: (state) => ({
      ...state,
      status: '',
    }),
    changeStatusStudentSuccess: (state, action) => ({
      ...state,
      status: action.payload,
    }),
    changeStatusStudentFail: (state) => ({
      ...state,
      status: '',
    }),
    changePassWordStudent: (state) => ({
      ...state,
      isLoadingBtnChangePassWordStudent: true,
    }),
    changePassWordStudentSuccess: (state) => ({
      ...state,
      isLoadingBtnChangePassWordStudent: false,
    }),
    changePassWordStudentFail: (state) => ({
      ...state,
      isLoadingBtnChangePassWordStudent: false,
    }),
    setDataChangePassStudent: (state, action) => ({
      ...state,
      dataChangePassStudent: action.payload,
    }),
    setErrorDataChangePassStudent: (state, action) => ({
      ...state,
      errorDataChangePassStudent: action.payload,
    }),
    setVisibleModalChangePassStudent: (state, action) => ({
      ...state,
      visibleModalChangePassStudent: action.payload,
    }),
    setVisibleModalListDocStudent: (state, action) => ({
      ...state,
      visibleModalListDocStudent: action.payload,
    }),
  },
});

export const {
  setVisibleModalCreateOrUpdateOther,
  setInfoOther,
  setErrorInfoOther,

  getListOther,
  getListOtherSuccess,
  getListOtherFailure,

  createOther,
  createOtherSuccess,
  createOtherFail,

  updateOther,
  updateOtherSuccess,
  updateOtherFail,

  deleteOther,
  deleteOtherSuccess,
  deleteOtherFail,

  setConfigModalOther,
  setDataFilterOther,
  setPaginationListOther,

  changeStatusOther,
  changeStatusOtherSuccess,
  changeStatusOtherFail,

  changePassWordOther,
  changePassWordOtherSuccess,
  changePassWordOtherFail,
  setDataChangePassOther,
  setErrorDataChangePassOther,
  setVisibleModalChangePassOther,
  setVisibleModalListDocOther,

  //Teacher
  setVisibleModalCreateOrUpdateTeacher,
  setInfoTeacher,
  setErrorInfoTeacher,

  getListTeacher,
  getListTeacherSuccess,
  getListTeacherFailure,

  createTeacher,
  createTeacherSuccess,
  createTeacherFail,

  updateTeacher,
  updateTeacherSuccess,
  updateTeacherFail,

  deleteTeacher,
  deleteTeacherSuccess,
  deleteTeacherFail,

  setConfigModalTeacher,
  setDataFilterTeacher,
  setPaginationListTeacher,
  changeStatusTeacher,
  changeStatusTeacherSuccess,
  changeStatusTeacherFail,
  changePassWordTeacher,
  changePassWordTeacherSuccess,
  changePassWordTeacherFail,
  setDataChangePassTeacher,
  setErrorDataChangePassTeacher,
  setVisibleModalChangePassTeacher,
  setVisibleModalListDocTeacher,

  //Student
  setVisibleModalCreateOrUpdateStudent,
  setInfoStudent,
  setErrorInfoStudent,

  getListStudent,
  getListStudentSuccess,
  getListStudentFailure,

  createStudent,
  createStudentSuccess,
  createStudentFail,

  updateStudent,
  updateStudentSuccess,
  updateStudentFail,

  deleteStudent,
  deleteStudentSuccess,
  deleteStudentFail,

  setConfigModalStudent,
  setDataFilterStudent,
  setPaginationListStudent,
  changeStatusStudent,
  changeStatusStudentSuccess,
  changeStatusStudentFail,
  changePassWordStudent,
  changePassWordStudentSuccess,
  changePassWordStudentFail,
  setDataChangePassStudent,
  setErrorDataChangePassStudent,
  setVisibleModalChangePassStudent,
  setVisibleModalListDocStudent

} = partnerSlice.actions;
export default partnerSlice.reducer;
