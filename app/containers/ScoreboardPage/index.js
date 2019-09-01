/**
 *
 * ScoreboardPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';

import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';

import Drawer from '../../components/Drawer/Loadable';
import TimePeriodSettings from '../../components/TimePeriodSettings/Loadable';

import { loadTimePeriods } from '../App/actions';
import { makeSelectSeasons, makeSelectNeedLoadSeasons } from '../App/selectors';

import {
  openSettingsDrawer,
  closeSettingsDrawer,
  changeYear,
  changeWeek,
  loadScoreboard,
} from './actions';
import {
  makeSelectIsSettingsDrawerOpen,
  makeSelectYear,
  makeSelectWeek,
  makeSelectScoreboard,
  makeSelectIsLoading,
  makeSelectLoadingError,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

import Oops from '../../components/Oops';
import Spinner from '../../components/Spinner';

const TimePeriodInputWrapper = styled.div`
  & div {
    display: inline-block;
  }
`;

const ScoreboardTable = styled.table`
  width: 96%;
  margin: auto;

  border-spacing: 0px 10px;
  border-collapse: separate;
`;

const ScoreboardTableCell = styled.td`
  border: 3px solid red;
  background-color: #38393b;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const TeamInfo = styled(ScoreboardTableCell)`
  font-size: 14px;
  color: lightgrey;

  width: 15%;

  & p {
    margin-top: 0px;
    margin-bottom: 0px;
  }
`;

const HomeTeamInfo = styled(TeamInfo)`
  text-align: right;
  border-right: none;
`;

const AwayTeamInfo = styled(TeamInfo)`
  border-left: none;
`;

const TeamName = styled(ScoreboardTableCell)`
  width: 25%;

  padding-right: 15px;
  padding-left: 15px;

  & h3 {
    margin-top: 0px;
    margin-bottom: 0px;
    font-size: 18px;
    font-family: Georgia, Times, 'Times New Roman', serif;
  }
`;

const HomeTeamName = styled(TeamName)`
  text-align: right;
  padding-top: 18px;
  padding-bottom: 18px;

  border-left: none;
`;

const AwayTeamName = styled(TeamName)`
  border-right: none;
`;

const ScoreBox = styled(ScoreboardTableCell)`
  width: 8%;
  min-width: 73px;

  background: red;
  text-align: center;

  font-size: 22px;
  font-weight: bold;
`;

const HomeScoreBox = styled(ScoreBox)`
  border-right: 3px solid black;
`;

const AwayScoreBox = styled(ScoreBox)`
  border-left: 3px solid black;
`;

export function ScoreboardPage({
  needLoadSeasons,
  isSettingsDrawerOpen,
  seasons,
  year,
  week,
  scoreboard,
  isLoading,
  loadingError,
  handleInitializeSeasons,
  handleLoadScoreboard,
  handleOpenSettingsDrawer,
  handleCloseSettingsDrawer,
  handleChangeYear,
  handleChangeWeek,
}) {
  // TODO Figure out why the records are weird

  useInjectReducer({ key: 'scoreboardPage', reducer });
  useInjectSaga({ key: 'scoreboardPage', saga });

  // On initial render, get and set the current time period
  useEffect(() => {
    if (needLoadSeasons) {
      handleInitializeSeasons();
    } else if (scoreboard.length === 0) {
      handleLoadScoreboard();
    }
  }, []);

  const matchupViews = scoreboard.map(matchup => {
    const { homeScore, awayScore } = matchup;
    return (
      <tr>
        <HomeTeamInfo>
          <p>{homeScore.ownerName}</p>
          <p>{homeScore.record}</p>
        </HomeTeamInfo>
        <HomeTeamName>
          <h3>{homeScore.teamName}</h3>
        </HomeTeamName>
        <HomeScoreBox>{homeScore.weekPoints}</HomeScoreBox>
        <AwayScoreBox>{awayScore.weekPoints}</AwayScoreBox>
        <AwayTeamName>
          <h3>{awayScore.teamName}</h3>
        </AwayTeamName>
        <AwayTeamInfo>
          <p>{awayScore.ownerName}</p>
          <p>{awayScore.record}</p>
        </AwayTeamInfo>
      </tr>
    );
  });

  let content = (
    <ScoreboardTable>
      <tbody>{matchupViews}</tbody>
    </ScoreboardTable>
  );
  if (isLoading) {
    content = <Spinner />;
  } else if (loadingError) {
    content = <Oops />;
  }

  return (
    <div>
      <Drawer
        isOpen={isSettingsDrawerOpen}
        handleOpenDrawer={handleOpenSettingsDrawer}
        handleCloseDrawer={handleCloseSettingsDrawer}
      >
        <h3>
          Set the season and week you would like to see the scoreboard for.
        </h3>
        <TimePeriodInputWrapper>
          <TimePeriodSettings
            year={year}
            week={week}
            seasons={seasons}
            handleChangeYear={handleChangeYear}
            handleChangeWeek={handleChangeWeek}
          />
        </TimePeriodInputWrapper>
      </Drawer>
      {content}
    </div>
  );
}

ScoreboardPage.propTypes = {
  needLoadSeasons: PropTypes.bool.isRequired,
  isSettingsDrawerOpen: PropTypes.bool.isRequired,
  year: PropTypes.number.isRequired,
  week: PropTypes.number.isRequired,
  seasons: PropTypes.array.isRequired,
  scoreboard: PropTypes.array,
  isLoading: PropTypes.bool,
  loadingError: PropTypes.bool,
  handleInitializeSeasons: PropTypes.func.isRequired,
  handleLoadScoreboard: PropTypes.func.isRequired,
  handleOpenSettingsDrawer: PropTypes.func.isRequired,
  handleCloseSettingsDrawer: PropTypes.func.isRequired,
  handleChangeYear: PropTypes.func.isRequired,
  handleChangeWeek: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  needLoadSeasons: makeSelectNeedLoadSeasons(),
  isSettingsDrawerOpen: makeSelectIsSettingsDrawerOpen(),
  year: makeSelectYear(),
  week: makeSelectWeek(),
  seasons: makeSelectSeasons(),
  scoreboard: makeSelectScoreboard(),
  isLoading: makeSelectIsLoading(),
  loadingError: makeSelectLoadingError(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleInitializeSeasons: () => {
      dispatch(loadTimePeriods());
      dispatch(loadScoreboard());
    },
    handleLoadScoreboard: () => dispatch(loadScoreboard()),
    handleOpenSettingsDrawer: () => dispatch(openSettingsDrawer()),
    handleCloseSettingsDrawer: () => dispatch(closeSettingsDrawer()),
    handleChangeYear: evt => {
      dispatch(changeYear({ year: parseInt(evt.target.value, 10) }));
      dispatch(loadScoreboard());
    },
    handleChangeWeek: evt => {
      dispatch(changeWeek({ week: parseInt(evt.target.value, 10) }));
      dispatch(loadScoreboard());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ScoreboardPage);
