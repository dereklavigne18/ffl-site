import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the standingsPage state domain
 */
const selectStandingsPageDomain = state => state.standingsPage || initialState;

const makeSelectIsTimelineDrawerOpen = () =>
  createSelector(
    selectStandingsPageDomain,
    state => state.isTimelineDrawerOpen,
  );

const makeSelectSeasons = () =>
  createSelector(
    selectStandingsPageDomain,
    state => state.seasons,
  );

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
  makeSelectIsTimelineDrawerOpen,
  makeSelectSeasons,
  makeSelectYear,
  makeSelectWeek,
  makeSelectStandings,
  makeSelectIsLoading,
  makeSelectLoadingError,
};
