import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IAddToWatchlist } from './models';

const BASE_URL: string = 'https://api.themoviedb.org/3';
const API_KEY: string | undefined = process.env.REACT_APP_API_KEY;

const defaultConfig: AxiosRequestConfig = {
  params: {
    api_key: API_KEY
  },
  headers: {
    'Content-Type': 'application/json'
  }
};

enum Method {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE'
}

const joinBaseUrlWithRoute = (route: string) => `${BASE_URL}/${route}`;

const exec = (
  route: string,
  method: Method,
  params?: any,
  data?: any
): Promise<AxiosResponse<any | undefined>> => {
  const url = joinBaseUrlWithRoute(route);
  const config = { params: params, data: data, ...defaultConfig };
  if (method === Method.GET) {
    return Axios.get(url, config);
  } else if (method === Method.POST) {
    return Axios.post(url, null, config);
  } else {
    return Axios.delete(url, config);
  }
};

// Movies
export const getLatestMovie = () => exec('movie/latest', Method.GET);
export const getMovie = (id: number) => exec(`movie/${id}`, Method.GET);
export const getCast = (id: number) => exec(`movie/${id}/credits`, Method.GET);
export const getPopular = (pageNumber: number) =>
  exec(`movie/popular?page=${pageNumber}`, Method.GET);

// Authentication
export const createRequestToken = () =>
  exec('authentication/token/new', Method.GET);
export const createSession = (requestToken: string) =>
  exec('authentication/session/new', Method.POST, null, {
    request_token: requestToken
  });
export const deleteSession = (sessionId: string) =>
  exec('authentication/session', Method.DELETE, null, {
    session_id: sessionId
  });

// Account

export const getAccountDetails = (sessionId: string) =>
  exec(`account?session_id=${sessionId}`, Method.GET, {
    session_id: sessionId
  });

export const getRatedMovies = (accountId: number) =>
  exec(`account/${accountId}/rated/movies`, Method.GET);

export const getWatchList = (accountId: number) =>
  exec(`account/${accountId}/watchlist/movies`, Method.GET);

export const addToWatchlist = (
  accountId: string,
  sessionId: string,
  data: IAddToWatchlist
) =>
  exec(
    `account/${accountId}/watchlist`,
    Method.POST,
    { session_id: sessionId },
    data
  );
