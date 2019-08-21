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
  LOAD_TIME_PERIODS,
  TIME_PERIODS_LOADED,
  TIME_PERIODS_LOADED_ERROR,
} from './constants';

const DEFAULT_YEAR = 2018;
const DEFAULT_WEEK = 1;

const defaultSeasons = [
  {
    year: DEFAULT_YEAR,
    weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  },
];

let initialUser = null;
const userCookie = Cookies.get('user');
if (userCookie) {
  initialUser = JSON.parse(decodeURIComponent(userCookie).substring(2));
}

export const initialState = {
  isLoginModalOpen: false,
  user: initialUser,
  loadingSeasons: false,
  seasons: defaultSeasons,
  currentYear: DEFAULT_YEAR,
  currentWeek: DEFAULT_WEEK,
  needLoadSeasons: true,
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

function loadingSeasons(state, action) {
  switch (action.type) {
    case LOAD_TIME_PERIODS:
      return true;
    case TIME_PERIODS_LOADED:
    case TIME_PERIODS_LOADED_ERROR:
      return false;
    default:
      return state;
  }
}

function seasons(state, action) {
  switch (action.type) {
    case TIME_PERIODS_LOADED:
      return action.seasons;
    default:
      return state;
  }
}

function currentYear(state, action) {
  switch (action.type) {
    case TIME_PERIODS_LOADED:
      return action.currentYear;
    case TIME_PERIODS_LOADED_ERROR:
      return DEFAULT_YEAR;
    default:
      return state;
  }
}

function currentWeek(state, action) {
  switch (action.type) {
    case TIME_PERIODS_LOADED:
      return action.currentWeek;
    case TIME_PERIODS_LOADED_ERROR:
      return DEFAULT_WEEK;
    default:
      return state;
  }
}

function needLoadSeasons(state, action) {
  switch (action.type) {
    case TIME_PERIODS_LOADED:
      return false;
    default:
      return state;
  }
}

/* eslint-disable no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    draft.isLoginModalOpen = isLoginModalOpen(draft.isLoginModalOpen, action);
    draft.user = user(draft.user, action);
    draft.loadingSeasons = loadingSeasons(draft.loadingSeasons, action);
    draft.seasons = seasons(draft.seasons, action);
    draft.currentYear = currentYear(draft.currentYear, action);
    draft.currentWeek = currentWeek(draft.currentWeek, action);
    draft.needLoadSeasons = needLoadSeasons(draft.needLoadSeasons, action);
  });

export default appReducer;
