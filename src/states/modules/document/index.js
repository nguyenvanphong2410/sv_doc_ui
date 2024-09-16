import {createSlice} from '@reduxjs/toolkit';
import {
  initDataFilterDocument,
  initErrInfoDocument,
  initInfoDocument,
  initPaginationListDocument,
} from './initState';

const documentSlice = createSlice({
  name: 'document',
  initialState: {
    isUpdateView: false,
    isLoadingTableDocument: false,
    isLoadingBtnCreateDocument: false,
    isLoadingBtnUpdateDocument: false,
    isLoadingBtnDeleteDocument: false,
    visibleModalCreateOrUpdateDocument: false,

    documents: [],
    documentSelected: {},
    infoDocument: initInfoDocument,
    errorInfoDocument: initErrInfoDocument,
    dataFilter: initDataFilterDocument,
    paginationListDocument: initPaginationListDocument,
    configModal: {
      title: '',
      type: '',
    },
    imageList: [],
    selectCategoryId: 'default',

    //ForUser
    isLoadingBtnCreateDocumentForUser: false,
    isLoadingTableDocumentByCategoryId:false,
    isLoadingTableDocumentViewQuantity:false,
    listDocByCategoryId:[],
    listDocViewQuantity:[],

    // My doc Pending
    isLoadingTableDocumentPending: false,
    isLoadingBtnUpdateDocumentPending: false,
    visibleModalCreateOrUpdateDocumentPending: false,
    isLoadingBtnDeleteDocumentPending: false,

    documentsPending: [],
    infoDocumentPending: initInfoDocument,
    errorInfoDocumentPending: initErrInfoDocument,
    dataFilterPending: initDataFilterDocument,
    paginationListDocumentPending: initPaginationListDocument,

    // My doc Checked
    isLoadingBtnDeleteDocumentChecked: false,
    isLoadingBtnUpdateDocumentChecked: false,
    visibleModalCreateOrUpdateDocumentChecked: false,

    documentsChecked: [],
    infoDocumentChecked: initInfoDocument,
    errorInfoDocumentChecked: initErrInfoDocument,
    dataFilterChecked: initDataFilterDocument,
    paginationListDocumentChecked: initPaginationListDocument,

    // My doc Lock
    isLoadingBtnDeleteDocumentLock: false,
    isLoadingBtnUpdateDocumentLock: false,
    visibleModalCreateOrUpdateDocumentLock: false,

    documentsLock: [],
    infoDocumentLock: initInfoDocument,
    errorInfoDocumentLock: initErrInfoDocument,
    dataFilterLock: initDataFilterDocument,
    paginationListDocumentLock: initPaginationListDocument,
  },
  reducers: {
    setSelectCategoryId: (state, action) => ({
      ...state,
      selectCategoryId: action.payload,
    }),
    setVisibleModalCreateOrUpdateDocument: (state, action) => ({
      ...state,
      visibleModalCreateOrUpdateDocument: action.payload,
    }),
    setInfoDocument: (state, action) => ({
      ...state,
      infoDocument: action.payload,
    }),
    setErrorInfoDocument: (state, action) => ({
      ...state,
      errorInfoDocument: action.payload,
    }),
    setImageList: (state, action) => ({
      ...state,
      imageList: action.payload,
    }),
    getListDocument: (state) => ({
      ...state,
      isLoadingTableDocument: true,
    }),
    getListDocumentSuccess: (state, action) => ({
      ...state,
      isLoadingTableDocument: false,
      documents: action.payload.data.documents,
      paginationListDocument: {
        currentPage: action.payload.data.page,
        perPage: action.payload.data.per_page,
        totalRecord: action.payload.data.total,
      },
    }),
    getListDocumentFailure: (state) => ({
      ...state,
      isLoadingTableDocument: false,
    }),

    changeStatusDocument: (state) => ({
      ...state,
      status: '',
    }),
    changeStatusDocumentSuccess: (state, action) => ({
      ...state,
      status: action.payload,
    }),
    changeStatusDocumentFail: (state) => ({
      ...state,
      status: '',
    }),

    changeDocCheckDocument: (state) => ({
      ...state,
      doc_check: '',
    }),
    changeDocCheckDocumentSuccess: (state, action) => ({
      ...state,
      doc_check: action.payload,
    }),
    changeDocCheckDocumentFail: (state) => ({
      ...state,
      doc_check: '',
    }),
    setDataFilter: (state, action) => ({
      ...state,
      dataFilter: action.payload,
    }),
    setPaginationListDocument: (state, action) => ({
      ...state,
      paginationListDocument: action.payload,
    }),
    createDocument: (state) => ({
      ...state,
      isLoadingBtnCreateDocument: true,
    }),
    createDocumentSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateDocument: false,
    }),
    createDocumentFail: (state) => ({
      ...state,
      isLoadingBtnCreateDocument: false,
    }),
    updateDocument: (state) => ({
      ...state,
      isLoadingBtnUpdateDocument: true,
    }),
    updateDocumentSuccess: (state) => ({
      ...state,
      isLoadingBtnUpdateDocument: false,
    }),
    updateDocumentFail: (state) => ({
      ...state,
      isLoadingBtnUpdateDocument: false,
    }),
    deleteDocument: (state) => ({
      ...state,
      isLoadingBtnDeleteDocument: true,
    }),
    deleteDocumentSuccess: (state) => ({
      ...state,
      isLoadingBtnDeleteDocument: false,
    }),
    deleteDocumentFail: (state) => ({
      ...state,
      isLoadingBtnDeleteDocument: false,
    }),
    setConfigModal: (state, action) => ({
      ...state,
      configModal: action.payload,
    }),
    setDocumentSelected: (state, action) => ({
      ...state,
      documentSelected: action.payload,
    }),

    //ForUser
    getListDocumentByCategoryIdd: (state) => ({
      ...state,
      isLoadingTableDocumentByCategoryId: true,
    }),
    getListDocumentByCategoryIdSuccess: (state, action) => ({
      ...state,
      isLoadingTableDocumentByCategoryId: false,
      listDocByCategoryId: action.payload.data,
    }),
    getListDocumentByCategoryIdFailure: (state) => ({
      ...state,
      isLoadingTableDocumentByCategoryId: false,
    }),
    getListDocumentViewQuantity: (state) => ({
      ...state,
      isLoadingTableDocumentViewQuantity: true,
    }),
    getListDocumentViewQuantitySuccess: (state, action) => ({
      ...state,
      isLoadingTableDocumentViewQuantity: false,
      listDocViewQuantity: action.payload.data.documents,
    }),
    getListDocumentViewQuantityFailure: (state) => ({
      ...state,
      isLoadingTableDocumentByCategoryId: false,
    }),
    createDocumentForUser: (state) => ({
      ...state,
      isLoadingBtnCreateDocumentForUser: true,
    }),
    createDocumentForUserSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateDocumentForUser: false,
    }),
    createDocumentForUserFail: (state) => ({
      ...state,
      isLoadingBtnCreateDocumentForUser: false,
    }),

    updateViewDocument: (state) => ({
      ...state,
      isUpdateView: true,
    }),
    updateViewDocumentSuccess: (state) => ({
      ...state,
      isUpdateView: false,
    }),
    updateViewDocumentFail: (state) => ({
      ...state,
      isUpdateView: true,
    }),

    //MydocPending------------------------------------------------------
    setVisibleModalCreateOrUpdateDocumentPending: (state, action) => ({
      ...state,
      visibleModalCreateOrUpdateDocumentPending: action.payload,
    }),
    setInfoDocumentPending: (state, action) => ({
      ...state,
      infoDocumentPending: action.payload,
    }),
    setErrorInfoDocumentPending: (state, action) => ({
      ...state,
      errorInfoDocumentPending: action.payload,
    }),
    setDataFilterPending: (state, action) => ({
      ...state,
      dataFilterPending: action.payload,
    }),
    getListDocumentPending: (state) => ({
      ...state,
      isLoadingTableDocumentPending: true,
    }),
    getListDocumentPendingSuccess: (state, action) => ({
      ...state,
      isLoadingTableDocumentPending: false,
      documentsPending: action.payload.data.documents,
      paginationListDocumentPending: {
        currentPage: action.payload.data.page,
        perPage: action.payload.data.per_page,
        totalRecord: action.payload.data.total,
      },
    }),
    getListDocumentPendingFailure: (state) => ({
      ...state,
      isLoadingTableDocumentPending: false,
    }),
    updateDocumentPending: (state) => ({
      ...state,
      isLoadingBtnUpdateDocumentPending: true,
    }),
    updateDocumentPendingSuccess: (state) => ({
      ...state,
      isLoadingBtnUpdateDocumentPending: false,
    }),
    updateDocumentPendingFail: (state) => ({
      ...state,
      isLoadingBtnUpdateDocumentPending: false,
    }),
    deleteDocumentPending: (state) => ({
      ...state,
      isLoadingBtnDeleteDocumentPending: true,
    }),
    deleteDocumentPendingSuccess: (state) => ({
      ...state,
      isLoadingBtnDeleteDocumentPending: false,
    }),
    deleteDocumentPendingFail: (state) => ({
      ...state,
      isLoadingBtnDeleteDocumentPending: false,
    }),

    //My doc check----------------------------------------------------
    setVisibleModalCreateOrUpdateDocumentChecked: (state, action) => ({
      ...state,
      visibleModalCreateOrUpdateDocumentChecked: action.payload,
    }),
    setInfoDocumentChecked: (state, action) => ({
      ...state,
      infoDocumentChecked: action.payload,
    }),
    setErrorInfoDocumentChecked: (state, action) => ({
      ...state,
      errorInfoDocumentChecked: action.payload,
    }),
    setDataFilterChecked: (state, action) => ({
      ...state,
      dataFilterChecked: action.payload,
    }),
    getListDocumentChecked: (state) => ({
      ...state,
      isLoadingTableDocumentChecked: true,
    }),
    getListDocumentCheckedSuccess: (state, action) => ({
      ...state,
      isLoadingTableDocumentChecked: false,
      documentsChecked: action.payload.data.documents,
      paginationListDocumentChecked: {
        currentPage: action.payload.data.page,
        perPage: action.payload.data.per_page,
        totalRecord: action.payload.data.total,
      },
    }),
    getListDocumentCheckedFailure: (state) => ({
      ...state,
      isLoadingTableDocumentChecked: false,
    }),
    updateDocumentChecked: (state) => ({
      ...state,
      isLoadingBtnUpdateDocumentChecked: true,
    }),
    updateDocumentCheckedSuccess: (state) => ({
      ...state,
      isLoadingBtnUpdateDocumentChecked: false,
    }),
    updateDocumentCheckedFail: (state) => ({
      ...state,
      isLoadingBtnUpdateDocumentChecked: false,
    }),
    deleteDocumentChecked: (state) => ({
      ...state,
      isLoadingBtnDeleteDocumentChecked: true,
    }),
    deleteDocumentCheckedSuccess: (state) => ({
      ...state,
      isLoadingBtnDeleteDocumentChecked: false,
    }),
    deleteDocumentCheckedFail: (state) => ({
      ...state,
      isLoadingBtnDeleteDocumentChecked: false,
    }),

    //My doc Lock----------------------------------------------------
    setVisibleModalCreateOrUpdateDocumentLock: (state, action) => ({
      ...state,
      visibleModalCreateOrUpdateDocumentLock: action.payload,
    }),
    setInfoDocumentLock: (state, action) => ({
      ...state,
      infoDocumentLock: action.payload,
    }),
    setErrorInfoDocumentLock: (state, action) => ({
      ...state,
      errorInfoDocumentLock: action.payload,
    }),
    setDataFilterLock: (state, action) => ({
      ...state,
      dataFilterLock: action.payload,
    }),
    getListDocumentLock: (state) => ({
      ...state,
      isLoadingTableDocumentLock: true,
    }),
    getListDocumentLockSuccess: (state, action) => ({
      ...state,
      isLoadingTableDocumentLock: false,
      documentsLock: action.payload.data.documents,
      paginationListDocumentLock: {
        currentPage: action.payload.data.page,
        perPage: action.payload.data.per_page,
        totalRecord: action.payload.data.total,
      },
    }),
    getListDocumentLockFailure: (state) => ({
      ...state,
      isLoadingTableDocumentLock: false,
    }),
    updateDocumentLock: (state) => ({
      ...state,
      isLoadingBtnUpdateDocumentLock: true,
    }),
    updateDocumentLockSuccess: (state) => ({
      ...state,
      isLoadingBtnUpdateDocumentLock: false,
    }),
    updateDocumentLockFail: (state) => ({
      ...state,
      isLoadingBtnUpdateDocumentLock: false,
    }),
    deleteDocumentLock: (state) => ({
      ...state,
      isLoadingBtnDeleteDocumentLock: true,
    }),
    deleteDocumentLockSuccess: (state) => ({
      ...state,
      isLoadingBtnDeleteDocumentLock: false,
    }),
    deleteDocumentLockFail: (state) => ({
      ...state,
      isLoadingBtnDeleteDocumentLock: false,
    }),
  },
});

