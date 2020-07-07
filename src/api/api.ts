import Axios, { AxiosRequestConfig } from 'axios';

const BASE_URL: string = 'https://api.themoviedb.org/3';
const API_KEY: string | undefined = process.env.REACT_APP_API_KEY;

const defaultConfig: AxiosRequestConfig = {
  params: {
    api_key: API_KEY,
  },
};

const joinUrlWithRoute = (route: string) => `${BASE_URL}/${route}`;

const get = (route: string) =>
  Axios.get(joinUrlWithRoute(route), defaultConfig);
const post = (route: string, data: any) =>
  Axios.post(joinUrlWithRoute(route), data, defaultConfig);
const delete_ = (route: string, data: any) =>
  Axios.delete(joinUrlWithRoute(route), { data: data, ...defaultConfig });

// Movies
export const getLatestMovie = () => get('movie/latest');
export const getMovie = (id: number) => get(`movie/${id}`);
export const getCast = (id: number) => get(`movie/${id}/credits`);
export const getPopular = () => get('movie/popular');

// Authentication
export const createRequestToken = () => get('authentication/token/new');
export const createSession = (requestToken: string) =>
  post('authentication/session/new', { request_token: requestToken });
export const deleteSession = (sessionId: string) =>
  delete_('authentication/session', { session_id: sessionId });
