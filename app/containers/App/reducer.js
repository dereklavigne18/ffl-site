/*
 *
 * App reducer
 *
 */

import produce from 'immer';
import Cookies from 'js-cookie';

import {
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
  REGISTER_USER,
  LOGOUT_USER,
} from './constants';

let initialUser = null;
const userCookie = Cookies.get('user');
if (userCookie) {
  initialUser = JSON.parse(decodeURIComponent(userCookie).substring(2));
}

export const initialState = {
  isLoginModalOpen: false,
  user: initialUser,
};

function isLoginModalOpen(state, action) {
  switch (action.type) {
    case OPEN_LOGIN_MODAL:
      return true;
    case CLOSE_LOGIN_MODAL:
      return false;
    default:
      return state;
  }
}

function user(state, action) {
  switch (action.type) {
    case REGISTER_USER:
      return action.user;
    case LOGOUT_USER:
      return null;
    default:
      return state;
  }
}

/* eslint-disable no-param-reassign */
const loginModalReducer = (state = initialState, action) =>
  produce(state, draft => {
    draft.isLoginModalOpen = isLoginModalOpen(draft.isLoginModalOpen, action);
    draft.user = user(draft.user, action);
  });

export default loginModalReducer;