export const {
  setInfoDocument,
  setErrorInfoDocument,
  setImageList,

  getListDocument,
  getListDocumentSuccess,
  getListDocumentFailure,

  changeStatusDocument,
  changeStatusDocumentSuccess,
  changeStatusDocumentFail,

  changeDocCheckDocument,
  changeDocCheckDocumentSuccess,
  changeDocCheckDocumentFail,

  setDataFilter,
  setPaginationListDocument,

  createDocument,
  createDocumentSuccess,
  createDocumentFail,

  updateDocument,
  updateDocumentSuccess,
  updateDocumentFail,

  deleteDocument,
  deleteDocumentSuccess,
  deleteDocumentFail,

  setConfigModal,
  setVisibleModalCreateOrUpdateDocument,

  setSelectCategoryId,

  setDocumentSelected,

  //ForUser
  getListDocumentByCategoryIdd,
  getListDocumentByCategoryIdSuccess,
  getListDocumentByCategoryIdFailure,

  getListDocumentViewQuantity,
  getListDocumentViewQuantitySuccess,
  getListDocumentViewQuantityFailure,

  createDocumentForUser,
  createDocumentForUserSuccess,
  createDocumentForUserFail,

  updateViewDocument,
  updateViewDocumentSuccess,
  updateViewDocumentFail,

  //My doc Pending
  setVisibleModalCreateOrUpdateDocumentPending,
  setInfoDocumentPending,
  setErrorInfoDocumentPending,
  setDataFilterPending,

  getListDocumentPending,
  getListDocumentPendingSuccess,
  getListDocumentPendingFailure,

  updateDocumentPending,
  updateDocumentPendingSuccess,
  updateDocumentPendingFail,

  deleteDocumentPending,
  deleteDocumentPendingSuccess,
  deleteDocumentPendingFail,

  //My doc Checked
  setVisibleModalCreateOrUpdateDocumentChecked,
  setInfoDocumentChecked,
  setErrorInfoDocumentChecked,
  setDataFilterChecked,

  getListDocumentChecked,
  getListDocumentCheckedSuccess,
  getListDocumentCheckedFailure,

  updateDocumentChecked,
  updateDocumentCheckedSuccess,
  updateDocumentCheckedFail,

  deleteDocumentChecked,
  deleteDocumentCheckedSuccess,
  deleteDocumentCheckedFail,

  //My doc Lock
  setVisibleModalCreateOrUpdateDocumentLock,
  setInfoDocumentLock,
  setErrorInfoDocumentLock,
  setDataFilterLock,

  getListDocumentLock,
  getListDocumentLockSuccess,
  getListDocumentLockFailure,

  updateDocumentLock,
  updateDocumentLockSuccess,
  updateDocumentLockFail,

  deleteDocumentLock,
  deleteDocumentLockSuccess,
  deleteDocumentLockFail,
} = documentSlice.actions;
export default documentSlice.reducer;
