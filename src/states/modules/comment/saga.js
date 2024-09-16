import {all, fork, put, select, takeLatest} from "redux-saga/effects";
import { createCommentFail, createCommentSuccess, setErrorInfoComment } from ".";
import { getNotification } from "@/utils/helper";
import { requestCommentByIdDoc } from "@/api/comment";


function* loadRouteData() {

}

function* handleActions() {
  yield takeLatest(createCommentSuccess, function* () {
    const {app} = yield select();
    if (app.location.params.id) {
      yield put(requestCommentByIdDoc(app.location.params.id));
    }
    getNotification("success", "Tạo mới bình luận thành công.");
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
      getNotification("error", "Tạo mới bình luận thất bại.");
    }
  });
}

export default function* commentSaga() {
  yield all([fork(loadRouteData), fork(handleActions)]);
}
