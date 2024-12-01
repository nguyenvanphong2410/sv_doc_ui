import callApi from '@/api/callApi';
import {
  changeDocCheckDocument,
  changeDocCheckDocumentFail,
  changeDocCheckDocumentSuccess,
  changeStatusDocument,
  changeStatusDocumentFail,
  changeStatusDocumentSuccess,
  createDocument,
  createDocumentFail,
  createDocumentForUser,
  createDocumentForUserFail,
  createDocumentForUserSuccess,
  createDocumentSuccess,
  deleteDocument,
  deleteDocumentChecked,
  deleteDocumentCheckedFail,
  deleteDocumentCheckedSuccess,
  deleteDocumentFail,
  deleteDocumentLock,
  deleteDocumentLockFail,
  deleteDocumentLockSuccess,
  deleteDocumentPending,
  deleteDocumentPendingFail,
  deleteDocumentPendingSuccess,
  deleteDocumentSuccess,
  getListDocument,
  getListDocumentChecked,
  getListDocumentCheckedFailure,
  getListDocumentCheckedSuccess,
  getListDocumentFailure,
  getListDocumentLock,
  getListDocumentLockFailure,
  getListDocumentLockSuccess,
  getListDocumentPending,
  getListDocumentPendingFailure,
  getListDocumentPendingSuccess,
  getListDocumentSuccess,
  getListDocumentViewQuantity,
  getListDocumentViewQuantityFailure,
  getListDocumentViewQuantitySuccess,
  updateDocument,
  updateDocumentChecked,
  updateDocumentCheckedFail,
  updateDocumentCheckedSuccess,
  updateDocumentFail,
  updateDocumentLock,
  updateDocumentLockFail,
  updateDocumentLockSuccess,
  updateDocumentPending,
  updateDocumentPendingFail,
  updateDocumentPendingSuccess,
  updateDocumentSuccess,
  updateViewDocument,
  updateViewDocumentFail,
  updateViewDocumentSuccess,
} from '@/states/modules/document';
import {
  getListDetailsDocument,
  getListDetailsDocumentFailure,
  getListDetailsDocumentSuccess,
} from '@/states/modules/document/detailsDoc';

