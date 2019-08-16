/*
 *
 * StandingsPage actions
 *
 */

import {
  OPEN_TIMELINE_DRAWER,
  CLOSE_TIMELINE_DRAWER,
  CHANGE_YEAR,
  CHANGE_WEEK,
  LOAD_STANDINGS,
  STANDINGS_LOADED,
  STANDINGS_LOADED_ERROR,
  LOAD_TIME_PERIODS,
  TIME_PERIODS_LOADED,
  TIME_PERIODS_LOADED_ERROR,
} from './constants';

export function openTimelineDrawer() {
  return {
    type: OPEN_TIMELINE_DRAWER,
  };
}

export function closeTimelineDrawer() {
  return {
    type: CLOSE_TIMELINE_DRAWER,
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

export function loadStandings() {
  return {
    type: LOAD_STANDINGS,
  };
}

export function standingsLoaded({ standings }) {
  return {
    type: STANDINGS_LOADED,
    standings,
  };
}

export function standingsLoadedError({ error }) {
  return {
    type: STANDINGS_LOADED_ERROR,
    error,
  };
}

// These are mostly used on initialization
export function loadTimePeriods() {
  return {
    type: LOAD_TIME_PERIODS,
  };
}

export function timePeriodsLoaded({ week, year, seasons }) {
  return {
    type: TIME_PERIODS_LOADED,
    week,
    year,
    seasons,
  };
}

export function timePeriodsLoadedError({ error }) {
  return {
    type: TIME_PERIODS_LOADED_ERROR,
    error,
  };
}
