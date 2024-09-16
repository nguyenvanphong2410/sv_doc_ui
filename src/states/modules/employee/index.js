import {createSlice} from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    visibleModalChangePass: false,
    isLoadingTableEmployee: false,
    isLoadingBtnCreateEmployee: false,
    isLoadingBtnUpdateEmployee: false,
    isLoadingBtnDeleteEmployee: false,
    isLoadingBtnChangePassWordEmployee: false,
    visibleModalCreateOrUpdateEmployee: false,
    visibleModalListDocEmployee: false,

    infoEmployee: {
      name: "",
      email: "",
      phone: "",
      avatar: "",
      status: "",
      avatarUrl: "",
      password: "",
    },
    errorInfoEmployee: {
      name: "",
      email: "",
      phone: "",
      avatar: "",
      avatarUrl: "",
      password: "",
    },
    dataChangePassEmployee: {
      new_password: "",
      confirm_password: "",
    },
    errorDataChangePassEmployee: {
      new_password: "",
      confirm_password: "",
    },
    dataFilter: {
      keySearch: "",
      perPage: 20,
      page: 1,
      sort_order: null,
      column: null,
    },
    paginationListEmployees: {
      currentPage: 1,
      perPage: 20,
      totalRecord: 0,
    },
    employees: [],
    configModal: {
      title: '',
      type: '',
    },
  },
  reducers: {
    setVisibleModalChangePass: (state, action) => ({
      ...state,
      visibleModalChangePass: action.payload,
    }),
    setInfoEmployee: (state, action) => ({
      ...state,
      infoEmployee: action.payload,
    }),
    setErrorInfoEmployee: (state, action) => ({
      ...state,
      errorInfoEmployee: action.payload,
    }),
    setDataChangePassEmployee: (state, action) => ({
      ...state,
      dataChangePassEmployee: action.payload,
    }),
    setErrorDataChangePassEmployee: (state, action) => ({
      ...state,
      errorDataChangePassEmployee: action.payload,
    }),
    getListEmployee: (state) => ({
      ...state,
      employees: [],
      isLoadingTableEmployee: true,
      paginationListEmployees: {
        currentPage: 1,
        perPage: 20,
        totalRecord: 0,
      },
    }),
    getListEmployeeSuccess: (state, action) => ({
      ...state,
      isLoadingTableEmployee: false,
      employees: action.payload.data.employees,
      paginationListEmployees: {
        currentPage: action.payload.data.page,
        perPage: action.payload.data.per_page,
        totalRecord: action.payload.data.total,
      },
    }),
    getListEmployeeFailure: (state) => ({
      ...state,
      employees: [],
      isLoadingTableEmployee: false,
    }),
    getDetailEmployee: (state) => ({
      ...state,
      infoEmployee: {},
    }),
    getDetailEmployeeSuccess: (state, action) => ({
      ...state,
      infoEmployee: action.payload,
    }),
    getDetailEmployeeFailure: (state) => ({
      ...state,
      infoEmployee: {},
    }),
    changeStatusEmployee: (state) => ({
      ...state,
      status: "",
    }),
    changeStatusEmployeeSuccess: (state, action) => ({
      ...state,
      status: action.payload,
    }),
    changeStatusEmployeeFail: (state) => ({
      ...state,
      status: "",
    }),
    setDataFilter: (state, action) => ({
      ...state,
      dataFilter: action.payload,
    }),
    setPaginationListEmployees: (state, action) => ({
      ...state,
      paginationListEmployees: action.payload,
    }),
    createEmployee: (state) => ({
      ...state,
      isLoadingBtnCreateEmployee: true,
    }),
    createEmployeeSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateEmployee: false,
    }),
    createEmployeeFail: (state) => ({
      ...state,
      isLoadingBtnCreateEmployee: false,
    }),
    updateEmployee: (state) => ({
      ...state,
      isLoadingBtnUpdateEmployee: true,
    }),
    updateEmployeeSuccess: (state) => ({
      ...state,
      isLoadingBtnUpdateEmployee: false,
    }),
    updateEmployeeFail: (state) => ({
      ...state,
      isLoadingBtnUpdateEmployee: false,
    }),
    deleteEmployee: (state) => ({
      ...state,
      isLoadingBtnDeleteEmployee: true,
    }),
    deleteEmployeeSuccess: (state) => ({
      ...state,
      isLoadingBtnDeleteEmployee: false,
    }),
    deleteEmployeeFail: (state) => ({
      ...state,
      isLoadingBtnDeleteEmployee: false,
    }),
    changePassWordEmployee: (state) => ({
      ...state,
      isLoadingBtnChangePassWordEmployee: true,
    }),
    changePassWordEmployeeSuccess: (state) => ({
      ...state,
      isLoadingBtnChangePassWordEmployee: false,
    }),
    changePassWordEmployeeFail: (state) => ({
      ...state,
      isLoadingBtnChangePassWordEmployee: false,
    }),
    setConfigModal: (state, action) => ({
      ...state,
      configModal: action.payload,
    }),
    setVisibleModalCreateOrUpdateEmployee: (state, action) => ({
      ...state,
      visibleModalCreateOrUpdateEmployee: action.payload,
    }),
    setVisibleModalListDocEmployee: (state, action) => ({
      ...state,
      visibleModalListDocEmployee: action.payload,
    }),

  },
});

export const {
  setVisibleModalChangePass,
  setInfoEmployee,
  setErrorInfoEmployee,
  setDataChangePassEmployee,
  setErrorDataChangePassEmployee,
  getListEmployee,
  getListEmployeeSuccess,
  getListEmployeeFailure,
  changeStatusEmployee,
  changeStatusEmployeeSuccess,
  changeStatusEmployeeFail,
  getDetailEmployee,
  getDetailEmployeeSuccess,
  getDetailEmployeeFailure,
  setDataFilter,
  setPaginationListEmployees,
  createEmployee,
  createEmployeeSuccess,
  createEmployeeFail,
  updateEmployee,
  updateEmployeeSuccess,
  updateEmployeeFail,
  deleteEmployee,
  deleteEmployeeSuccess,
  deleteEmployeeFail,
  changePassWordEmployee,
  changePassWordEmployeeSuccess,
  changePassWordEmployeeFail,
  setConfigModal,
  setVisibleModalCreateOrUpdateEmployee,
  setVisibleModalListDocEmployee,
} = employeeSlice.actions;
export default employeeSlice.reducer;
