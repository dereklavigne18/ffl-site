/*
 *
 * ScoreboardPage actions
 *
 */

import {
  OPEN_SETTINGS_DRAWER,
  CLOSE_SETTINGS_DRAWER,
  CHANGE_YEAR,
  CHANGE_WEEK,
  LOAD_SCOREBOARD,
  SCOREBOARD_LOADED,
  SCOREBOARD_LOADED_ERROR,
} from './constants';

export function openSettingsDrawer() {
  return {
    type: OPEN_SETTINGS_DRAWER,
  };
}

export function closeSettingsDrawer() {
  return {
    type: CLOSE_SETTINGS_DRAWER,
  };
}

export function changeYear({ year }) {
  return {
    type: CHANGE_YEAR,
    year,
  };
}

export function changeWeek({ week }) {
  return {
    type: CHANGE_WEEK,
    week,
  };
}

export function loadScoreboard() {
  return {
    type: LOAD_SCOREBOARD,
  };
}

export function scoreboardLoaded({ scoreboard }) {
  return {
    type: SCOREBOARD_LOADED,
    scoreboard,
  };
}

export function scoreboardLoadedError() {
  return {
    type: SCOREBOARD_LOADED_ERROR,
  };
}
