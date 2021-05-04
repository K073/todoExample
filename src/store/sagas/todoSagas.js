import {put, takeEvery} from 'redux-saga/effects';
import axios from '../../settings/axios-api'
import formDataBuilder from "../../utils/formDataBuilder";
import routes from "../../settings/routes";
import {
    CREATE_TODO_REQUEST,
    createTodoFailure,
    createTodoSuccess, EDIT_TODO_REQUEST, editTodoFailure,
    editTodoSuccess, FETCH_TODO_LIST_REQUEST,
    fetchTodoListFailure,
    fetchTodoListSuccess
} from "../actions/todoActions";

function* fetchTodoList({sort_field, sort_direction, page}) {
    try {
        const response = yield axios.get(routes.list, {params: {sort_field, sort_direction, page}})
        yield put(fetchTodoListSuccess(response.data.message.tasks, response.data.message['total_task_count']))
    } catch (e) {
        yield put(fetchTodoListFailure(e))
    }
}

function* createTodo({todoData}) {
    try {
        const formData = formDataBuilder(todoData)
        const response = yield axios.post(routes.list, formData)
        yield put(createTodoSuccess(response.data.message))
    } catch (e) {
        yield put(createTodoFailure(e))
    }
}

function* editTodo({id, todoData}) {
    try {
        const formData = formDataBuilder(todoData)
        const response = yield axios.post(routes.edit(id), formData)
        yield put(editTodoSuccess(response.data.message))
    } catch (e) {
        yield put(editTodoFailure(e))
    }
}

const todoSagas = [
    takeEvery(FETCH_TODO_LIST_REQUEST, fetchTodoList),
    takeEvery(CREATE_TODO_REQUEST, createTodo),
    takeEvery(EDIT_TODO_REQUEST, editTodo)
];

export default todoSagas;
