import {FETCH_TODO_LIST_SUCCESS} from "../actions/todoActions";


const initialState = {
    tasks: [],
    count: 0,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TODO_LIST_SUCCESS:
            return {...state, tasks: action.tasks, count: action.tasksCount}
        default:
            return state;
    }
}

export default reducer;
