import {
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
  REGISTER_USER,
  LOGOUT_USER,
} from 'containers/App/constants';

export function openLoginModal() {
  return {
    type: OPEN_LOGIN_MODAL,
  };
}

export function closeLoginModal() {
  return {
    type: CLOSE_LOGIN_MODAL,
  };
}

export function registerUser({ ...user }) {
  return {
    type: REGISTER_USER,
    user,
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
  };
}
