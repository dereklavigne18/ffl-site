import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the scoreboardPage state domain
 */

const selectScoreboardPageDomain = state =>
  state.scoreboardPage || initialState;

const makeSelectIsSettingsDrawerOpen = () =>
  createSelector(
    selectScoreboardPageDomain,
    state => state.isSettingsDrawerOpen,
  );

export { makeSelectIsSettingsDrawerOpen };
