import { createSelector } from 'reselect';
import { initialState } from './reducer';

import selectApp from '../App/selectors';

const selectScoreboardPageDomain = state =>
  state.scoreboardPage || initialState;

const makeSelectIsSettingsDrawerOpen = () =>
  createSelector(
    selectScoreboardPageDomain,
    state => state.isSettingsDrawerOpen,
  );

const makeSelectYear = () =>
  createSelector(
    selectScoreboardPageDomain,
    selectApp,
    (scoreboardState, appState) => scoreboardState.year || appState.currentYear,
  );

const makeSelectWeek = () =>
  createSelector(
    selectScoreboardPageDomain,
    selectApp,
    (scoreboardState, appState) =>
      scoreboardState.week !== null
        ? scoreboardState.week
        : appState.currentWeek,
  );

const makeSelectScoreboard = () =>
  createSelector(
    selectScoreboardPageDomain,
    state => state.scoreboard,
  );

const makeSelectIsLoading = () =>
  createSelector(
    selectScoreboardPageDomain,
    state => state.isLoading,
  );

const makeSelectLoadingError = () =>
  createSelector(
    selectScoreboardPageDomain,
    state => state.loadingError,
  );

export {
  makeSelectIsSettingsDrawerOpen,
  makeSelectYear,
  makeSelectWeek,
  makeSelectScoreboard,
  makeSelectIsLoading,
  makeSelectLoadingError,
};
