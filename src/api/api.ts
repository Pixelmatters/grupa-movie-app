import Axios, { AxiosRequestConfig } from 'axios';

const BASE_URL: string = 'https://api.themoviedb.org/3';
const API_KEY: string | undefined = process.env.REACT_APP_API_KEY;

const defaultConfig: AxiosRequestConfig = {
  params: {
    api_key: API_KEY
  },
};

const get = (url: string) => Axios.get(url, defaultConfig);

export const getLatestMovie = () => get(`${BASE_URL}/movie/latest`);
export const getMovie = (id: number) => get(`${BASE_URL}/movie/${id}`);