export const getListDocuments = () => async (dispatch, getState) => {
  const dataFilter = getState().document.dataFilter;
  let path = `/admin/document?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

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

export const handleCreateDocument = (data) => async (dispatch, getState) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  let form = new FormData();

  form.append('name', data.name);
  form.append('description', data.description ? data.description : '');
  form.append('author', data.author ? data.author : '');
  form.append('publisher', data.publisher ? data.publisher : '');
  form.append('publication_time', data.publication_time ? data.publication_time : '');
  form.append('file_record', data.file_record ? data.file_record : null);
  form.append('name_file', data.name_file ? data.name_file : null);
  form.append('type_save', data.type_save ? data.type_save : null);

  // Xử lý hình ảnh
  let imageFeatured = 0;
  data.images.forEach((image, index) => {
    form.append('images', image.file);
    if (image.is_featured) {
      imageFeatured = index;
    }
  });
  form.append('image_featured', imageFeatured);

  // Thêm category_id vào form data
  if (data.category_id?.length > 0) {
    data.category_id.map((item) => {
      form.append('category_id[]', item);
    });
  }

  // Thêm chapter vào form data
  data.chapters?.forEach((chapter, index) => {
    // Thêm tên chương
    form.append(`chapters[${index}]name`, chapter.name);
    form.append(`chapters[${index}]name_file_chapter`, chapter.name_file_chapter);

    // Thêm file chương nếu có
    if (chapter.file_chapter) {
      form.append(`chapters[${index}]file_chapter`, chapter.file_chapter);
    }
  });

  return callApi({
    method: 'post',
    apiPath: '/admin/document',
    actionTypes: [createDocument, createDocumentSuccess, createDocumentFail],
    variables: form,
    dispatch,
    getState,
    headers,
  });
};

export const handleUpdateDocument = (id, dataDocument) => async (dispatch, getState) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };

  let form = new FormData();
  form.append('name', dataDocument.name);
  form.append('description', dataDocument.description ? dataDocument.description : '');
  form.append('author', dataDocument.author ? dataDocument.author : '');
  form.append('publisher', dataDocument.publisher ? dataDocument.publisher : '');
  form.append('publication_time', dataDocument.publication_time ? dataDocument.publication_time : '');
  form.append('file_record', dataDocument.file_record ? dataDocument.file_record : null);
  form.append('name_file', dataDocument.name_file ? dataDocument.name_file : null);
  form.append('status', dataDocument.status ? dataDocument.status : null);
  form.append('doc_check', dataDocument.doc_check ? dataDocument.doc_check : null);
  form.append('type_save', dataDocument.type_save ? dataDocument.type_save : null);

  let imageFeatured = 0;
  dataDocument.images.forEach((image, index) => {
    form.append('images', image.file);
    if (image.is_featured) {
      imageFeatured = index;
    }
  });

  form.append('image_featured', imageFeatured);

  if (dataDocument.category_id?.length > 0) {
    dataDocument.category_id.map((item) => {
      form.append('category_id[]', item);
    });
  }

  // Xử lý chapters: Loại bỏ file_chapter nếu là string
  const processedChapters = dataDocument.chapters.map((chapter, index) => {
    if (typeof chapter.file_chapter === 'string') {
      const {file_chapter, ...rest} = chapter; // Loại bỏ file_chapter
      return rest;
    }
    return chapter;
  });

  // Thêm chapters vào form data
  processedChapters.forEach((chapter, index) => {
    form.append(`chapters[${index}]_id`, chapter._id);
    form.append(`chapters[${index}]name`, chapter.name);
    form.append(`chapters[${index}]name_file_chapter`, chapter.name_file_chapter);

    if (chapter.file_chapter) {
      form.append(`chapters[${index}]file_chapter`, chapter.file_chapter);
    }
  });

  return callApi({
    method: 'put',
    apiPath: `/admin/document/${id}`,
    actionTypes: [updateDocument, updateDocumentSuccess, updateDocumentFail],
    variables: form,
    dispatch,
    getState,
    headers,
  });
};

export const requestChangeStatusDocument = (id, data) => async (dispatch, getState) => {
  return callApi({
    method: 'put',
    apiPath: `/admin/document/update-status/${id}`,
    actionTypes: [changeStatusDocument, changeStatusDocumentSuccess, changeStatusDocumentFail],
    variables: {
      status: data,
    },
    dispatch,
    getState,
  });
};

export const requestChangeDocCheckDocument = (id, data) => async (dispatch, getState) => {
  return callApi({
    method: 'put',
    apiPath: `/admin/document/update-doc-check/${id}`,
    actionTypes: [changeDocCheckDocument, changeDocCheckDocumentSuccess, changeDocCheckDocumentFail],
    variables: {
      doc_check: data,
    },
    dispatch,
    getState,
  });
};

export const handleDeleteDocument = (id) => async (dispatch, getState) => {
  return callApi({
    method: 'delete',
    apiPath: `/admin/document/${id}`,
    actionTypes: [deleteDocument, deleteDocumentSuccess, deleteDocumentFail],
    variables: {},
    dispatch,
    getState,
  });
};

//For User
export const requestGetListDocumentForUser = () => async (dispatch, getState) => {
  const dataFilter = getState().document.dataFilter;
  let path = `/user/document?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

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

export const requestUpdateDocumentForUser = (id, dataDocument) => async (dispatch, getState) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };

  let form = new FormData();
  form.append('name', dataDocument.name);
  form.append('description', dataDocument.description ? dataDocument.description : '');
  form.append('author', dataDocument.author ? dataDocument.author : '');
  form.append('publisher', dataDocument.publisher ? dataDocument.publisher : '');
  form.append('publication_time', dataDocument.publication_time ? dataDocument.publication_time : '');
  form.append('file_record', dataDocument.file_record ? dataDocument.file_record : null);
  form.append('name_file', dataDocument.name_file ? dataDocument.name_file : null);
  form.append('type_save', dataDocument.type_save ? dataDocument.type_save : null);

  let imageFeatured = 0;
  dataDocument.images.forEach((image, index) => {
    form.append('images', image.file);
    if (image.is_featured) {
      imageFeatured = index;
    }
  });

  form.append('image_featured', imageFeatured);

  if (dataDocument.category_id?.length > 0) {
    dataDocument.category_id.map((item) => {
      form.append('category_id[]', item);
    });
  }

  // Xử lý chapters: Loại bỏ file_chapter nếu là string
  const processedChapters = dataDocument.chapters.map((chapter, index) => {
    if (typeof chapter.file_chapter === 'string') {
      const {file_chapter, ...rest} = chapter; // Loại bỏ file_chapter
      return rest;
    }
    return chapter;
  });

  // Thêm chapters vào form data
  processedChapters.forEach((chapter, index) => {
    form.append(`chapters[${index}]_id`, chapter._id);
    form.append(`chapters[${index}]name`, chapter.name);
    form.append(`chapters[${index}]name_file_chapter`, chapter.name_file_chapter);

    if (chapter.file_chapter) {
      form.append(`chapters[${index}]file_chapter`, chapter.file_chapter);
    }
  });

  return callApi({
    method: 'put',
    apiPath: `/user/document/update-my-doc/${id}`,
    actionTypes: [updateDocumentPending, updateDocumentPendingSuccess, updateDocumentPendingFail],
    variables: form,
    dispatch,
    getState,
    headers,
  });
};

