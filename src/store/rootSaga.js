import {all} from 'redux-saga/effects';
import userSagas from './sagas/userSagas';

export default function* rootSaga() {
  yield all([
    ...userSagas,
  ]);
}
