/*
 *
 * StandingsPage reducer
 *
 */

import produce from 'immer';
import {
  CHANGE_USERNAME,
  LOGIN,
  SUCCESSFUL_LOGIN,
  FAILED_LOGIN,
  CLEAR_LOGIN_ERROR,
} from './constants';

export const initialState = {
  username: '',
  isLoading: false,
  hasLoginError: false,
};

function username(state, action) {
  switch (action.type) {
    case CHANGE_USERNAME:
      return action.username;
    case SUCCESSFUL_LOGIN:
    case FAILED_LOGIN:
      return '';
    default:
      return state;
  }
}

function isLoading(state, action) {
  switch (action.type) {
    case LOGIN:
      return true;
    case SUCCESSFUL_LOGIN:
    case FAILED_LOGIN:
      return false;
    default:
      return state;
  }
}

function hasLoginError(state, action) {
  switch (action.type) {
    case LOGIN:
    case CLEAR_LOGIN_ERROR:
      return false;
    case FAILED_LOGIN:
      return true;
    default:
      return state;
  }
}

/* eslint-disable no-param-reassign */
const loginModalReducer = (state = initialState, action) =>
  produce(state, draft => {
    draft.username = username(draft.username, action);
    draft.isLoading = isLoading(draft.isLoading, action);
    draft.hasLoginError = hasLoginError(draft.hasLoginError, action);
  });

export default loginModalReducer;
