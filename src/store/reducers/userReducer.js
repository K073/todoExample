import {LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS} from "../actions/userActions";


const initialState = {
    userData: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER_SUCCESS:
            return {...state, userData: action.userData};
        case LOGIN_USER_FAILURE:
            return {...state, userData: null}
        default:
            return state;
    }
}

export default reducer;
