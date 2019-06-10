import { standingsBySeasonWeek } from '../services/standings';

export default {
  Query: {
    standings: (obj, args) => ({
      seasonWeek: {
        year: args.year,
        week: args.week,
      },
      records: standingsBySeasonWeek({ ...args }),
    }),
  },
};