export const requestGetDetailsDocumentForUser = (id) => async (dispatch, getState) => {
  let path = `/user/document/${id}`;

  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [getListDetailsDocument, getListDetailsDocumentSuccess, getListDetailsDocumentFailure],
    variables: {},
    dispatch,
    getState,
  });
};

export const requestCreateDocumentForUser = (data) => async (dispatch, getState) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  let form = new FormData();
  form.append('name', data.name);
  form.append('description', data.description ? data.description : '');
  form.append('author', data.author ? data.author : '');
  form.append('publisher', data.publisher ? data.publisher : '');
  form.append('publication_time', data.publication_time ? data.publication_time : '');
  form.append('file_record', data.file_record ? data.file_record : null);
  form.append('name_file', data.name_file ? data.name_file : null);
  form.append('type_save', data.type_save ? data.type_save : null);

  let imageFeatured = 0;
  data.images.forEach((image, index) => {
    form.append('images', image.file);
    if (image.is_featured) {
      imageFeatured = index;
    }
  });
  form.append('image_featured', imageFeatured);

  if (data.category_id?.length > 0) {
    data.category_id.map((item) => {
      form.append('category_id[]', item);
    });
  }

  // Thêm chapter vào form data
  data.chapters?.forEach((chapter, index) => {
    // Thêm tên chương
    form.append(`chapters[${index}]name`, chapter.name);
    form.append(`chapters[${index}]name_file_chapter`, chapter.name_file_chapter);

    // Thêm file chương nếu có
    if (chapter.file_chapter) {
      form.append(`chapters[${index}]file_chapter`, chapter.file_chapter);
    }
  });

  return callApi({
    method: 'post',
    apiPath: '/user/document',
    actionTypes: [createDocumentForUser, createDocumentForUserSuccess, createDocumentForUserFail],
    variables: form,
    dispatch,
    getState,
    headers,
  });
};

export const requestUpdateViewDoc = (id) => async (dispatch, getState) => {
  return callApi({
    method: 'patch',
    apiPath: `/user/document/update-view/${id}`,
    actionTypes: [updateViewDocument, updateViewDocumentSuccess, updateViewDocumentFail],
    variables: {},
    dispatch,
    getState,
  });
};

export const handleDeleteDocumentForUser = (id) => async (dispatch, getState) => {
  return callApi({
    method: 'delete',
    apiPath: `/user/document/delete-my-doc/${id}`,
    actionTypes: [deleteDocumentPending, deleteDocumentPendingSuccess, deleteDocumentPendingFail],
    variables: {},
    dispatch,
    getState,
  });
};

//my doc Pending

