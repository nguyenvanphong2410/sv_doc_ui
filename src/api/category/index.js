import callApi from '@/api/callApi';
import {
  changeStatusCategory,
  changeStatusCategoryFail,
  changeStatusCategorySuccess,
  createCategory,
  createCategoryFail,
  createCategorySuccess,
  deleteCategory,
  deleteCategoryFail,
  deleteCategorySuccess,
  getAllCategory,
  getAllCategoryFailure,
  getAllCategorySuccess,
  getDetailCategory,
  getDetailCategoryFailure,
  getDetailCategorySuccess,
  getListCategory,
  getListCategoryFailure,
  getListCategorySuccess,
  updateCategory,
  updateCategoryFail,
  updateCategorySuccess,
} from '@/states/modules/category';
import {getListDocument, getListDocumentByCategoryIdd, getListDocumentByCategoryIdFailure, getListDocumentByCategoryIdSuccess, getListDocumentFailure, getListDocumentSuccess} from '@/states/modules/document';

export const getListCategories = () => async (dispatch, getState) => {
  const dataFilter = getState().category.dataFilter;
  let path = `/admin/category?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

  if (dataFilter.keySearch) {
    path += `&q=${dataFilter.keySearch}`;
  }

  if (dataFilter.sort_order) {
    path += `&sort_order=${dataFilter.sort_order}&field=${dataFilter.column}`;
  }

  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [getListCategory, getListCategorySuccess, getListCategoryFailure],
    variables: {},
    dispatch,
    getState,
  });
};

export const getAllCategories = () => async (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: '/admin/category/all',
    actionTypes: [getAllCategory, getAllCategorySuccess, getAllCategoryFailure],
    variables: {},
    dispatch,
    getState,
  });
};

export const getListDocumentByCategoryId = () => async (dispatch, getState) => {
  const dataFilter = getState().category.dataFilter;
  const id = getState().document.selectCategoryId;
  let path = `/admin/category/${id}/document?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

  if (dataFilter.keySearch) {
    path += `&q=${dataFilter.keySearch}`;
  }

  if (dataFilter.sort_order) {
    path += `&sort_order=${dataFilter.sort_order}&field=${dataFilter.column}`;
  }

  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [getListDocument, getListDocumentSuccess, getListDocumentFailure],
    variables: {},
    dispatch,
    getState,
  });
};

export const getDetailsCategory = (id) => (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: `/admin/category/${id}`,
    actionTypes: [getDetailCategory, getDetailCategorySuccess, getDetailCategoryFailure],
    variables: {},
    dispatch,
    getState,
  });
};

export const handleCreateCategory = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: '/admin/category',
    actionTypes: [createCategory, createCategorySuccess, createCategoryFail],
    variables: data,
    dispatch,
    getState,
  });
};

export const handleUpdateCategory = (id, data) => async (dispatch, getState) => {
  return callApi({
    method: 'put',
    apiPath: `/admin/category/${id}`,
    actionTypes: [updateCategory, updateCategorySuccess, updateCategoryFail],
    variables: data,
    dispatch,
    getState,
  });
};

export const handleChangeStatusCategory = (id, data) => async (dispatch, getState) => {
  return callApi({
    method: 'put',
    apiPath: `/admin/category/update-status/${id}`,
    actionTypes: [changeStatusCategory, changeStatusCategorySuccess, changeStatusCategoryFail],
    variables: {
      status: data,
    },
    dispatch,
    getState,
  });
};

export const handleDeleteCategory = (id) => async (dispatch, getState) => {
  return callApi({
    method: 'delete',
    apiPath: `/admin/category/${id}`,
    actionTypes: [deleteCategory, deleteCategorySuccess, deleteCategoryFail],
    variables: {},
    dispatch,
    getState,
  });
};

//ForUser
export const getAllCategoriesForUser = () => async (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: '/user/category/all',
    actionTypes: [getAllCategory, getAllCategorySuccess, getAllCategoryFailure],
    variables: {},
    dispatch,
    getState,
  });
};

export const getListDocumentByCategoryIdForUser = () => async (dispatch, getState) => {
  const dataFilter = getState().category.dataFilter;
  const id = getState().document.selectCategoryId;
  let path = `/user/category/${id}/document?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

  if (dataFilter.keySearch) {
    path += `&q=${dataFilter.keySearch}`;
  }

  if (dataFilter.sort_order) {
    path += `&sort_order=${dataFilter.sort_order}&field=${dataFilter.column}`;
  }

  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [getListDocument, getListDocumentSuccess, getListDocumentFailure],
    variables: {},
    dispatch,
    getState,
  });
};

export const requestGetListDocumentByCategoryIdForUser = (idsCategory) => async (dispatch, getState) => {
  
  let path = '/user/category/document-by-category-id';

  // Kiểm tra idsCategory rỗng
  if (!idsCategory || idsCategory.length === 0) {
    path += '?idsCategory=';
  } 
  // Kiểm tra idsCategory có phải là chuỗi hay không (một phần tử)
  else if (typeof idsCategory === 'string') {
    path += `?idsCategory=${idsCategory}`;
  } 
  // Nếu là mảng, ghép thành query string với nhiều idsCategory
  else if (Array.isArray(idsCategory)) {
    const queryString = idsCategory.map(id => `idsCategory=${id}`).join('&');
    path += `?${queryString}`;
  }

  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [
      getListDocumentByCategoryIdd,
      getListDocumentByCategoryIdSuccess,
      getListDocumentByCategoryIdFailure,
    ],
    variables: {},
    dispatch,
    getState,
  });
};

