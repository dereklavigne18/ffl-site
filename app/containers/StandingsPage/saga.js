/**
 * API calls for the standings page
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { graphql } from 'utils/request';
import { standingsQuery } from 'graphql/queries';
import { LOAD_STANDINGS } from 'containers/StandingsPage/constants';
import {
  standingsLoaded,
  standingsLoadedError,
} from 'containers/StandingsPage/actions';
import {
  makeSelectYear,
  makeSelectWeek,
} from 'containers/StandingsPage/selectors';

/**
 * Github repos request/response handler
 */
export function* getStandings() {
  const year = yield select(makeSelectYear());
  const week = yield select(makeSelectWeek());

  const variables = { year, week };

  try {
    const standingsResponse = yield call(graphql, standingsQuery, variables);

    const standings = standingsResponse.data.standings.records.map(
      standingRecord => {
        const { team } = standingRecord;
        const { record } = standingRecord;
        return {
          ...standingRecord,
          name: team.name,
          ownerName: null, // team.owner.name, // TODO This should be required
          record: `${record.wins}-${record.losses}-${record.ties}`,
        };
      },
    );
    yield put(standingsLoaded({ standings }));
  } catch (error) {
    yield put(standingsLoadedError({ error }));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* standingsData() {
  // Watches for LOAD_STANDINGS actions and calls getStandings when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_STANDINGS, getStandings);
}
