import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the standingsPage state domain
 */
const selectStandingsPageDomain = state => state.standingsPage || initialState;

const makeSelectYear = () =>
  createSelector(
    selectStandingsPageDomain,
    state => state.year,
  );

const makeSelectWeek = () =>
  createSelector(
    selectStandingsPageDomain,
    state => state.week,
  );

const makeSelectStandings = () =>
  createSelector(
    selectStandingsPageDomain,
    state => state.standings,
  );

const makeSelectIsLoading = () =>
  createSelector(
    selectStandingsPageDomain,
    state => state.isLoading,
  );

const makeSelectLoadingError = () =>
  createSelector(
    selectStandingsPageDomain,
    state => state.loadingError,
  );

export {
  makeSelectYear,
  makeSelectWeek,
  makeSelectStandings,
  makeSelectIsLoading,
  makeSelectLoadingError,
};
