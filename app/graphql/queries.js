import gql from 'graphql-tag';

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

export { standingsQuery };
