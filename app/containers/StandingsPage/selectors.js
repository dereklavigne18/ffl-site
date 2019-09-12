import { createSelector } from 'reselect';
import selectApp from 'containers/App/selectors';
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

const makeSelectYear = () =>
  createSelector(
    selectStandingsPageDomain,
    selectApp,
    (standingsState, appState) => standingsState.year || appState.currentYear,
  );

const makeSelectWeek = () =>
  createSelector(
    selectStandingsPageDomain,
    selectApp,
    (standingsState, appState) =>
      standingsState.week !== null ? standingsState.week : appState.currentWeek,
  );

const makeSelectStandings = () =>
  createSelector(
    selectStandingsPageDomain,
    state => state.standings,
  );

const makeSelectIsLoading = () =>
  createSelector(
    selectStandingsPageDomain,
    selectApp,
    (standingsState, appState) =>
      standingsState.isLoading || appState.loadingSeasons,
  );

const makeSelectLoadingError = () =>
  createSelector(
    selectStandingsPageDomain,
    state => state.loadingError,
  );

export {
  makeSelectIsTimelineDrawerOpen,
  makeSelectYear,
  makeSelectWeek,
  makeSelectStandings,
  makeSelectIsLoading,
  makeSelectLoadingError,
};
