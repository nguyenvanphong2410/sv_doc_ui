import {all, call, fork, put, select, takeLatest} from 'redux-saga/effects';
import {goToPage, setTitlePage} from '../app';
import {
  createDocumentFail,
  createDocumentSuccess,
  deleteDocumentFail,
  deleteDocumentSuccess,
  setDataFilter,
  setErrorInfoDocument,
  updateDocumentFail,
  updateDocumentSuccess,
  setVisibleModalCreateOrUpdateDocument,
  changeStatusDocumentSuccess,
  changeStatusDocumentFail,
  changeDocCheckDocumentFail,
  changeDocCheckDocumentSuccess,
  createDocumentForUserSuccess,
  createDocumentForUserFail,
  setInfoDocument,
  updateDocumentPendingSuccess,
  updateDocumentPendingFail,
  setVisibleModalCreateOrUpdateDocumentPending,
  setErrorInfoDocumentPending,
  deleteDocumentPendingSuccess,
  deleteDocumentPendingFail,
  setDataFilterPending,
  updateDocumentCheckedSuccess,
  setVisibleModalCreateOrUpdateDocumentChecked,
  updateDocumentCheckedFail,
  setErrorInfoDocumentChecked,
  deleteDocumentCheckedSuccess,
  setDataFilterChecked,
  deleteDocumentCheckedFail,
  setVisibleModalCreateOrUpdateDocumentLock,
  setErrorInfoDocumentLock,
  deleteDocumentLockSuccess,
  setDataFilterLock,
  deleteDocumentLockFail,
  updateDocumentLockSuccess,
  updateDocumentLockFail,
} from './index';
import {getNotification} from '@/utils/helper';
import {
  getListDocuments,
  requestGetListDocumentsChecked,
  requestGetListDocumentsLock,
  requestGetListDocumentsPending,
} from '@/api/document';
import {getListDocumentByCategoryId} from '@/api/category';
import {initInfoDocument} from './initState';

function* loadRouteData() {
  yield put(setTitlePage('Quản lý tài liệu'));
  yield put(
    setDataFilter({
      keySearch: '',
      perPage: 20,
      page: 1,
      sort_order: null,
      column: null,
    })
  );
}

