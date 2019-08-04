const { getYahooLeagueClient } = require('./espnClient');
const { Team } = require('../../domain/team');
const { User } = require('../../domain/user');
const logger = require('../../logger');

function constructTeam(teamData, owner) {
  const team = new Team();
  team.name = `${teamData.location} ${teamData.nickname}`;
  team.wins = teamData.record.overall.wins;
  team.losses = teamData.record.overall.losses;
  team.ties = teamData.record.overall.ties;
  team.pointsFor = +teamData.record.overall.pointsFor.toFixed(2);
  team.pointsAgainst = +teamData.record.overall.pointsAgainst.toFixed(2);
  team.owner = owner;

  return team;
}

function constructTeams(teams, ownerMap) {
  return teams.map(team => constructTeam(team, ownerMap[team.primaryOwner]));
}

function constructOwnerAndAddToMap(ownerMap, member) {
  const owner = new User();
  owner.username = member.displayName;
  owner.name = `${member.firstName} ${member.lastName}`;

  const tmpOwnerMap = ownerMap;
  tmpOwnerMap[member.id] = owner;

  return tmpOwnerMap;
}

function parseResponse(response) {
  const ownerMap = response.members.reduce(constructOwnerAndAddToMap, {});
  return {
    teams: constructTeams(response.teams, ownerMap),
  };
}

async function fetchTeams({ client, season, week }) {
  const response = await client
    .getTeamsAtWeek({ season, week })
    .catch(logger.error);
  return parseResponse(await response.json()).teams;
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
  const espnTeams = []; // await fetchEspnTeams({ season, week }); // TODO gotta update to get espn clients to work
  const yahooTeams = await fetchYahooTeams({ season, week });

  return espnTeams.concat(yahooTeams);
}

module.exports = {
  fetchAllTeams,
};
