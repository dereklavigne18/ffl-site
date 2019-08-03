const { fetchAllTeams } = require('./espnApi/teamsClient');

async function getAllTeams({ season, week }) {
  return liveLoadAllTeams({ season, week });
}

async function liveLoadAllTeams({ season, week }) {
  return fetchAllTeams({ season, week });
}

module.exports = {
  getAllTeams,
  liveLoadAllTeams,
};
