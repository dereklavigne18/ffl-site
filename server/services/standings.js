// const cache = require('../cache');
const { liveLoadAllTeams } = require('./teams');

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
  const orderedTeams = teams;
  const teamCount = teams.length;

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

  return orderedTeams;
}

function transformTeamToTeamRecord(team, rank) {
  return {
    pointsAgainst: team.pointsAgainst,
    pointsFor: team.pointsFor,
    rank: rank + 1,
    record: {
      wins: team.wins,
      losses: team.losses,
      ties: team.ties,
    },
    team: {
      name: team.name,
      owner: null,
    },
  };
}

function transformTeamsToTeamRecords(teams) {
  return teams.map(transformTeamToTeamRecord);
}

async function calculateStandings({ season, week }) {
  const orderedTeams = orderTeamsByRank(
    await liveLoadAllTeams({ season, week }),
  );
  return transformTeamsToTeamRecords(orderedTeams);
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

// const fakeStandings = [
//   {
//     pointsAgainst: 100,
//     pointsFor: 2000,
//     rank: 1,
//     record: {
//       wins: 10,
//       losses: 0,
//       ties: 0,
//     },
//     team: {
//       name: 'Squids Kids',
//       owner: {
//         name: 'Squidward Tenticles',
//       },
//     },
//   },
//   {
//     pointsAgainst: 200,
//     pointsFor: 1900,
//     rank: 2,
//     record: {
//       wins: 10,
//       losses: 0,
//       ties: 0,
//     },
//     team: {
//       name: 'Arrrrgh',
//       owner: {
//         name: 'Flying Dutchman',
//       },
//     },
//   },
//   {
//     pointsAgainst: 300,
//     pointsFor: 1800,
//     rank: 3,
//     record: {
//       wins: 9,
//       losses: 0,
//       ties: 1,
//     },
//     team: {
//       name: 'Sponge Grunge',
//       owner: {
//         name: 'Spongebob Squarepants',
//       },
//     },
//   },
//   {
//     pointsAgainst: 400,
//     pointsFor: 1700,
//     rank: 4,
//     record: {
//       wins: 9,
//       losses: 1,
//       ties: 0,
//     },
//     team: {
//       name: 'Sandy is Dandy',
//       owner: {
//         name: 'Sandy Cheeks',
//       },
//     },
//   },
//   {
//     pointsAgainst: 500,
//     pointsFor: 1600,
//     rank: 5,
//     record: {
//       wins: 8,
//       losses: 0,
//       ties: 2,
//     },
//     team: {
//       name: 'Pearls Girls',
//       owner: {
//         name: 'Pearl Krabs',
//       },
//     },
//   },
//   {
//     pointsAgainst: 600,
//     pointsFor: 1500,
//     rank: 6,
//     record: {
//       wins: 8,
//       losses: 1,
//       ties: 1,
//     },
//     team: {
//       name: 'Is this pizza palace?',
//       owner: {
//         name: 'Patrick Starr',
//       },
//     },
//   },
//   {
//     pointsAgainst: 700,
//     pointsFor: 1400,
//     rank: 7,
//     record: {
//       wins: 8,
//       losses: 2,
//       ties: 0,
//     },
//     team: {
//       name: 'Give Me Me Money',
//       owner: {
//         name: 'Mr. Krabs',
//       },
//     },
//   },
//   {
//     pointsAgainst: 800,
//     pointsFor: 1300,
//     rank: 8,
//     record: {
//       wins: 7,
//       losses: 1,
//       ties: 2,
//     },
//     team: {
//       name: 'BOAT, Best Of All Time',
//       owner: {
//         name: 'Mrs. Puff',
//       },
//     },
//   },
//   {
//     pointsAgainst: 900,
//     pointsFor: 1200,
//     rank: 9,
//     record: {
//       wins: 7,
//       losses: 2,
//       ties: 1,
//     },
//     team: {
//       name: 'Spankin Plankton',
//       owner: {
//         name: 'Plankton',
//       },
//     },
//   },
//   {
//     pointsAgainst: 1000,
//     pointsFor: 1100,
//     rank: 10,
//     record: {
//       wins: 7,
//       losses: 3,
//       ties: 0,
//     },
//     team: {
//       name: 'Wormtown Homey',
//       owner: {
//         name: 'Wormy',
//       },
//     },
//   },
//   {
//     pointsAgainst: 1100,
//     pointsFor: 1000,
//     rank: 11,
//     record: {
//       wins: 6,
//       losses: 2,
//       ties: 2,
//     },
//     team: {
//       name: 'Garys Fairys',
//       owner: {
//         name: 'Gary the Snail',
//       },
//     },
//   },
//   {
//     pointsAgainst: 1200,
//     pointsFor: 900,
//     rank: 12,
//     record: {
//       wins: 6,
//       losses: 1,
//       ties: 3,
//     },
//     team: {
//       name: 'Larry > Gary',
//       owner: {
//         name: 'Larry The Lobster',
//       },
//     },
//   },
//   {
//     pointsAgainst: 1300,
//     pointsFor: 800,
//     rank: 13,
//     record: {
//       wins: 6,
//       losses: 3,
//       ties: 1,
//     },
//     team: {
//       name: 'Hmrgrrrrbhr',
//       owner: {
//         name: 'Doodle Bob',
//       },
//     },
//   },
//   {
//     pointsAgainst: 1400,
//     pointsFor: 700,
//     rank: 14,
//     record: {
//       wins: 5,
//       losses: 4,
//       ties: 1,
//     },
//     team: {
//       name: 'Mystery Machine',
//       owner: {
//         name: 'Mystery',
//       },
//     },
//   },
//   {
//     pointsAgainst: 1500,
//     pointsFor: 600,
//     rank: 15,
//     record: {
//       wins: 4,
//       losses: 3,
//       ties: 3,
//     },
//     team: {
//       name: '#1',
//       owner: {
//         name: 'Smitty WerberMan Jensen',
//       },
//     },
//   },
//   {
//     pointsAgainst: 1600,
//     pointsFor: 500,
//     rank: 16,
//     record: {
//       wins: 4,
//       losses: 4,
//       ties: 2,
//     },
//     team: {
//       name: 'Jenky',
//       owner: {
//         name: 'Old Man Jenkins',
//       },
//     },
//   },
//   {
//     pointsAgainst: 1700,
//     pointsFor: 400,
//     rank: 17,
//     record: {
//       wins: 3,
//       losses: 6,
//       ties: 1,
//     },
//     team: {
//       name: 'Beep Bop',
//       owner: {
//         name: 'Karen',
//       },
//     },
//   },
//   {
//     pointsAgainst: 1800,
//     pointsFor: 300,
//     rank: 18,
//     record: {
//       wins: 3,
//       losses: 7,
//       ties: 0,
//     },
//     team: {
//       name: 'Wumbo Setters',
//       owner: {
//         name: 'Mermaid Man',
//       },
//     },
//   },
//   {
//     pointsAgainst: 1900,
//     pointsFor: 200,
//     rank: 19,
//     record: {
//       wins: 2,
//       losses: 6,
//       ties: 2,
//     },
//     team: {
//       name: 'Barnacle Man',
//       owner: {
//         name: 'Barnacle Boy',
//       },
//     },
//   },
//   {
//     pointsAgainst: 2000,
//     pointsFor: 100,
//     rank: 20,
//     record: {
//       wins: 1,
//       losses: 9,
//       ties: 0,
//     },
//     team: {
//       name: 'Dirt McGirt',
//       owner: {
//         name: 'The Dirty Bubble',
//       },
//     },
//   },
// ];

module.exports = { standingsBySeasonWeek };
