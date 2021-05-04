import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

import userReducer from './reducers/userReducer';

export default (history) => {
  return combineReducers({
    router: connectRouter(history),
    user: userReducer,
  });
};
