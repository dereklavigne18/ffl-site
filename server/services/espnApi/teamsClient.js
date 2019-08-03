const { getYahooLeagueClient } = require('./espnClient');
const { Team } = require('../../domain/team');
const logger = require('../../logger');

function constructTeam(teamData) {
  const team = new Team();
  team.name = teamData.name;
  team.wins = teamData.wins;
  team.losses = teamData.losses;
  team.ties = teamData.ties;
  team.pointsFor = teamData.regularSeasonPointsFor;
  team.pointsAgainst = teamData.regularSeasonPointsAgainst;

  return team;
}

function constructTeams(teams) {
  return teams.map(constructTeam);
}

async function fetchTeams({ client, season, week }) {
  const teams = await client
    .getTeamsAtWeek({
      seasonId: season,
      scoringPeriodId: week,
    })
    .catch(logger.error);
  return constructTeams(teams);
}

// async function fetchEspnTeams({ season, week }) {
//   return fetchTeams({ client: getEspnLeagueClient(), season, week });
// }

async function fetchYahooTeams({ season, week }) {
  return fetchTeams({ client: getYahooLeagueClient(), season, week });
}

/**
 * Load all teams from the ESPN API (for a given week) and build Team objects from them
 *
 * @param season
 * @param week
 * @returns [Team]
 */
async function fetchAllTeams({ season, week }) {
  const espnTeams = []; // await fetchEspnTeams({ season, week });
  const yahooTeams = await fetchYahooTeams({ season, week });

  return espnTeams.concat(yahooTeams);
}

module.exports = {
  fetchAllTeams,
};
