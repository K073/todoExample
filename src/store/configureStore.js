import {applyMiddleware, compose, createStore} from "redux";
import {routerMiddleware} from 'connected-react-router'
import {createBrowserHistory} from "history";
import createSagaMiddleware from 'redux-saga';
import {loadState, saveState} from "./localStorage";
import rootSaga from "./rootSaga";
import createRootReducer from "./rootReducer";
import configureInterceptors from "./interceptors";
import config, {PRODUCTION_ENV} from "../settings/config";
import {loginUserFailure, loginUserSuccess} from "./actions/userActions";

const getComposeEnhancersFunction = () => {
  if (config.env === PRODUCTION_ENV) {
    return compose;
  }

  return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
};

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const middleware = [
  routerMiddleware(history),
  sagaMiddleware
];

const composeEnhancers = getComposeEnhancersFunction();

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedState = loadState();

const store = createStore(createRootReducer(history), persistedState, enhancers);

sagaMiddleware.run(rootSaga);

store.subscribe(() => {
  const existingUser = store.getState().user;


  window.addEventListener('storage', function(e) {
    const localUser = JSON.parse(localStorage.getItem('state')).user;
    const currentUser = store.getState().user;
    if (localUser !== currentUser) {
      store.dispatch(loginUserSuccess(localUser.userData))
    }
  });

  saveState({user: existingUser});
});

configureInterceptors(store);

export default store;
