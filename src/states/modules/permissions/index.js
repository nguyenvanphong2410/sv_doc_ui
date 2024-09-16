import { createSlice } from "@reduxjs/toolkit";

export const initialQueryEmployeeWithoutRole = {
  q: "",
  page: 1, 
  page_size: 20
}

const permissionsSlice = createSlice({
  name: 'permission',
  initialState: {
    isLoadingListRole: false,
    isLoadingListType: false,
    isLoadingBtnDeleteRole: false,
    isLoadingListPermission: false,
    isLoadingListEmployeeOfRole: false,
    isLoadingBtnAddEmployeeOfRole: false,
    isLoadingBtnCreateOrUpdateRole: false,
    isLoadingBtnDeleteEmployeeOfRole: false,
    isLoadingBtnUpdatePermissionRole: false,
    isLoadingListEmployeeWithoutRole: false,

    visibleModalDeleteRole: false,
    visibleModalAddEmployeeOfRole: false,
    visibleModalCreateOrUpdateRole: false,
    visibleModalDeleteEmployeeOfRole: false,
    visibleModalUpdatePermissionRole: false,

    rolesList: [],
    typesList: [],
    employeeOfRoleList: [],
    employeeWithoutRoleList: [],
    permissionList: [],

    infoEmployeeIds:{
      employee_ids: []
    },
    infoRole: {
      name: "",
      description: "",
      parent_id: ""
    },
    infoRoleSelected: {
      name: "",
      description: ""
    },
    infoEmployeeSelected: {
      name: "",
      email:"",
    },
    infoPermissionRoleSelected: {},

    employeeIdsErr: {
      employee_ids: ""
    },
    errorCreateOrUpdateRole: {
      name: "",
      description: ""
    },

    queryEmployeeWithoutRole: initialQueryEmployeeWithoutRole,

    configModal: {
      title: "",
      type: "",
    },
  },
  reducers: {
    setInfoRole: (state, action) => ({
      ...state,
      infoRole: action.payload,
    }),
    setInfoRoleSelected: (state, action) => ({
      ...state,
      infoRoleSelected: action.payload,
    }),
    setConfigModal: (state, action) => ({
      ...state,
      configModal: action.payload,
    }),
    setVisibleModalCreateOrUpdateRole: (state, action) => ({
      ...state,
      visibleModalCreateOrUpdateRole: action.payload
    }),
    setErrorCreateOrUpdateRole: (state, action) => ({
      ...state,
      errorCreateOrUpdateRole: action.payload
    }),
    setDataFilterRole: (state, action) => ({
      ...state,
      dataFilter: action.payload
    }),

    //Role
    requestCreateRole: state => ({
      ...state,
      isLoadingBtnCreateOrUpdateRole: true
    }),
    requestCreateRoleSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateRole: false,
      visibleModalCreateOrUpdateRole: false
    }),
    requestCreateRoleFail: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateRole: false
    }),
    requestGetListRole: (state) => ({
      ...state,
      isLoadingListRole: true
    }),
    requestGetRoleSuccess: (state, action) => ({
      ...state,
      isLoadingListRole: false,
      rolesList: action.payload.data.roles,
    }),
    requestGetRoleFail: (state) => ({
      ...state,
      isLoadingListRole: false,
      rolesList: [],
    }),
    requestUpdateRole: state => ({
      ...state,
      isLoadingBtnCreateOrUpdateRole: true
    }),
    requestUpdateRoleSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateRole: false,
      visibleModalCreateOrUpdateRole: false
    }),
    requestUpdateRoleFail: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateRole: false
    }),
    setVisibleModalDeleteRole: (state, action) => ({
      ...state,
      visibleModalDeleteRole: action.payload
    }),
    requestDeleteRole: state => ({
      ...state,
      isLoadingBtnDeleteRole: true
    }),
    requestDeleteRoleSuccess: (state) => ({
      ...state,
      isLoadingBtnDeleteRole: false,
      visibleModalDeleteRole: false
    }),
    requestDeleteRoleFail: (state) => ({
      ...state,
      isLoadingBtnDeleteRole: false
    }),

    //Permission
    requestGetListPermission: (state) => ({
      ...state,
      isLoadingListPermission: true
    }),
    requestGetPermissionSuccess: (state, action) => ({
      ...state,
      isLoadingListPermission: false,
      permissionList: action.payload.data.permissions,
    }),
    requestGetPermissionFail: (state) => ({
      ...state,
      isLoadingListPermission: false,
      permissionList: [],
    }),

    //Employee Of Role
    requestGetListEmployeeOfRole: (state) => ({
      ...state,
      isLoadingListEmployeeOfRole: true
    }),
    requestGetEmployeeOfRoleSuccess: (state, action) => ({
      ...state,
      isLoadingListEmployeeOfRole: false,
      employeeOfRoleList: action.payload.data.admins,
    }),
    requestGetEmployeeOfRoleFail: (state) => ({
      ...state,
      isLoadingListEmployeeOfRole: false,
      employeeOfRoleList: [],
    }),
    requestGetListEmployeeWithoutRole: (state) => ({
      ...state,
      isLoadingListEmployeeWithoutRole: true
    }),
    requestGetEmployeeWithoutRoleSuccess: (state, action) => ({
      ...state,
      isLoadingListEmployeeWithoutRole: false,
      employeeWithoutRoleList: action.payload.data.admins,
    }),
    requestGetEmployeeWithoutRoleFail: (state) => ({
      ...state,
      isLoadingListEmployeeWithoutRole: false,
      employeeWithoutRoleList: [],
    }),
    requestDeleteEmployeeOfRole: state => ({
      ...state,
      isLoadingBtnDeleteEmployeeOfRole: true
    }),
    requestDeleteEmployeeOfRoleSuccess: (state) => ({
      ...state,
      isLoadingBtnDeleteEmployeeOfRole: false,
      visibleModalDeleteEmployeeOfRole: false
    }),
    requestDeleteEmployeeOfRoleFail: (state) => ({
      ...state,
      isLoadingBtnDeleteEmployeeOfRole: false
    }),
    setVisibleModalAddEmployeeOfRole: (state, action) => ({
      ...state,
      visibleModalAddEmployeeOfRole: action.payload
    }),
    setVisibleModalDeleteEmployeeOfRole: (state, action) => ({
      ...state,
      visibleModalDeleteEmployeeOfRole: action.payload
    }),
    setInfoEmployeeSelected: (state, action) => ({
      ...state,
      infoEmployeeSelected: action.payload,
    }),
    requestUpdateEmployeeOfRole: state => ({
      ...state,
      isLoadingBtnAddEmployeeOfRole: true
    }),
    requestUpdateEmployeeOfRoleSuccess: (state) => ({
      ...state,
      isLoadingBtnAddEmployeeOfRole: false,
    }),
    requestUpdateEmployeeOfRoleFail: (state) => ({
      ...state,
      isLoadingBtnAddEmployeeOfRole: false
    }),
    setEmployeeeIds: (state, action) => ({
      ...state,
      infoEmployeeIds: action.payload,
    }),
    setErrorEmployeeIds: (state, action) => ({
      ...state,
      employeeIdsErr: action.payload
    }),

    //Type
    requestGetListType: (state) => ({
      ...state,
      isLoadingListType: true
    }),
    requestGetTypeSuccess: (state, action) => ({
      ...state,
      isLoadingListType: false,
      typesList: action.payload.data.permission_types,
    }),
    requestGetTypeFail: (state) => ({
      ...state,
      isLoadingListType: false,
      typesList: [],
    }),

    //Permission Role
    setVisibleModalUpdatePermissionRole: (state, action) => ({
      ...state,
      visibleModalUpdatePermissionRole: action.payload
    }),
    requestUpdateUpdatePermissionRole: state => ({
      ...state,
      isLoadingBtnUpdatePermissionRole: true
    }),
    requestUpdateUpdatePermissionRoleSuccess: (state) => ({
      ...state,
      isLoadingBtnUpdatePermissionRole: false,
      visibleModalAddUpdatePermissionRole: false
    }),
    requestUpdateUpdatePermissionRoleFail: (state) => ({
      ...state,
      isLoadingBtnUpdatePermissionRole: false
    }),
    setInfoPermissionRoleSelected: (state, action) => ({
      ...state,
      infoPermissionRoleSelected: action.payload,
    }),

    setQueryEmployeeWithoutRole: (state, action) => ({
      ...state,
      queryEmployeeWithoutRole: action.payload,
    }),
  }
})

