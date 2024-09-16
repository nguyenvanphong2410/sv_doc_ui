import {all, fork, put, select, takeLatest} from 'redux-saga/effects';
import {requestGetDetailsDocumentForUser} from '@/api/document';
import {
  createCommentFail,
  createCommentSuccess,
  deleteCommentFail,
  deleteCommentSuccess,
  setErrorInfoComment,
  setInfoComment,
  setIsShowModalUpdateComment,
  updateCommentFail,
  updateCommentSuccess,
} from '../../comment';
import {requestCommentByIdDoc} from '@/api/comment';
import {getNotification} from '@/utils/helper';
import {setDataFilterCategory} from '../../category';

function* loadRouteData() {
  const {app} = yield select();
  if (app.location.params.id) {
    yield put(requestGetDetailsDocumentForUser(app.location.params.id));
  }
}

function* handleActions() {
  yield takeLatest(createCommentSuccess, function* () {
    const {app} = yield select();
    if (app.location.params.id) {
      yield put(requestCommentByIdDoc(app.location.params.id));
    }
    yield put(
      setInfoComment({
        content: '',
      })
    );
    getNotification('success', 'Tạo mới bình luận thành công.');
  });

  yield takeLatest(createCommentFail, function* (action) {
    let status = action.payload.status;
    if (status === 400) {
      let errors = action.payload.data.detail;
      yield put(
        setErrorInfoComment({
          ...errors,
        })
      );
    } else {
      getNotification('error', 'Tạo mới bình luận thất bại.');
    }
  });

  yield takeLatest(updateCommentSuccess, function* () {
    const {app} = yield select();
    if (app.location.params.id) {
      yield put(requestCommentByIdDoc(app.location.params.id));
    }
    yield put(
      setInfoComment({
        content: '',
      })
    );
    yield put(setIsShowModalUpdateComment(false));
    getNotification('success', 'Cập nhật bình luận thành công.');
  });

  yield takeLatest(updateCommentFail, function* (action) {
    let status = action.payload.status;
    if (status === 400) {
      let errors = action.payload.data.detail;
      yield put(
        setInfoComment({
          ...errors,
        })
      );
    } else {
      getNotification('error', 'Cập nhật bình luận thất bại.');
    }
  });

  yield takeLatest(deleteCommentSuccess, function* () {
    const {app} = yield select();
    if (app.location.params.id) {
      yield put(requestCommentByIdDoc(app.location.params.id));
    }
    getNotification('success', 'Xoá bình luận thành công.');
  });

  yield takeLatest(deleteCommentFail, function () {
    getNotification('error', 'Xoá bình luận thành công.');
  });
}

export default function* detailsDocSaga() {
  yield all([fork(loadRouteData), fork(handleActions)]);
}