export const requestGetListDocumentsPending = () => async (dispatch, getState) => {
  const dataFilter = getState().document.dataFilterPending;
  const auth = getState().auth.authUser;
  let path = `/user/document/my-doc-pending/${auth._id}?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

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

export const requestUpdateMyDocumentPending = (id, dataDocument) => async (dispatch, getState) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };

  let form = new FormData();
  form.append('name', dataDocument.name);
  form.append('description', dataDocument.description ? dataDocument.description : '');
  form.append('author', dataDocument.author ? dataDocument.author : '');
  form.append('publisher', dataDocument.publisher ? dataDocument.publisher : '');
  form.append('publication_time', dataDocument.publication_time ? dataDocument.publication_time : '');
  form.append('file_record', dataDocument.file_record ? dataDocument.file_record : null);
  form.append('name_file', dataDocument.name_file ? dataDocument.name_file : null);
  form.append('type_save', dataDocument.type_save ? dataDocument.type_save : null);

  let imageFeatured = 0;
  dataDocument.images.forEach((image, index) => {
    form.append('images', image.file);
    if (image.is_featured) {
      imageFeatured = index;
    }
  });

  form.append('image_featured', imageFeatured);

  if (dataDocument.category_id?.length > 0) {
    dataDocument.category_id.map((item) => {
      form.append('category_id[]', item);
    });
  }

  // Xử lý chapters: Loại bỏ file_chapter nếu là string
  const processedChapters = dataDocument.chapters.map((chapter, index) => {
    if (typeof chapter.file_chapter === 'string') {
      const {file_chapter, ...rest} = chapter; // Loại bỏ file_chapter
      return rest;
    }
    return chapter;
  });

  // Thêm chapters vào form data
  processedChapters.forEach((chapter, index) => {
    form.append(`chapters[${index}]_id`, chapter._id);
    form.append(`chapters[${index}]name`, chapter.name);
    form.append(`chapters[${index}]name_file_chapter`, chapter.name_file_chapter);

    if (chapter.file_chapter) {
      form.append(`chapters[${index}]file_chapter`, chapter.file_chapter);
    }
  });

  return callApi({
    method: 'put',
    apiPath: `/user/document/update-my-doc/${id}`,
    actionTypes: [updateDocumentPending, updateDocumentPendingSuccess, updateDocumentPendingFail],
    variables: form,
    dispatch,
    getState,
    headers,
  });
};

//my doc checked
export const requestGetListDocumentsChecked = () => async (dispatch, getState) => {
  const dataFilter = getState().document.dataFilterChecked;
  const auth = getState().auth.authUser;
  let path = `/user/document/my-doc-checked/${auth._id}?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

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

export const requestUpdateMyDocumentChecked = (id, dataDocument) => async (dispatch, getState) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };

  let form = new FormData();
  form.append('name', dataDocument.name);
  form.append('description', dataDocument.description ? dataDocument.description : '');
  form.append('author', dataDocument.author ? dataDocument.author : '');
  form.append('publisher', dataDocument.publisher ? dataDocument.publisher : '');
  form.append('publication_time', dataDocument.publication_time ? dataDocument.publication_time : '');
  form.append('file_record', dataDocument.file_record ? dataDocument.file_record : null);
  form.append('name_file', dataDocument.name_file ? dataDocument.name_file : null);
  form.append('type_save', dataDocument.type_save ? dataDocument.type_save : null);

  let imageFeatured = 0;
  dataDocument.images.forEach((image, index) => {
    form.append('images', image.file);
    if (image.is_featured) {
      imageFeatured = index;
    }
  });

  form.append('image_featured', imageFeatured);

  if (dataDocument.category_id?.length > 0) {
    dataDocument.category_id.map((item) => {
      form.append('category_id[]', item);
    });
  }

  // Xử lý chapters: Loại bỏ file_chapter nếu là string
  const processedChapters = dataDocument.chapters.map((chapter, index) => {
    if (typeof chapter.file_chapter === 'string') {
      const {file_chapter, ...rest} = chapter; // Loại bỏ file_chapter
      return rest;
    }
    return chapter;
  });

  // Thêm chapters vào form data
  processedChapters.forEach((chapter, index) => {
    form.append(`chapters[${index}]_id`, chapter._id);
    form.append(`chapters[${index}]name`, chapter.name);
    form.append(`chapters[${index}]name_file_chapter`, chapter.name_file_chapter);

    if (chapter.file_chapter) {
      form.append(`chapters[${index}]file_chapter`, chapter.file_chapter);
    }
  });

  return callApi({
    method: 'put',
    apiPath: `/user/document/update-my-doc/${id}`,
    actionTypes: [updateDocumentChecked, updateDocumentCheckedSuccess, updateDocumentCheckedFail],
    variables: form,
    dispatch,
    getState,
    headers,
  });
};

