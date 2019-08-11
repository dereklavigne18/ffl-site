import { createSelector } from 'reselect';
import { initialState } from 'containers/App/reducer';

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

export { makeSelectLocation, makeSelectIsLoginModalOpen, makeSelectUser };
