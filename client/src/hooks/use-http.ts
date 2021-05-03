import { useReducer, useCallback } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

interface HttpState<D, E> {
  data: D | null;
  loading: boolean;
  error: E | null;
}

const initialState: HttpState<any, any> = {
  data: null,
  loading: false,
  error: null,
};

enum HttpActionTypes {
  SEND_REQUEST = 'send-request',
  REQUEST_SUCCESS = 'request-success',
  REQUEST_ERROR = 'request-error',
}

interface SendRequestAction {
  type: HttpActionTypes.SEND_REQUEST;
}

interface RequestSuccessAction<D> {
  type: HttpActionTypes.REQUEST_SUCCESS;
  data: D;
}

interface RequestErrorAction<E> {
  type: HttpActionTypes.REQUEST_ERROR;
  error: E;
}

type HttpAction<D, E> =
  | SendRequestAction
  | RequestSuccessAction<D>
  | RequestErrorAction<E>;

export enum RequestTypes {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch',
}

interface RequestConfig {
  requestType: RequestTypes.GET | RequestTypes.DELETE;
  url: string;
  axiosConfig?: AxiosRequestConfig;
}

interface RequestConfigWithBody<B> {
  requestType: RequestTypes.POST | RequestTypes.PATCH | RequestTypes.PUT;
  url: string;
  axiosConfig?: AxiosRequestConfig;
  body: B;
}

export type UseHttpRequestConfig<B = any> =
  | RequestConfig
  | RequestConfigWithBody<B>;

const createHttpReducer = <D, E>() => (
  state: HttpState<D, E>,
  action: HttpAction<D, E>
) => {
  switch (action.type) {
    case HttpActionTypes.SEND_REQUEST: {
      return {
        ...state,
        data: null,
        loading: true,
        error: null,
      };
    }
    case HttpActionTypes.REQUEST_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
        error: null,
      };
    }
    case HttpActionTypes.REQUEST_ERROR: {
      return {
        ...state,
        data: null,
        loading: false,
        error: action.error,
      };
    }
    default:
      return state;
  }
};

const useHttp = <D, E = string>(): [
  D | null,
  E | null,
  boolean,
  (requestConfig: UseHttpRequestConfig) => Promise<void>
] => {
  const [{ data, error, loading }, dispatch] = useReducer(
    createHttpReducer<D, E>(),
    initialState
  );

  const sendRequest = useCallback(
    async (requestConfig: UseHttpRequestConfig) => {
      dispatch({ type: HttpActionTypes.SEND_REQUEST });
      try {
        switch (requestConfig.requestType) {
          case RequestTypes.GET:
          case RequestTypes.DELETE: {
            console.log('Sending request!');
            const response = await axios[requestConfig.requestType]<D>(
              requestConfig.url,
              requestConfig.axiosConfig
            );
            dispatch({
              type: HttpActionTypes.REQUEST_SUCCESS,
              data: response.data,
            });
            break;
          }
          case RequestTypes.POST:
          case RequestTypes.PATCH:
          case RequestTypes.PUT: {
            console.log('Sending request!');
            const response = await axios[requestConfig.requestType]<D>(
              requestConfig.url,
              requestConfig.body,
              requestConfig.axiosConfig
            );
            dispatch({
              type: HttpActionTypes.REQUEST_SUCCESS,
              data: response.data,
            });
            break;
          }
        }
      } catch (error) {
        console.log(error);
        dispatch({ type: HttpActionTypes.REQUEST_ERROR, error });
      }
    },
    []
  );

  return [data, error, loading, sendRequest];
};

export default useHttp;
