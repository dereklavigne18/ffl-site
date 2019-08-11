import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the LoginModal state domain
 */
const selectLoginModalDomain = state => state.loginModal || initialState;

const makeSelectUsername = () =>
  createSelector(
    selectLoginModalDomain,
    state => state.username,
  );

const makeSelectIsLoading = () =>
  createSelector(
    selectLoginModalDomain,
    state => state.isLoading,
  );

const makeSelectHasLoginError = () =>
  createSelector(
    selectLoginModalDomain,
    state => state.hasLoginError,
  );

export { makeSelectUsername, makeSelectIsLoading, makeSelectHasLoginError };
