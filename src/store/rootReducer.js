import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

import userReducer from './reducers/userReducer';
import todoReducer from './reducers/todoReducer'

const rootReducer = (history) => {
  return combineReducers({
    router: connectRouter(history),
    user: userReducer,
    todo: todoReducer
  });
};

export default rootReducer;
