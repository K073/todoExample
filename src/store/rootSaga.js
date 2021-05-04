import {all} from 'redux-saga/effects';
import userSagas from './sagas/userSagas';
import todoSagas from "./sagas/todoSagas";

export default function* rootSaga() {
  yield all([
    ...userSagas,
    ...todoSagas
  ]);
}
