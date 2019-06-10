const redis = {};

function standingsBySeasonWeek({ year, week }) {
  const cacheKey = `standings.${year}.${week}`;
  const standingsData = redis.get(cacheKey);
  if (standingsData) {
    return standingsData;
  }

  
}

export { standingsBySeasonWeek };
