import {all, call, fork, put, select, takeLatest} from "redux-saga/effects";
import {setTitlePage} from "../app";
import {
  setDataFilterCategory,
  changeStatusCategorySuccess,
  setVisibleModalCreateOrUpdateCategory,
  createCategorySuccess,
  createCategoryFail,
  setErrorInfoCategory,
  updateCategorySuccess,
  updateCategoryFail,
  deleteCategorySuccess,
  deleteCategoryFail,
} from "./index";
import {getNotification} from "@/utils/helper";
import { getListCategories } from "@/api/category";

function* loadRouteData() {
  yield put(setTitlePage("Quản lý tài liệu"));
  yield put(setDataFilterCategory({
    keySearch: "",
    perPage: 20,
    page: 1,
    sort_order: null,
    column: null,
  }));
}

function* handleActions() {
  yield takeLatest(changeStatusCategorySuccess, function* () {
    yield put(getListCategories());
    getNotification("success", "Thay đổi trạng thái thành công.");
  });
  
  yield takeLatest(createCategorySuccess, function* () {
    yield put(getListCategories());
    yield put(setVisibleModalCreateOrUpdateCategory(false));
    getNotification("success", "Tạo mới danh mục thành công.");
  });
  
  yield takeLatest(createCategoryFail, function* (action) {
    let status = action.payload.status;
    if (status === 400) {
      let errors = action.payload.data.detail;
      yield put(
        setErrorInfoCategory({
          ...errors,
        })
      );
    } else {
      getNotification("error", "Tạo mới danh mục thất bại.");
    }
  });
  
  yield takeLatest(updateCategorySuccess, function* () {
    yield put(getListCategories());
    yield put(setVisibleModalCreateOrUpdateCategory(false));
    getNotification("success", "Cập nhật danh mục thành công.");
  });
  
  yield takeLatest(updateCategoryFail, function* (action) {
    let status = action.payload.status;
    if (status === 400) {
      let errors = action.payload.data.detail;
      yield put(
        setErrorInfoCategory({
          ...errors,
        })
      );
    } else {
      getNotification("error", "Cập nhật danh mục thất bại.");
    }
  });
  
  yield takeLatest(deleteCategorySuccess, function* () {
    const categoryState = yield select((state) => state.category);
    const {currentPage, perPage, totalRecord} = categoryState.paginationListCategory;

    if (currentPage !== 1 && totalRecord % perPage === 1) {
      yield put(setDataFilterCategory({...categoryState.dataFilter, page: currentPage - 1}));
    }
    getNotification("success", "Xoá danh mục thành công.");
    yield put(getListCategories());
  });
  
  yield takeLatest(deleteCategoryFail, function* () {
    yield call(getNotification, "error", "Xoá danh mục thất bại.");
  });
}

export default function* documentSaga() {
  yield all([fork(loadRouteData), fork(handleActions)]);
}
