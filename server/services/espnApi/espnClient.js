const fetch = require('node-fetch');
const logger = require('../../logger');

const {
  ESPN_LEAGUE_ID,
  YAHOO_LEAGUE_ID,
  ESPN_BASE_URL,
  ESPN_COOKIE_S2,
  ESPN_COOKIE_SWID,
} = require('../../constants');

class Client {
  constructor({ leagueId, espnS2, swId }) {
    this.leagueId = leagueId;
    this.espnS2 = espnS2;
    this.swId = swId;
  }

  async get({ urlPath }) {
    return fetch(ESPN_BASE_URL + urlPath, {
      credentials: 'include',
      headers: { Cookie: `espn_s2=${this.espnS2}; SWID=${this.swId};` },
    });
  }

  async getTeamsAtWeek({ season, week }) {
    const pathBase = `${season}/segments/0/leagues/${this.leagueId}`;
    const pathParams = `?scoringPeriodId=${week}&view=mRoster&view=mTeam`;
    const urlPath = `${pathBase}${pathParams}`;

    return this.get({ urlPath }).catch(logger.error);
  }
}

function getEspnLeagueClient() {
  return new Client({
    leagueId: ESPN_LEAGUE_ID,
    espnS2: ESPN_COOKIE_S2,
    swId: ESPN_COOKIE_SWID,
  });
}

function getYahooLeagueClient() {
  return new Client({
    leagueId: YAHOO_LEAGUE_ID,
    espnS2: ESPN_COOKIE_S2,
    swId: ESPN_COOKIE_SWID,
  });
}

module.exports = {
  getEspnLeagueClient,
  getYahooLeagueClient,
};
