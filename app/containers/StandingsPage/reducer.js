/*
 *
 * StandingsPage reducer
 *
 */
import produce from 'immer';
import {
  CHANGE_YEAR,
  CHANGE_WEEK,
  LOAD_STANDINGS,
  STANDINGS_LOADED,
  STANDINGS_LOADED_ERROR,
} from './constants';

export const initialState = {
  year: 2017,
  week: 1,
  standings: [],
  isLoading: false,
  loadingError: null,
};

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

function standings(state, action) {
  switch (action.type) {
    case STANDINGS_LOADED:
      return action.standings;
    case STANDINGS_LOADED_ERROR:
      // If there is an error then there's no standings to work with
      return [];
    default:
      return state;
  }
}

function isLoading(state, action) {
  switch (action.type) {
    case LOAD_STANDINGS:
      return true;
    case STANDINGS_LOADED:
      return false;
    case STANDINGS_LOADED_ERROR:
      return false;
    default:
      return state;
  }
}

function loadingError(state, action) {
  switch (action.type) {
    case LOAD_STANDINGS:
      return null;
    case STANDINGS_LOADED:
      return null;
    case STANDINGS_LOADED_ERROR:
      return action.message;
    default:
      return state;
  }
}

/* eslint-disable no-param-reassign */
const standingsPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    draft.year = year(draft.year, action);
    draft.week = week(draft.week, action);
    draft.standings = standings(draft.standings, action);
    draft.isLoading = isLoading(draft.isLoading, action);
    draft.loadingError = loadingError(draft.loadingError, action);
  });

export default standingsPageReducer;
