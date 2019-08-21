/*
 *
 * ScoreboardPage reducer
 *
 */
import produce from 'immer';
import { OPEN_SETTINGS_DRAWER, CLOSE_SETTINGS_DRAWER } from './constants';

export const initialState = {
  isSettingsDrawerOpen: false,
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

/* eslint-disable no-param-reassign */
const standingsPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    draft.isSettingsDrawerOpen = isSettingsDrawerOpen(
      draft.isSettingsDrawerOpen,
      action,
    );
  });

export default standingsPageReducer;
