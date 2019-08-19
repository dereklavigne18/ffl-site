import {
  CHANGE_USERNAME,
  LOGIN,
  SUCCESSFUL_LOGIN,
  FAILED_LOGIN,
  CLEAR_LOGIN_ERROR,
} from './constants';

export function changeUsername({ username }) {
  return {
    type: CHANGE_USERNAME,
    username,
  };
}

export function login() {
  return { type: LOGIN };
}

export function successfulLogin() {
  return { type: SUCCESSFUL_LOGIN };
}

export function failedLogin() {
  return { type: FAILED_LOGIN };
}

export function clearLoginError() {
  return { type: CLEAR_LOGIN_ERROR };
}
