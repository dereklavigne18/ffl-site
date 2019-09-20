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

import { makeSelectSeasons } from 'containers/App/selectors';

import Drawer from 'components/Drawer/Loadable';
import Oops from 'components/Oops/Loadable';
import Spinner from 'components/Spinner/Loadable';
import Table from 'components/Table/Loadable';
import TimePeriodSettings from 'components/TimePeriodSettings/Loadable';

import {
  makeSelectIsTimelineDrawerOpen,
  makeSelectWeek,
  makeSelectYear,
  makeSelectStandings,
  makeSelectIsLoading,
  makeSelectLoadingError,
} from './selectors';
import saga from './saga';
import {
  openTimelineDrawer,
  closeTimelineDrawer,
  changeYear,
  changeWeek,
  loadStandings,
} from './actions';
import reducer from './reducer';

const TimePeriodInputWrapper = styled.div`
  & div {
    display: inline-block;
  }
`;

export function StandingsPage({
  isTimelineDrawerOpen,
  seasons,
  year,
  week,
  standings,
  isLoading,
  loadingError,
  handleLoadStandings,
  handleChangeYear,
  handleChangeWeek,
  handleClickOpenTimelineDrawer,
  handleClickCloseTimelineDrawer,
}) {
  useInjectReducer({ key: 'standingsPage', reducer });
  useInjectSaga({ key: 'standingsPage', saga });

  // On initial render, get and set the current time period
  useEffect(() => {
    if (standings.length === 0 && !loadingError) {
      handleLoadStandings();
    }
  }, []);

  let content = <Table rows={standings} columns={columns} />;
  if (isLoading) {
    content = <Spinner />;
  } else if (loadingError) {
    content = <Oops />;
  }

  return (
    <div>
      <div>
        <Drawer
          isOpen={isTimelineDrawerOpen}
          handleOpenDrawer={handleClickOpenTimelineDrawer}
          handleCloseDrawer={handleClickCloseTimelineDrawer}
        >
          <h3>
            Set the season and week you would like to view the standings for.
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
      </div>
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
  handleLoadStandings: PropTypes.func.isRequired,
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

function mapDispatchToProps(dispatch) {
  return {
    handleLoadStandings: () => dispatch(loadStandings()),
    handleClickOpenTimelineDrawer: () => dispatch(openTimelineDrawer()),
    handleClickCloseTimelineDrawer: () => dispatch(closeTimelineDrawer()),
    handleChangeYear: evt => {
      dispatch(changeYear({ year: parseInt(evt.target.value, 10) }));
      dispatch(loadStandings());
    },
    handleChangeWeek: evt => {
      dispatch(changeWeek({ week: parseInt(evt.target.value, 10) }));
      dispatch(loadStandings());
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
