const standings = require('../services/standings');
const {
  getCurrentWeek,
  getCurrentSeason,
  getSeasons,
} = require('../services/timePeriods');

module.exports = {
  Query: {
    currentWeek: getCurrentWeek,
    currentSeason: getCurrentSeason,
    seasons: getSeasons,
    standings: async (obj, args) => ({
      seasonWeek: {
        year: args.year,
        week: args.week,
      },
      records: await standings.standingsBySeasonWeek({ ...args }),
    }),
  },
};
