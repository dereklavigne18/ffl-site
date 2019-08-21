/*
 *
 * ScoreboardPage actions
 *
 */

import { OPEN_SETTINGS_DRAWER, CLOSE_SETTINGS_DRAWER } from './constants';

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
