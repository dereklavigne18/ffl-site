/**
 * API calls for the standings page
 */

import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';
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

import { makeSelectNeedLoadSeasons } from '../App/selectors';
import { getTimePeriods } from '../App/saga';

function* getStandings() {
  const needLoadSeasons = yield makeSelectNeedLoadSeasons();
  if (needLoadSeasons) {
    yield getTimePeriods();
  }

  const year = yield select(makeSelectYear());
  const week = yield select(makeSelectWeek());

  const variables = { year, week };

  try {
    const standingsResponse = yield call(graphql, standingsQuery, variables);
    if (!standingsResponse.data) {
      yield put(standingsLoadedError({ error: 'No records returned' }));
      return;
    }

    const standings = standingsResponse.data.standings.records.map(
      standingRecord => {
        const { team } = standingRecord;
        const { record } = standingRecord;
        return {
          ...standingRecord,
          name: team.name,
          ownerName: team.owner.name,
          record: `${record.wins}-${record.losses}-${record.ties}`,
        };
      },
    );
    yield put(standingsLoaded({ standings }));
  } catch (error) {
    yield put(standingsLoadedError({ error }));
  }
}

function* watchLoadStandings() {
  yield takeLatest(LOAD_STANDINGS, getStandings);
}

export default function* rootSaga() {
  yield all([fork(watchLoadStandings)]);
}