export const {
  setInfoRole,
  setConfigModal,
  setEmployeeeIds,
  setDataFilterRole,
  setErrorEmployeeIds,
  setInfoRoleSelected,
  setInfoEmployeeSelected,
  setVisibleModalDeleteRole,
  setErrorCreateOrUpdateRole, 
  setQueryEmployeeWithoutRole,
  setInfoPermissionRoleSelected,
  setVisibleModalAddEmployeeOfRole,
  setVisibleModalCreateOrUpdateRole, 
  setVisibleModalDeleteEmployeeOfRole,
  setVisibleModalUpdatePermissionRole,

  requestGetListType, requestGetTypeSuccess, requestGetTypeFail,
  requestGetListRole, requestGetRoleSuccess, requestGetRoleFail,
  requestCreateRole, requestCreateRoleSuccess, requestCreateRoleFail,
  requestUpdateRole, requestUpdateRoleSuccess, requestUpdateRoleFail,
  requestDeleteRole, requestDeleteRoleSuccess, requestDeleteRoleFail,
  requestGetListPermission, requestGetPermissionSuccess, requestGetPermissionFail,
  requestGetListEmployeeOfRole, requestGetEmployeeOfRoleSuccess, requestGetEmployeeOfRoleFail,
  requestDeleteEmployeeOfRole, requestDeleteEmployeeOfRoleSuccess, requestDeleteEmployeeOfRoleFail,
  requestUpdateEmployeeOfRole, requestUpdateEmployeeOfRoleSuccess, requestUpdateEmployeeOfRoleFail,
  requestGetListEmployeeWithoutRole, requestGetEmployeeWithoutRoleSuccess, requestGetEmployeeWithoutRoleFail,
  requestUpdateUpdatePermissionRole, requestUpdateUpdatePermissionRoleSuccess, requestUpdateUpdatePermissionRoleFail,
  
} = permissionsSlice.actions

export default permissionsSlice.reducer;
