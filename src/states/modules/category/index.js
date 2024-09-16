import {createSlice} from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    isLoadingTableCategory: false,
    isLoadingBtnCreateCategory: false,
    isLoadingBtnUpdateCategory: false,
    isLoadingBtnDeleteCategory: false,
    visibleModalCreateOrUpdateCategory: false,
    infoCategory: {
      name: "",
      desc: "",
      status: "",
    },
    errorInfoCategory: {
      name: "",
      desc: "",
      status: "",
    },
    dataFilter: {
      keySearch: "",
      perPage: 20,
      page: 1,
      sort_order: null,
      column: null,
    },
    paginationListCategory: {
      currentPage: 1,
      perPage: 20,
      totalRecord: 0,
    },
    category: [],
    allCategory: [],
    configModalCategory: {
      title: '',
      type: '',
    },
  },
  reducers: {
    setInfoCategory: (state, action) => ({
      ...state,
      infoCategory: action.payload,
    }),
    setErrorInfoCategory: (state, action) => ({
      ...state,
      errorInfoCategory: action.payload,
    }),    
    setConfigModalCategory: (state, action) => ({
      ...state,
      configModalCategory: action.payload,
    }),
    setVisibleModalCreateOrUpdateCategory: (state, action) => ({
      ...state,
      visibleModalCreateOrUpdateCategory: action.payload,
    }),
    setDataFilterCategory: (state, action) => ({
      ...state,
      dataFilter: action.payload,
    }),
    setPaginationListCategory: (state, action) => ({
      ...state,
      paginationListCategory: action.payload,
    }),
    
    getListCategory: (state) => ({
      ...state,
      category: [],
      isLoadingTableCategory: true,
      paginationListCategory: {
        currentPage: 1,
        perPage: 20,
        totalRecord: 0,
      },
    }),
    getListCategorySuccess: (state, action) => ({
      ...state,
      isLoadingTableCategory: false,
      category: action.payload.data.categories,
      paginationListCategory: {
        currentPage: action.payload.data.page,
        perPage: action.payload.data.per_page,
        totalRecord: action.payload.data.total,
      },
    }),
    getListCategoryFailure: (state) => ({
      ...state,
      category: [],
      isLoadingTableCategory: false,
    }),

    getAllCategory: (state) => ({
      ...state,
      allCategory: [],
    }),
    getAllCategorySuccess: (state, action) => ({
      ...state,
      allCategory: action.payload.data.categories,
    }),
    getAllCategoryFailure: (state) => ({
      ...state,
      allCategory: [],
    }),

    getDetailCategory: (state) => ({
      ...state,
      infoCategory: {},
    }),
    getDetailCategorySuccess: (state, action) => ({
      ...state,
      infoCategory: action.payload,
    }),
    getDetailCategoryFailure: (state) => ({
      ...state,
      infoCategory: {},
    }),

    changeStatusCategory: (state) => ({
      ...state,
      status: "",
    }),
    changeStatusCategorySuccess: (state, action) => ({
      ...state,
      status: action.payload,
    }),
    changeStatusCategoryFail: (state) => ({
      ...state,
      status: "",
    }),

    createCategory: (state) => ({
      ...state,
      isLoadingBtnCreateCategory: true,
    }),
    createCategorySuccess: (state) => ({
      ...state,
      isLoadingBtnCreateCategory: false,
    }),
    createCategoryFail: (state) => ({
      ...state,
      isLoadingBtnCreateCategory: false,
    }),

    updateCategory: (state) => ({
      ...state,
      isLoadingBtnUpdateCategory: true,
    }),
    updateCategorySuccess: (state) => ({
      ...state,
      isLoadingBtnUpdateCategory: false,
    }),
    updateCategoryFail: (state) => ({
      ...state,
      isLoadingBtnUpdateCategory: false,
    }),

    deleteCategory: (state) => ({
      ...state,
      isLoadingBtnDeleteCategory: true,
    }),
    deleteCategorySuccess: (state) => ({
      ...state,
      isLoadingBtnDeleteCategory: false,
    }),
    deleteCategoryFail: (state) => ({
      ...state,
      isLoadingBtnDeleteCategory: false,
    }),

  },
});

export const {
  setInfoCategory,
  setErrorInfoCategory,
  setDataFilterCategory,
  setPaginationListCategory,
  setConfigModalCategory,
  setVisibleModalCreateOrUpdateCategory,

  getListCategory,
  getListCategorySuccess,
  getListCategoryFailure,

  getAllCategory,
  getAllCategorySuccess,
  getAllCategoryFailure,
  
  getDetailCategory,
  getDetailCategorySuccess,
  getDetailCategoryFailure,
  
  createCategory,
  createCategorySuccess,
  createCategoryFail,
  
  updateCategory,
  updateCategorySuccess,
  updateCategoryFail,
  
  changeStatusCategory,
  changeStatusCategorySuccess,
  changeStatusCategoryFail,

  deleteCategory,
  deleteCategorySuccess,
  deleteCategoryFail,
} = categorySlice.actions;
export default categorySlice.reducer;