export const requestDeleteDocumentsChecked = (id) => async (dispatch, getState) => {
  return callApi({
    method: 'delete',
    apiPath: `/user/document/delete-my-doc/${id}`,
    actionTypes: [deleteDocumentChecked, deleteDocumentCheckedSuccess, deleteDocumentCheckedFail],
    variables: {},
    dispatch,
    getState,
  });
};

//my doc lock
export const requestGetListDocumentsLock = () => async (dispatch, getState) => {
  const dataFilter = getState().document.dataFilterLock;
  const auth = getState().auth.authUser;
  let path = `/user/document/my-doc-lock/${auth._id}?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

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

export const requestUpdateMyDocumentLock = (id, dataDocument) => async (dispatch, getState) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };

  let form = new FormData();
  form.append('name', dataDocument.name);
  form.append('description', dataDocument.description ? dataDocument.description : '');
  form.append('author', dataDocument.author ? dataDocument.author : '');
  form.append('publisher', dataDocument.publisher ? dataDocument.publisher : '');
  form.append('publication_time', dataDocument.publication_time ? dataDocument.publication_time : '');
  form.append('file_record', dataDocument.file_record ? dataDocument.file_record : null);
  form.append('name_file', dataDocument.name_file ? dataDocument.name_file : null);
  form.append('type_save', dataDocument.type_save ? dataDocument.type_save : null);

  let imageFeatured = 0;
  dataDocument.images.forEach((image, index) => {
    form.append('images', image.file);
    if (image.is_featured) {
      imageFeatured = index;
    }
  });

  form.append('image_featured', imageFeatured);

  if (dataDocument.category_id?.length > 0) {
    dataDocument.category_id.map((item) => {
      form.append('category_id[]', item);
    });
  }

  // Xử lý chapters: Loại bỏ file_chapter nếu là string
  const processedChapters = dataDocument.chapters.map((chapter, index) => {
    if (typeof chapter.file_chapter === 'string') {
      const {file_chapter, ...rest} = chapter; // Loại bỏ file_chapter
      return rest;
    }
    return chapter;
  });

  // Thêm chapters vào form data
  processedChapters.forEach((chapter, index) => {
    form.append(`chapters[${index}]_id`, chapter._id);
    form.append(`chapters[${index}]name`, chapter.name);
    form.append(`chapters[${index}]name_file_chapter`, chapter.name_file_chapter);

    if (chapter.file_chapter) {
      form.append(`chapters[${index}]file_chapter`, chapter.file_chapter);
    }
  });

  return callApi({
    method: 'put',
    apiPath: `/user/document/update-my-doc/${id}`,
    actionTypes: [updateDocumentLock, updateDocumentLockSuccess, updateDocumentLockFail],
    variables: form,
    dispatch,
    getState,
    headers,
  });
};

export const requestDeleteDocumentsLock = (id) => async (dispatch, getState) => {
  return callApi({
    method: 'delete',
    apiPath: `/user/document/delete-my-doc/${id}`,
    actionTypes: [deleteDocumentLock, deleteDocumentLockSuccess, deleteDocumentLockFail],
    variables: {},
    dispatch,
    getState,
  });
};

export const requestGetListDocumentViewQuantity = () => async (dispatch, getState) => {
  let path = `/user/document/112/view-quantity`;

  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [
      getListDocumentViewQuantity,
      getListDocumentViewQuantitySuccess,
      getListDocumentViewQuantityFailure,
    ],
    variables: {},
    dispatch,
    getState,
  });
};
