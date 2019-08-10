const { getAllBoxScores } = require('./boxscores');

const LAST_WEEK_OF_REGULAR_SEASON = 13;

function initializeTeamRecord({ teamRecords, team }) {
  const clonedTeamRecords = teamRecords;
  clonedTeamRecords[team.owner.id] = {
    team,
    pointsAgainst: 0,
    pointsFor: 0,
    rank: 0,
    record: {
      wins: 0,
      losses: 0,
      ties: 0,
    },
  };

  return clonedTeamRecords;
}

function initializeTeamRecords({ boxscores }) {
  return boxscores.reduce((teamRecords, boxscore) => {
    const teamRecordsWithHomeTeam = initializeTeamRecord({
      teamRecords,
      team: boxscore.home,
    });

    return initializeTeamRecord({
      teamRecordsWithHomeTeam,
      team: boxscore.away,
    });
  }, {});
}

function calculateUpdatedTeamRecord({
  teamRecord,
  teamBoxscore,
  opponentBoxscore,
}) {
  return {
    ...teamRecord,
    pointsAgainst: teamRecord.pointsAgainst + opponentBoxscore.points,
    pointsFor: teamRecord.pointsFor + teamBoxscore.points,
    record: {
      wins:
        teamBoxscore.points > opponentBoxscore.points
          ? teamRecord.record.wins + 1
          : teamRecord.record.wins,
      losses:
        teamBoxscore.points < opponentBoxscore.points
          ? teamRecord.record.losses
          : teamRecord.record.losses + 1,
      ties:
        teamBoxscore.points === opponentBoxscore.points
          ? teamRecord.record.ties + 1
          : teamRecord.record.ties,
    },
  };
}

function addGameResultToTeamRecords({ teamRecords, boxscore }) {
  const clonedTeamRecords = teamRecords;
  const homeTeamRecord = clonedTeamRecords[boxscore.home.team.owner.id];
  const awayTeamRecord = clonedTeamRecords[boxscore.away.team.owner.id];

  clonedTeamRecords[boxscore.home.team.owner.id] = calculateUpdatedTeamRecord({
    teamRecord: homeTeamRecord,
    teamBoxscore: boxscore.home,
    opponentBoxscore: boxscore.away,
  });
  clonedTeamRecords[boxscore.away.team.owner.id] = calculateUpdatedTeamRecord({
    teamRecord: awayTeamRecord,
    teamBoxscore: boxscore.away,
    opponentBoxscore: boxscore.home,
  });

  return clonedTeamRecords;
}

function addWeekResultsToTeamRecords({ teamRecords, boxscores }) {
  return boxscores.reduce(
    (clonedTeamRecords, boxscore) =>
      addGameResultToTeamRecords({
        teamRecords: clonedTeamRecords,
        boxscore,
      }),
    teamRecords,
  );
}

function calculateTeamRecords({ boxscores, week }) {
  let lastWeekToCount = week;
  if (week > LAST_WEEK_OF_REGULAR_SEASON) {
    lastWeekToCount = LAST_WEEK_OF_REGULAR_SEASON + 1;
  }

  return Array(lastWeekToCount).reduce(
    (teamRecords, currentWeek) =>
      addWeekResultsToTeamRecords({
        teamRecords,
        boxscores: boxscores[currentWeek],
      }),
    initializeTeamRecords({ boxscores: boxscores[1] }),
  );
}

// Checks if the ranking team has a worse record than the reference
function isRecordWorse(rankingTeam, referenceTeam) {
  return (
    rankingTeam.losses > referenceTeam.losses ||
    (rankingTeam.losses === referenceTeam.losses &&
      rankingTeam.ties > referenceTeam.ties) ||
    (rankingTeam.losses === referenceTeam.losses &&
      rankingTeam.ties === referenceTeam.ties &&
      rankingTeam.pointsFor < referenceTeam.pointsFor)
  );
}

function orderTeamsByRank(teams) {
  const orderedTeams = teams.values();
  const teamCount = orderedTeams.length;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < teamCount - 1; i++) {
    // eslint-disable-next-line no-plusplus
    for (let j = 0; j < teamCount - i - 1; j++) {
      if (isRecordWorse(orderedTeams[j], orderedTeams[j + 1])) {
        const teamToMove = orderedTeams[j];
        orderedTeams[j] = orderedTeams[j + 1];
        orderedTeams[j + 1] = teamToMove;
      }
    }
  }

  // eslint-disable-next-line no-plusplus
  for (let k = 0; k < teamCount - 1; k++) {
    orderedTeams[k].rank = k + 1;
  }

  return orderedTeams;
}

async function calculateStandings({ season, week }) {
  // const orderedTeams = orderTeamsByRank(
  //   await liveLoadAllTeams({ season, week }),
  // );
  // return transformTeamsToTeamRecords(orderedTeams);
  const boxscores = await getAllBoxScores({ season, week });
  const teamRecords = calculateTeamRecords({ boxscores, week });

  return orderTeamsByRank(teamRecords);
}

async function standingsBySeasonWeek({ year, week }) {
  // If the standings are cached load them up and return
  // const cacheKey = `standingsBySeasonWeek.${year}.${week}`;
  // const areStandingsCached = await cache.existsAsync(cacheKey);
  // if (areStandingsCached) {
  //   return cache.getAync(cacheKey);
  // }
  return calculateStandings({ season: year, week });

  // cache.set('test', 56);
  //
  // cache.get('test', (err, result) => {
  //   console.log('Inside ' + result);
  // });
  //
  // const result = await cache.getAsync('test');
  // console.log('Outside ' + result);
}

module.exports = { standingsBySeasonWeek };
