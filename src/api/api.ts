import Axios, { AxiosRequestConfig } from 'axios';

const BASE_URL: string = 'https://api.themoviedb.org/3';
const API_KEY: string | undefined = process.env.REACT_APP_API_KEY;

const defaultConfig: AxiosRequestConfig = {
  params: {
    api_key: API_KEY
  },
};

const get = (route: string) => Axios.get(`${BASE_URL}/${route}`, defaultConfig);

export const getLatestMovie = () => get('movie/latest');
export const getMovie = (id: number) => get(`movie/${id}`);
export const getCast = (id: number) => get(`movie/${id}/credits`);
export const getPopular = () => get('movie/popular');