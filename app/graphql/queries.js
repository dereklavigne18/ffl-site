import gql from 'graphql-tag';

const timePeriodQuery = gql`
  query times {
    currentWeek
    currentSeason
    seasons {
      year
      weeks
      postSeasonWeeks
    }
  }
`;

const standingsQuery = gql`
  query standings($year: Int!, $week: Int!) {
    standings(year: $year, week: $week) {
      records {
        rank
        team {
          name
          owner {
            name
          }
        }
        record {
          wins
          losses
          ties
        }
        pointsFor
        pointsAgainst
      }
    }
  }
`;

const matchupQuery = gql`
  fragment ScoreboardTeam on MatchupScore {
    points
    teamRecord {
      pointsFor
      record {
        wins
        losses
        ties
      }
      team {
        name
        owner {
          name
        }
      }
    }
  }

  query scoreboard($year: Int!, $week: Int!) {
    scoreboard(year: $year, week: $week) {
      homeScore {
        ...ScoreboardTeam
      }
      awayScore {
        ...ScoreboardTeam
      }
    }
  }
`;

export { timePeriodQuery, standingsQuery, matchupQuery };
