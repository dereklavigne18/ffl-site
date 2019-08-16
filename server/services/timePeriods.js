const { range } = require('../polyfills');

const SEPTEMBER = 8;
const WEDNESDAY = 3;
const LAST_WEEK_OF_SEASON = 13;
const FIRST_SEASON = 2018;

function firstWedInSeptemberCurrentYear() {
  const currentYear = getCurrentSeason();
  const dayOfTheMonth = range(1, 8).find(
    day => new Date(currentYear, SEPTEMBER, day).getDay() === WEDNESDAY,
  );

  return new Date(currentYear, SEPTEMBER, dayOfTheMonth);
}

function getCurrentWeek() {
  const diff = new Date() - firstWedInSeptemberCurrentYear();
  const weekDiff = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
  return weekDiff > LAST_WEEK_OF_SEASON ? LAST_WEEK_OF_SEASON : weekDiff;
}

function getCurrentSeason() {
  const now = new Date();
  const currentYear = now.getFullYear();

  return now.getMonth() < SEPTEMBER ? currentYear - 1 : currentYear;
}

function getSeasons() {
  const currentSeason = getCurrentSeason();
  return range(FIRST_SEASON, currentSeason + 1).map(season => ({
    year: season,
    weeks:
      season === currentSeason
        ? range(1, LAST_WEEK_OF_SEASON + 1)
        : range(1, getCurrentWeek()),
  }));
}

module.exports = {
  getCurrentWeek,
  getCurrentSeason,
  getSeasons,
};
