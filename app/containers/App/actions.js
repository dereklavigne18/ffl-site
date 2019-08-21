import {
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
  REGISTER_USER,
  LOGOUT_USER,
  LOAD_TIME_PERIODS,
  TIME_PERIODS_LOADED,
  TIME_PERIODS_LOADED_ERROR,
} from './constants';

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

export function loadTimePeriods() {
  return {
    type: LOAD_TIME_PERIODS,
  };
}

export function timePeriodsLoaded({ currentWeek, currentYear, seasons }) {
  return {
    type: TIME_PERIODS_LOADED,
    currentWeek,
    currentYear,
    seasons,
  };
}

export function timePeriodsLoadedError({ error }) {
  return {
    type: TIME_PERIODS_LOADED_ERROR,
    error,
  };
}
