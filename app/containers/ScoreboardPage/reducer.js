/*
 *
 * ScoreboardPage reducer
 *
 */
import produce from 'immer';
import {
  OPEN_SETTINGS_DRAWER,
  CLOSE_SETTINGS_DRAWER,
  CHANGE_YEAR,
  CHANGE_WEEK,
  SCOREBOARD_LOADED,
  SCOREBOARD_LOADED_ERROR,
  LOAD_SCOREBOARD,
} from './constants';

export const initialState = {
  isSettingsDrawerOpen: false,
  year: null,
  week: null,
  scoreboard: [],
  isLoading: false,
  loadingError: null,
};

function isSettingsDrawerOpen(state, action) {
  switch (action.type) {
    case OPEN_SETTINGS_DRAWER:
      return true;
    case CLOSE_SETTINGS_DRAWER:
      return false;
    default:
      return state;
  }
}

function year(state, action) {
  switch (action.type) {
    case CHANGE_YEAR:
      return action.year;
    default:
      return state;
  }
}

function week(state, action) {
  switch (action.type) {
    case CHANGE_WEEK:
      return action.week;
    default:
      return state;
  }
}

function scoreboard(state, action) {
  switch (action.type) {
    case SCOREBOARD_LOADED:
      return action.scoreboard;
    case SCOREBOARD_LOADED_ERROR:
      return [];
    default:
      return state;
  }
}

function isLoading(state, action) {
  switch (action.type) {
    case LOAD_SCOREBOARD:
      return true;
    case SCOREBOARD_LOADED:
    case SCOREBOARD_LOADED_ERROR:
      return false;
    default:
      return state;
  }
}

function loadingError(state, action) {
  switch (action.type) {
    case LOAD_SCOREBOARD:
    case SCOREBOARD_LOADED:
      return false;
    case SCOREBOARD_LOADED_ERROR:
      return true;
    default:
      return state;
  }
}

/* eslint-disable no-param-reassign */
const standingsPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    draft.isSettingsDrawerOpen = isSettingsDrawerOpen(
      draft.isSettingsDrawerOpen,
      action,
    );
    draft.year = year(draft.year, action);
    draft.week = week(draft.week, action);
    draft.scoreboard = scoreboard(draft.scoreboard, action);
    draft.isLoading = isLoading(draft.isLoading, action);
    draft.loadingError = loadingError(draft.loadingError, action);
  });

export default standingsPageReducer;
