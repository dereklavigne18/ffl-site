/**
 * API calls for the standings page
 */

import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';
import { graphql } from 'utils/request';
import { standingsQuery, timePeriodQuery } from 'graphql/queries';
import {
  LOAD_STANDINGS,
  LOAD_TIME_PERIODS,
} from 'containers/StandingsPage/constants';
import {
  loadStandings,
  standingsLoaded,
  standingsLoadedError,
  timePeriodsLoaded,
  timePeriodsLoadedError,
} from 'containers/StandingsPage/actions';
import {
  makeSelectYear,
  makeSelectWeek,
} from 'containers/StandingsPage/selectors';

function* getStandings() {
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

function* getTimePeriods() {
  try {
    const timePeriodsResponse = yield call(graphql, timePeriodQuery);
    if (!timePeriodsResponse.data) {
      yield put(timePeriodsLoadedError({ error: 'No records returned' }));
      return;
    }

    yield put(
      timePeriodsLoaded({
        week: timePeriodsResponse.data.currentWeek,
        year: timePeriodsResponse.data.currentSeason,
        seasons: timePeriodsResponse.data.seasons,
      }),
    );
    yield put(loadStandings());
  } catch (error) {
    yield put(timePeriodsLoadedError({ error }));
  }
}

function* watchLoadTimePeriods() {
  yield takeLatest(LOAD_TIME_PERIODS, getTimePeriods);
}

export default function* rootSaga() {
  yield all([fork(watchLoadStandings), fork(watchLoadTimePeriods)]);
}
