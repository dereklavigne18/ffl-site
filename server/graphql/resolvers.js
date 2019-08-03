const standings = require('../services/standings');

module.exports = {
  Query: {
    standings: async (obj, args) => ({
      seasonWeek: {
        year: args.year,
        week: args.week,
      },
      records: await standings.standingsBySeasonWeek({ ...args }),
    }),
  },
};
