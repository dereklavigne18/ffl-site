const { getYahooLeagueClient, getEspnLeagueClient } = require('./espnClient');
const logger = require('../../logger');

function constructTeam(teamData) {
  return {
    id: teamData.id,
    name: `${teamData.location} ${teamData.nickname}`,
    ownerId: teamData.primaryOwner,
  };
}

function constructTeams(teams) {
  return teams.reduce((teamMap, team) => {
    const clonedTeamMap = teamMap;

    const constructedTeam = constructTeam(team);
    clonedTeamMap[constructedTeam.id] = constructedTeam;

    return clonedTeamMap;
  }, {});
}

function parseResponse(response) {
  return {
    teams: constructTeams(response.teams),
  };
}

async function fetchTeams({ client, season, week }) {
  const response = await client
    .getTeamsAtWeek({ season, week })
    .catch(logger.error);
  return parseResponse(await response.json()).teams;
}

// Both of the below function return data in the format:
// {
//   1: {
//     id: 1,
//     name: '2 Squids 1 Dress',
//     ownerId: '{123xyz}'
//   }
//   ...
// }

async function fetchEspnTeams({ season, week }) {
  return fetchTeams({ client: getEspnLeagueClient(), season, week });
}

async function fetchYahooTeams({ season, week }) {
  return fetchTeams({ client: getYahooLeagueClient(), season, week });
}

// /**
//  * Load all teams from the ESPN API (for a given week) and build Team objects from them
//  *
//  * @param season
//  * @param week
//  * @returns [Team]
//  */
// async function fetchAllTeams({ season, week }) {
//   const espnTeams = []; // await fetchEspnTeams({ season, week }); // TODO gotta update to get espn clients to work
//   const yahooTeams = await fetchYahooTeams({ season, week });
//
//   return espnTeams.concat(yahooTeams);
// }

module.exports = {
  fetchYahooTeams,
  fetchEspnTeams,
};
