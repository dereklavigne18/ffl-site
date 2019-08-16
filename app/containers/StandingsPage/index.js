/**
 *
 * StandingsPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import {
  openTimelineDrawer,
  closeTimelineDrawer,
  changeYear,
  changeWeek,
  loadStandings,
  loadTimePeriods,
} from 'containers/StandingsPage/actions';
import reducer from 'containers/StandingsPage/reducer';
import saga from 'containers/StandingsPage/saga';
import {
  makeSelectIsTimelineDrawerOpen,
  makeSelectSeasons,
  makeSelectWeek,
  makeSelectYear,
  makeSelectStandings,
  makeSelectIsLoading,
  makeSelectLoadingError,
} from 'containers/StandingsPage/selectors';

import TimePeriodController from 'containers/StandingsPage/TimePeriodController';

import Table from 'components/Table/Loadable';
import Oops from 'components/Oops/Loadable';
import Spinner from 'components/Spinner/Loadable';

const TimePeriodInputWrapper = styled.div`
  & div {
    display: inline-block;
  }
`;

const SettingsTab = styled.div`
  position: fixed;
`;

const ShiftedSettingsTab = styled(SettingsTab)`
  left: 40%;
`;

const SettingsButton = styled.button`
  background-color: #1f2021;
  color: red;
  font-size: 50px;

  margin-top: 50px;
  margin-left: -3px;

  border-color: red;
  border-width: 3px;
  border-radius: 5%;

  & :hover {
    cursor: pointer;
  }
`;

const SettingsDrawer = styled.div`
  position: fixed;
  z-index: 1;

  height: 100%;
  width: 40%;
  min-width: 200px;
  overflow-x: hidden;

  background-color: #38393b;
  border-right: 3px solid red;

  padding: 10px;
`;

export function StandingsPage({
  isTimelineDrawerOpen,
  seasons,
  year,
  week,
  standings,
  isLoading,
  loadingError,
  handleInitializeSeasons,
  handleChangeYear,
  handleChangeWeek,
  handleClickOpenTimelineDrawer,
  handleClickCloseTimelineDrawer,
}) {
  useInjectReducer({ key: 'standingsPage', reducer });
  useInjectSaga({ key: 'standingsPage', saga });

  // On initial render, get and set the current time period
  useEffect(() => {
    if (seasons.length === 0) {
      handleInitializeSeasons();
    }
  }, []);

  let content = <Table rows={standings} columns={columns} />;
  if (isLoading) {
    content = <Spinner />;
  } else if (loadingError) {
    content = <Oops />;
  }

  if (isTimelineDrawerOpen) {
    return (
      <div>
        <div>
          <SettingsDrawer>
            <h3>
              Set the season and week you would like to view the standings for.
            </h3>
            <TimePeriodInputWrapper>
              <TimePeriodController
                year={year}
                week={week}
                seasons={seasons}
                handleChangeYear={handleChangeYear}
                handleChangeWeek={handleChangeWeek}
              />
            </TimePeriodInputWrapper>
          </SettingsDrawer>
          <ShiftedSettingsTab>
            <SettingsButton onClick={handleClickCloseTimelineDrawer}>
              <i className="fa fa-chevron-left" />
            </SettingsButton>
          </ShiftedSettingsTab>
        </div>
        {content}
      </div>
    );
  }

  return (
    <div>
      <SettingsTab>
        <SettingsButton onClick={handleClickOpenTimelineDrawer}>
          <i className="fa fa-chevron-right" />
        </SettingsButton>
      </SettingsTab>
      {content}
    </div>
  );
}

StandingsPage.propTypes = {
  isTimelineDrawerOpen: PropTypes.bool.isRequired,
  seasons: PropTypes.array,
  year: PropTypes.number,
  week: PropTypes.number,
  standings: PropTypes.array,
  isLoading: PropTypes.bool,
  loadingError: PropTypes.string,
  handleInitializeSeasons: PropTypes.func.isRequired,
  handleChangeYear: PropTypes.func.isRequired,
  handleChangeWeek: PropTypes.func.isRequired,
  handleClickOpenTimelineDrawer: PropTypes.func.isRequired,
  handleClickCloseTimelineDrawer: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isTimelineDrawerOpen: makeSelectIsTimelineDrawerOpen(),
  seasons: makeSelectSeasons(),
  year: makeSelectYear(),
  week: makeSelectWeek(),
  standings: makeSelectStandings(),
  isLoading: makeSelectIsLoading(),
  loadingError: makeSelectLoadingError(),
});

function handleInitializeSeasonsCreator(dispatch) {
  return () => {
    dispatch(loadTimePeriods());
  };
}

function handleClickOpenTimelineDrawerCreator(dispatch) {
  return () => {
    dispatch(openTimelineDrawer());
  };
}

function handleClickCloseTimelineDrawerCreator(dispatch) {
  return () => {
    dispatch(closeTimelineDrawer());
  };
}

function handleChangeYearCreator(dispatch) {
  return evt => {
    dispatch(changeYear({ year: parseInt(evt.target.value, 10) }));
    dispatch(loadStandings());
  };
}

function handleChangeWeekCreator(dispatch) {
  return evt => {
    dispatch(changeWeek({ week: parseInt(evt.target.value, 10) }));
    dispatch(loadStandings());
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleInitializeSeasons: handleInitializeSeasonsCreator(dispatch),
    handleClickOpenTimelineDrawer: handleClickOpenTimelineDrawerCreator(
      dispatch,
    ),
    handleClickCloseTimelineDrawer: handleClickCloseTimelineDrawerCreator(
      dispatch,
    ),
    handleChangeYear: handleChangeYearCreator(dispatch),
    handleChangeWeek: handleChangeWeekCreator(dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(StandingsPage);

const columns = [
  {
    key: 'rank',
    text: 'Rank',
    shouldShowHeader: true,
    shouldCenterContent: true,
  },
  {
    key: 'name',
    text: 'Team',
    shouldShowHeader: true,
    shouldCenterContent: false,
  },
  {
    key: 'ownerName',
    text: 'Owner',
    shouldShowHeader: true,
    shouldCenterContent: false,
  },
  {
    key: 'record',
    text: 'Record',
    shouldShowHeader: true,
    shouldCenterContent: true,
  },
  {
    key: 'pointsFor',
    text: 'Points For',
    shouldShowHeader: true,
    shouldCenterContent: true,
  },
  {
    key: 'pointsAgainst',
    text: 'Points Against',
    shouldShowHeader: true,
    shouldCenterContent: true,
  },
];
