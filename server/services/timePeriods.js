const { range } = require('../polyfills');

const SEPTEMBER = 8;
const WEDNESDAY = 3;
const LAST_WEEK_OF_SEASON = 13;
const LAST_WEEK_OF_POST_SEASON = 16;
const FIRST_SEASON = 2018;

function dayAfter(date) {
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1);

  return nextDay;
}

function firstWedAfterDate(date) {
  let daysCheckedCount = 0;
  const dateToCheck = date;

  while (daysCheckedCount < 8) {
    if (dateToCheck.getDay() === WEDNESDAY) {
      return dateToCheck;
    }

    dateToCheck.setDate(dayAfter(date).getDate());
    daysCheckedCount += 1;
  }

  throw new Error('Could not find a Wednesday.');
}

function firstWedInSeptember(year) {
  return firstWedAfterDate(new Date(year, SEPTEMBER, 1));
}

function getHighestWeek() {
  const diff = new Date() - firstWedInSeptember(getCurrentSeason());
  const weekDiff = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
  return weekDiff > LAST_WEEK_OF_SEASON ? LAST_WEEK_OF_SEASON : weekDiff;
}

function getCurrentWeek() {
  if (getCurrentPostSeasonWeek() !== 0) {
    return 0;
  }

  return getHighestWeek();
}

function getCurrentPostSeasonWeek() {
  const diff = new Date() - firstWedInSeptember(getCurrentSeason());
  const weekDiff = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));

  if (weekDiff > LAST_WEEK_OF_POST_SEASON) {
    return LAST_WEEK_OF_POST_SEASON;
  }

  if (weekDiff < LAST_WEEK_OF_SEASON + 1) {
    return 0;
  }

  return weekDiff;
}

function getCurrentSeason() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const seasonStartDate = firstWedInSeptember(currentYear);

  return now < seasonStartDate ? currentYear - 1 : currentYear;
}

function getSeasons() {
  const currentSeason = getCurrentSeason();
  return range(FIRST_SEASON, currentSeason + 1).map(season => ({
    year: season,
    weeks:
      season !== currentSeason
        ? range(1, LAST_WEEK_OF_SEASON + 1)
        : range(1, getHighestWeek() + 1),
    postSeasonWeeks:
      season !== currentSeason
        ? range(14, LAST_WEEK_OF_POST_SEASON + 1)
        : range(14, getCurrentPostSeasonWeek() + 1),
  }));
}

module.exports = {
  getCurrentWeek,
  getCurrentSeason,
  getSeasons,
};
