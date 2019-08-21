import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectApp = state => state.app || initialState;
const selectRouter = state => state.router;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectIsLoginModalOpen = () =>
  createSelector(
    selectApp,
    state => state.isLoginModalOpen,
  );

const makeSelectUser = () =>
  createSelector(
    selectApp,
    state => state.user,
  );

const makeSelectLoadingSeasons = () =>
  createSelector(
    selectApp,
    state => state.loadingSeasons,
  );

const makeSelectSeasons = () =>
  createSelector(
    selectApp,
    state => state.seasons,
  );

const makeSelectCurrentYear = () =>
  createSelector(
    selectApp,
    state => state.currentYear,
  );

const makeSelectCurrentWeek = () =>
  createSelector(
    selectApp,
    state => state.currentWeek,
  );

const makeSelectNeedLoadSeasons = () =>
  createSelector(
    selectApp,
    state => state.needLoadSeasons,
  );

export default selectApp;
export {
  makeSelectLocation,
  makeSelectIsLoginModalOpen,
  makeSelectUser,
  makeSelectLoadingSeasons,
  makeSelectSeasons,
  makeSelectCurrentWeek,
  makeSelectCurrentYear,
  makeSelectNeedLoadSeasons,
};
