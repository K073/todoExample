import axios from '../settings/axios-api';
import {replace} from "connected-react-router";
import config from "../settings/config";

const configureInterceptors = store => {
  const instances = [axios];
  instances.forEach(item => {
    item.interceptors.request.use(req => {
      req.params['developer'] = config.dev_name

      return req;
    });
  })

  instances.forEach(item => {
    item.interceptors.response.use(res => res,
        error => {
          if ((error.response.status === 401 || error.response.status === 403)) {
            try {
              //TODO need implement if user unauthorized
            } catch (e) {
              return Promise.reject(error);
            }
          } else if (error.response.status === 404) {
            store.dispatch(replace('/'))
          } else if (!error.response) {
            error.response = {data: {global: 'No connection to server'}};
            return Promise.reject(error);
          } else {
            return Promise.reject(error);
          }
        });
  })
};

export default configureInterceptors;
