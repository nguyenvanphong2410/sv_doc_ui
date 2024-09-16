import {
  all, fork,
  put
} from 'redux-saga/effects';
import { setTitlePage } from '../app';

function* loadRouteData() {
  yield put(setTitlePage("Tổng quan"));
}

function* handleActions() {
 
}

export default function* homeSaga() {
  yield all([
    fork(loadRouteData),
    fork(handleActions)
  ]);
}
