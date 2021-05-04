import {put, takeEvery} from 'redux-saga/effects';
import axios from '../../settings/axios-api'
import formDataBuilder from "../../utils/formDataBuilder";
import {LOGIN_USER_REQUEST, loginUserFailure, loginUserSuccess} from "../actions/userActions";
import routes from "../../settings/routes";

function* loginUser({authData}) {
    try {
        const formData = formDataBuilder(authData);
        const response = yield axios.post(routes.login, formData);
        yield put(loginUserSuccess(response.data))
    } catch (e) {
        yield put(loginUserFailure(e.data))
    }
}


// eslint-disable-next-line import/no-anonymous-default-export
export default [
    takeEvery(LOGIN_USER_REQUEST, loginUser)
];
