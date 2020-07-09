import { IRequestAuthState } from '../store/auth/types';
import { getAuthUrl } from '../api/api';

const AUTH_REDIRECT_ROUTE: string | undefined =
  process.env.REACT_APP_AUTH_REDIRECT_ROUTE;

export const verifyAuth = (authState: IRequestAuthState) => {
  const token = authState.requestToken?.request_token ?? '';
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const redirectUrl = `${baseUrl}/${AUTH_REDIRECT_ROUTE}`;
  const url = getAuthUrl(token, redirectUrl);
  window.location.assign(url);
};