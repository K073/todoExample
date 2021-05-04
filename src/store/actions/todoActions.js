export const FETCH_TODO_LIST_REQUEST = 'FETCH_TODO_LIST_REQUEST';
export const FETCH_TODO_LIST_SUCCESS = 'FETCH_TODO_LIST_SUCCESS';
export const FETCH_TODO_LIST_FAILURE = 'FETCH_TODO_LIST_FAILURE';

export const fetchTodoListRequest = (sort_field, sort_direction, page) => ({
    type: FETCH_TODO_LIST_REQUEST, sort_field, sort_direction, page
})

export const fetchTodoListSuccess = (tasks, tasksCount) => ({
    type: FETCH_TODO_LIST_SUCCESS, tasks, tasksCount
})

export const fetchTodoListFailure = (error) => ({
    type: FETCH_TODO_LIST_FAILURE, error
})

export const CREATE_TODO_REQUEST = 'CREATE_TODO_REQUEST';
export const CREATE_TODO_SUCCESS = 'CREATE_TODO_SUCCESS';
export const CREATE_TODO_FAILURE = 'CREATE_TODO_FAILURE';

export const createTodoRequest = (todoData) => ({
    type: CREATE_TODO_REQUEST, todoData
})

export const createTodoSuccess = (todo) => ({
    type: CREATE_TODO_SUCCESS, todo
})

export const createTodoFailure = (error) => ({
    type: CREATE_TODO_FAILURE, error
})

export const EDIT_TODO_REQUEST = 'EDIT_TODO_REQUEST';
export const EDIT_TODO_SUCCESS = 'EDIT_TODO_SUCCESS';
export const EDIT_TODO_FAILURE = 'EDIT_TODO_FAILURE';

export const editTodoRequest = (id, todoData) => ({
    type: EDIT_TODO_REQUEST, id, todoData
})

export const editTodoSuccess = (todo) => ({
    type: EDIT_TODO_SUCCESS, todo
})

export const editTodoFailure = (error) => ({
    type: EDIT_TODO_FAILURE, error
})
