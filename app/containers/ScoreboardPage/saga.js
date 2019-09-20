import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { graphql } from 'utils/request';
import { matchupQuery } from 'graphql/queries';

import { scoreboardLoaded, scoreboardLoadedError } from './actions';
import { LOAD_SCOREBOARD } from './constants';
import { makeSelectYear, makeSelectWeek } from './selectors';
import { makeSelectNeedLoadSeasons } from '../App/selectors';
import { getTimePeriods } from '../App/saga';

function* getScoreboard() {
  const needLoadSeasons = yield makeSelectNeedLoadSeasons();
  if (needLoadSeasons) {
    yield getTimePeriods();
  }

  const year = yield select(makeSelectYear());
  const week = yield select(makeSelectWeek());

  const variables = { year, week };

  try {
    const matchupResponse = yield call(graphql, matchupQuery, variables);
    if (!matchupResponse.data) {
      yield put(scoreboardLoadedError());
      return;
    }

    const scoreboard = matchupResponse.data.scoreboard.map(matchup => {
      const home = matchup.homeScore;
      const away = matchup.awayScore;

      const homeRecord = home.teamRecord.record;
      const awayRecord = away.teamRecord.record;

      return {
        homeScore: {
          teamName: home.teamRecord.team.name,
          ownerName: home.teamRecord.team.owner.name,
          weekPoints: home.points,
          record: `${homeRecord.wins}-${homeRecord.losses}-${homeRecord.ties} ${
            home.teamRecord.pointsFor
          }`,
        },
        awayScore: {
          teamName: away.teamRecord.team.name,
          ownerName: away.teamRecord.team.owner.name,
          weekPoints: away.points,
          record: `${awayRecord.wins}-${awayRecord.losses}-${awayRecord.ties} ${
            away.teamRecord.pointsFor
          }`,
        },
      };
    });
    yield put(scoreboardLoaded({ scoreboard }));
  } catch (error) {
    yield put(scoreboardLoadedError());
  }
}

function* watchLoadStandings() {
  yield takeLatest(LOAD_SCOREBOARD, getScoreboard);
}

export default function* rootSaga() {
  yield all([fork(watchLoadStandings)]);
}
