const { Client } = require('espn-fantasy-football-api/node');

const {
  ESPN_LEAGUE_ID,
  YAHOO_LEAGUE_ID,
  ESPN_COOKIE_S2,
  ESPN_COOKIE_SWID,
} = require('../../constants');

function getLeagueClient({ leagueId }) {
  const client = new Client({ leagueId });
  client.setCookies({ espnS2: ESPN_COOKIE_S2, SWID: ESPN_COOKIE_SWID });
  return client;
}

function getEspnLeagueClient() {
  return getLeagueClient({ leagueId: ESPN_LEAGUE_ID });
}

function getYahooLeagueClient() {
  return getLeagueClient({ leagueId: YAHOO_LEAGUE_ID });
}

module.exports = {
  getEspnLeagueClient,
  getYahooLeagueClient,
};
