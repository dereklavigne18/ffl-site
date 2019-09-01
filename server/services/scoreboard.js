const { getBoxscoresAtSeasonWeek } = require('./boxscores');
const { getRecords } = require('./records');

function addRecordsToBoxscores({ records, boxscore }) {
  return {
    homeScore: {
      points: boxscore.home.points,
      teamRecord: records[boxscore.home.team.owner.id],
    },
    awayScore: {
      points: boxscore.away.points,
      teamRecord: records[boxscore.away.team.owner.id],
    },
  };
}

function calculateScoreboard({ records, boxscores }) {
  return boxscores.map(boxscore =>
    addRecordsToBoxscores({ records, boxscore }),
  );
}

async function getScoreboard({ year, week }) {
  // return [
  //   {
  //     homeScore: {
  //       points: 122.18,
  //       teamRecord: {
  //         pointsFor: 809.98,
  //         record: {
  //           wins: 3,
  //           losses: 6,
  //           ties: 0,
  //         },
  //         team: {
  //           name: 'All Hail the Vi Kings',
  //           owner: {
  //             name: 'Brian Rosinski',
  //           },
  //         },
  //       },
  //     },
  //     awayScore: {
  //       points: 115.72,
  //       teamRecord: {
  //         pointsFor: 894.18,
  //         record: {
  //           wins: 1,
  //           losses: 8,
  //           ties: 0,
  //         },
  //         team: {
  //           name: 'Team Chief Pits ',
  //           owner: {
  //             name: 'Dan Lawson',
  //           },
  //         },
  //       },
  //     },
  //   },
  //   {
  //     homeScore: {
  //       points: 151.22,
  //       teamRecord: {
  //         pointsFor: 1184.7,
  //         record: {
  //           wins: 7,
  //           losses: 2,
  //           ties: 0,
  //         },
  //         team: {
  //           name: 'Trash  Cans',
  //           owner: {
  //             name: 'Adam Ciampi',
  //           },
  //         },
  //       },
  //     },
  //     awayScore: {
  //       points: 148.4,
  //       teamRecord: {
  //         pointsFor: 1001.6,
  //         record: {
  //           wins: 5,
  //           losses: 4,
  //           ties: 0,
  //         },
  //         team: {
  //           name: 'Dont ever start Josh Reynolds',
  //           owner: {
  //             name: 'Shrinjoy Sahoo',
  //           },
  //         },
  //       },
  //     },
  //   },
  //   {
  //     homeScore: {
  //       points: 137.2,
  //       teamRecord: {
  //         pointsFor: 1054.9,
  //         record: {
  //           wins: 3,
  //           losses: 6,
  //           ties: 0,
  //         },
  //         team: {
  //           name: 'Running Back by Committee',
  //           owner: {
  //             name: 'Donny Barnas',
  //           },
  //         },
  //       },
  //     },
  //     awayScore: {
  //       points: 83,
  //       teamRecord: {
  //         pointsFor: 958.4,
  //         record: {
  //           wins: 6,
  //           losses: 3,
  //           ties: 0,
  //         },
  //         team: {
  //           name: 'The Yahoo Killer',
  //           owner: {
  //             name: 'Mark Daley',
  //           },
  //         },
  //       },
  //     },
  //   },
  //   {
  //     homeScore: {
  //       points: 98,
  //       teamRecord: {
  //         pointsFor: 935.04,
  //         record: {
  //           wins: 3,
  //           losses: 6,
  //           ties: 0,
  //         },
  //         team: {
  //           name: 'Team Biscuit',
  //           owner: {
  //             name: 'Tommy Grip',
  //           },
  //         },
  //       },
  //     },
  //     awayScore: {
  //       points: 108.74,
  //       teamRecord: {
  //         pointsFor: 1093.1,
  //         record: {
  //           wins: 6,
  //           losses: 3,
  //           ties: 0,
  //         },
  //         team: {
  //           name: 'Jennys Boyfriend',
  //           owner: {
  //             name: 'Devin Garvey',
  //           },
  //         },
  //       },
  //     },
  //   },
  //   {
  //     homeScore: {
  //       points: 117.76,
  //       teamRecord: {
  //         pointsFor: 822.44,
  //         record: {
  //           wins: 5,
  //           losses: 4,
  //           ties: 0,
  //         },
  //         team: {
  //           name: 'Thad Castle for President',
  //           owner: {
  //             name: 'Alek Pouliopoulos',
  //           },
  //         },
  //       },
  //     },
  //     awayScore: {
  //       points: 119.34,
  //       teamRecord: {
  //         pointsFor: 1093.14,
  //         record: {
  //           wins: 5,
  //           losses: 4,
  //           ties: 0,
  //         },
  //         team: {
  //           name: 'Team Barnas',
  //           owner: {
  //             name: 'Joe Barnas',
  //           },
  //         },
  //       },
  //     },
  //   },
  //   {
  //     homeScore: {
  //       points: 130.56,
  //       teamRecord: {
  //         pointsFor: 953.74,
  //         record: {
  //           wins: 2,
  //           losses: 7,
  //           ties: 0,
  //         },
  //         team: {
  //           name: 'Ajayi Feel Pretty',
  //           owner: {
  //             name: 'Ryan Hurley',
  //           },
  //         },
  //       },
  //     },
  //     awayScore: {
  //       points: 145.82,
  //       teamRecord: {
  //         pointsFor: 1009.66,
  //         record: {
  //           wins: 4,
  //           losses: 5,
  //           ties: 0,
  //         },
  //         team: {
  //           name: 'Absolute Units',
  //           owner: {
  //             name: 'Mike Miceli',
  //           },
  //         },
  //       },
  //     },
  //   },
  //   {
  //     homeScore: {
  //       points: 138.6,
  //       teamRecord: {
  //         pointsFor: 1210.74,
  //         record: {
  //           wins: 8,
  //           losses: 1,
  //           ties: 0,
  //         },
  //         team: {
  //           name: 'Ajayi Swept The Division',
  //           owner: {
  //             name: 'Maclane Walsh',
  //           },
  //         },
  //       },
  //     },
  //     awayScore: {
  //       points: 90.02,
  //       teamRecord: {
  //         pointsFor: 946.56,
  //         record: {
  //           wins: 4,
  //           losses: 5,
  //           ties: 0,
  //         },
  //         team: {
  //           name: 'Ajayi Feel Like a Woman',
  //           owner: {
  //             name: 'Sean Mitsock',
  //           },
  //         },
  //       },
  //     },
  //   },
  //   {
  //     homeScore: {
  //       points: 97.22,
  //       teamRecord: {
  //         pointsFor: 943.22,
  //         record: {
  //           wins: 4,
  //           losses: 5,
  //           ties: 0,
  //         },
  //         team: {
  //           name: 'DDT 2K18',
  //           owner: {
  //             name: 'Robby Loftus',
  //           },
  //         },
  //       },
  //     },
  //     awayScore: {
  //       points: 82.12,
  //       teamRecord: {
  //         pointsFor: 881.8,
  //         record: {
  //           wins: 3,
  //           losses: 6,
  //           ties: 0,
  //         },
  //         team: {
  //           name: 'Team Wasko',
  //           owner: {
  //             name: 'Andrew Wasko',
  //           },
  //         },
  //       },
  //     },
  //   },
  //   {
  //     homeScore: {
  //       points: 155.42,
  //       teamRecord: {
  //         pointsFor: 1089.4,
  //         record: {
  //           wins: 7,
  //           losses: 2,
  //           ties: 0,
  //         },
  //         team: {
  //           name: "Frank's  Dead",
  //           owner: {
  //             name: 'Ryan Sullivan',
  //           },
  //         },
  //       },
  //     },
  //     awayScore: {
  //       points: 59.34,
  //       teamRecord: {
  //         pointsFor: 923.12,
  //         record: {
  //           wins: 4,
  //           losses: 5,
  //           ties: 0,
  //         },
  //         team: {
  //           name: '2 Squids 1 Dress',
  //           owner: {
  //             name: 'Derek Lavigne',
  //           },
  //         },
  //       },
  //     },
  //   },
  //   {
  //     homeScore: {
  //       points: 137.9,
  //       teamRecord: {
  //         pointsFor: 1033.42,
  //         record: {
  //           wins: 7,
  //           losses: 2,
  //           ties: 0,
  //         },
  //         team: {
  //           name: 'Flopper Gunner',
  //           owner: {
  //             name: 'Pat Semeter',
  //           },
  //         },
  //       },
  //     },
  //     awayScore: {
  //       points: 83.4,
  //       teamRecord: {
  //         pointsFor: 988.06,
  //         record: {
  //           wins: 3,
  //           losses: 6,
  //           ties: 0,
  //         },
  //         team: {
  //           name: 'Clown ina Gown',
  //           owner: {
  //             name: 'Scott Herald',
  //           },
  //         },
  //       },
  //     },
  //   },
  // ];
  let calculatedWeek = week;
  if (week === 0) {
    calculatedWeek = 13;
  }

  const records = await getRecords({ season: year, week });
  const boxscores = await getBoxscoresAtSeasonWeek({
    season: year,
    week: calculatedWeek,
  });

  return calculateScoreboard({ records, boxscores });
}

module.exports = {
  getScoreboard,
};