function* handleActions() {
  yield takeLatest(createDocumentSuccess, function* () {
    const selectCategoryId = yield select((state) => state.document.selectCategoryId);
    if (selectCategoryId === 'default') {
      yield put(getListDocuments());
    } else {
      yield put(getListDocumentByCategoryId());
    }
    yield put(setVisibleModalCreateOrUpdateDocument(false));
    getNotification('success', 'Tạo mới tài liệu thành công.');
  });

  yield takeLatest(createDocumentFail, function* (action) {
    let status = action.payload.status;
    if (status === 400) {
      let errors = action.payload.data.detail;
      yield put(
        setErrorInfoDocument({
          ...errors,
        })
      );
    } else {
      getNotification('error', 'Tạo mới tài liệu thất bại.');
    }
  });

  yield takeLatest(updateDocumentSuccess, function* () {
    const selectCategoryId = yield select((state) => state.document.selectCategoryId);
    if (selectCategoryId === 'default') {
      yield put(getListDocuments());
    } else {
      yield put(getListDocumentByCategoryId());
    }
    yield put(setVisibleModalCreateOrUpdateDocument(false));
    getNotification('success', 'Cập nhật tài liệu thành công.');
  });

  yield takeLatest(updateDocumentFail, function* (action) {
    let status = action.payload.status;
    if (status === 400) {
      let errors = action.payload.data.detail;
      yield put(
        setErrorInfoDocument({
          ...errors,
        })
      );
    } else {
      getNotification('error', 'Cập nhật tài liệu thất bại.');
    }
  });

  yield takeLatest(deleteDocumentSuccess, function* () {
    const documentState = yield select((state) => state.document);
    const {currentPage, perPage, totalRecord} = documentState.paginationListDocument;

    if (currentPage !== 1 && totalRecord % perPage === 1) {
      yield put(setDataFilter({...documentState.dataFilterTeacher, page: currentPage - 1}));
    }
    getNotification('success', 'Xoá tài liệu thành công.');
    yield put(getListDocuments());
  });

  yield takeLatest(deleteDocumentFail, function* () {
    yield call(getNotification, 'error', 'Xoá tài liệu thất bại.');
  });

  yield takeLatest(changeStatusDocumentSuccess, function* () {
    yield put(getListDocuments());
    getNotification('success', 'Thay đổi trạng thái tài liệu thành công.');
  });

  yield takeLatest(changeStatusDocumentFail, function* () {
    yield put(getListDocuments());
    getNotification('success', 'Thay đổi trạng thái tài liệu thất bại.');
  });

  yield takeLatest(changeDocCheckDocumentSuccess, function* () {
    yield put(getListDocuments());
    getNotification('success', 'Thay đổi trạng thái kiểm duyệt thành công.');
  });

  yield takeLatest(changeDocCheckDocumentFail, function* () {
    yield put(getListDocuments());
    getNotification('success', 'Thay đổi trạng thái kiểm duyệt thất bại.');
  });

  ///////////////////////////////////////////////////////////////////////////////////
  //ForUser
  yield takeLatest(createDocumentForUserSuccess, function* () {
    const selectCategoryId = yield select((state) => state.document.selectCategoryId);
    if (selectCategoryId === 'default') {
      yield put(getListDocuments());
    } else {
      yield put(getListDocumentByCategoryId());
    }

    yield put(
      goToPage({
        path: '/my-doc',
      })
    );
    yield put(setInfoDocument(initInfoDocument));
    getNotification('success', 'Tạo mới tài liệu thành công.');
  });

  yield takeLatest(createDocumentForUserFail, function* (action) {
    let status = action.payload.status;
    if (status === 400) {
      let errors = action.payload.data.detail;
      yield put(
        setErrorInfoDocument({
          ...errors,
        })
      );
    } else {
      getNotification('error', 'Tạo mới tài liệu thất bại.');
    }
  });

  // my doc pending
  yield takeLatest(updateDocumentPendingSuccess, function* () {
    yield put(requestGetListDocumentsPending());
    yield put(setVisibleModalCreateOrUpdateDocumentPending(false));
    getNotification('success', 'Cập nhật tài liệu thành công.');
  });

  yield takeLatest(updateDocumentPendingFail, function* (action) {
    let status = action.payload.status;
    if (status === 400) {
      let errors = action.payload.data.detail;
      yield put(
        setErrorInfoDocumentPending({
          ...errors,
        })
      );
    } else {
      getNotification('error', 'Cập nhật tài liệu thất bại.');
    }
  });

  yield takeLatest(deleteDocumentPendingSuccess, function* () {
    const documentState = yield select((state) => state.document);
    const {currentPage, perPage, totalRecord} = documentState.paginationListDocumentPending;

    if (currentPage !== 1 && totalRecord % perPage === 1) {
      yield put(setDataFilterPending({...documentState.dataFilterPending, page: currentPage - 1}));
    }
    yield put(requestGetListDocumentsPending());
    getNotification('success', 'Xoá tài liệu của bạn thành công.');
  });

  yield takeLatest(deleteDocumentPendingFail, function* () {
    yield call(getNotification, 'error', 'Xoá tài liệu thất bại.');
  });

  // my doc checked
  yield takeLatest(updateDocumentCheckedSuccess, function* () {
    yield put(requestGetListDocumentsChecked());
    yield put(setVisibleModalCreateOrUpdateDocumentChecked(false));
    getNotification('success', 'Cập nhật tài liệu thành công.');
  });

  yield takeLatest(updateDocumentCheckedFail, function* (action) {
    let status = action.payload.status;
    if (status === 400) {
      let errors = action.payload.data.detail;
      yield put(
        setErrorInfoDocumentChecked({
          ...errors,
        })
      );
    } else {
      getNotification('error', 'Cập nhật tài liệu thất bại.');
    }
  });

  yield takeLatest(deleteDocumentCheckedSuccess, function* () {
    const documentState = yield select((state) => state.document);
    const {currentPage, perPage, totalRecord} = documentState.paginationListDocumentChecked;

    if (currentPage !== 1 && totalRecord % perPage === 1) {
      yield put(setDataFilterChecked({...documentState.dataFilterChecked, page: currentPage - 1}));
    }
    yield put(requestGetListDocumentsChecked());
    getNotification('success', 'Xoá tài liệu của bạn thành công.');
  });

  yield takeLatest(deleteDocumentCheckedFail, function* () {
    yield call(getNotification, 'error', 'Xoá tài liệu thất bại.');
  });

  // my doc lock
  yield takeLatest(updateDocumentLockSuccess, function* () {
    yield put(requestGetListDocumentsLock());
    yield put(setVisibleModalCreateOrUpdateDocumentLock(false));
    getNotification('success', 'Cập nhật tài liệu thành công.');
  });

  yield takeLatest(updateDocumentLockFail, function* (action) {
    let status = action.payload.status;
    if (status === 400) {
      let errors = action.payload.data.detail;
      yield put(
        setErrorInfoDocumentLock({
          ...errors,
        })
      );
    } else {
      getNotification('error', 'Cập nhật tài liệu thất bại.');
    }
  });

  yield takeLatest(deleteDocumentLockSuccess, function* () {
    const documentState = yield select((state) => state.document);
    const {currentPage, perPage, totalRecord} = documentState.paginationListDocumentLock;

    if (currentPage !== 1 && totalRecord % perPage === 1) {
      yield put(setDataFilterLock({...documentState.dataFilterLock, page: currentPage - 1}));
    }
    yield put(requestGetListDocumentsLock());
    getNotification('success', 'Xoá tài liệu của bạn thành công.');
  });

  yield takeLatest(deleteDocumentLockFail, function* () {
    yield call(getNotification, 'error', 'Xoá tài liệu thất bại.');
  });
}

export default function* documentSaga() {
  yield all([fork(loadRouteData), fork(handleActions)]);
}
