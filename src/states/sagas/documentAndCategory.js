import { all, call } from 'redux-saga/effects';
import documentSaga from "@/states/modules/document/saga.js";
import categorySaga from "@/states/modules/category/saga.js";

function* loadDocumentAndCategorySaga() {
  yield all([
    call(documentSaga),
    call(categorySaga),
  ]);
}

export default loadDocumentAndCategorySaga;
