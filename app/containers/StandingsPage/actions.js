/*
 *
 * StandingsPage actions
 *
 */

import {
  CHANGE_YEAR,
  CHANGE_WEEK,
  LOAD_STANDINGS,
  STANDINGS_LOADED,
  STANDINGS_LOADED_ERROR,
} from './constants';

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
