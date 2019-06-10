/**
 *
 * StandingsPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import {
  changeYear,
  changeWeek,
  loadStandings,
} from 'containers/StandingsPage/actions';
import reducer from 'containers/StandingsPage/reducer';
import saga from 'containers/StandingsPage/saga';
import {
  makeSelectWeek,
  makeSelectYear,
  makeSelectStandings,
  makeSelectIsLoading,
  makeSelectLoadingError,
} from 'containers/StandingsPage/selectors';

import Card from 'components/Card/Loadable';
import Table from 'components/Table/Loadable';
import WeekSelector from './WeekSelector';
import YearSelector from './YearSelector';

export function StandingsPage({
  year,
  week,
  standings,
  isLoading,
  loadingError,
  onChangeYear,
  onChangeWeek,
}) {
  useInjectReducer({ key: 'standingsPage', reducer });
  useInjectSaga({ key: 'standingsPage', saga });

  return (
    <div>
      <Card title="Timeframe">
        <YearSelector defaultValue={year} onChange={onChangeYear} />
        <WeekSelector defaultValue={week} onChange={onChangeWeek} />
      </Card>
      <div>Week: {week}</div>
      <div>Year: {year}</div>
      <Table rows={standings} columns={columns} />
    </div>
  );
}

StandingsPage.propTypes = {
  year: PropTypes.number.isRequired,
  week: PropTypes.number.isRequired,
  standings: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
  loadingError: PropTypes.string,
  onChangeYear: PropTypes.func.isRequired,
  onChangeWeek: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  year: makeSelectYear(),
  week: makeSelectWeek(),
  standings: makeSelectStandings(),
  isLoading: makeSelectIsLoading(),
  loadingError: makeSelectLoadingError(),
});

function onChangeYearCreator(dispatch) {
  return evt => {
    dispatch(changeYear({ year: parseInt(evt.target.value, 10) }));
    dispatch(loadStandings());
  };
}

function onChangeWeekCreator(dispatch) {
  return evt => {
    dispatch(changeWeek({ week: parseInt(evt.target.value, 10) }));
    dispatch(loadStandings());
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChangeYear: onChangeYearCreator(dispatch),
    onChangeWeek: onChangeWeekCreator(dispatch),
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
  { key: 'rank', shouldShowHeader: false, shouldCenterContent: true },
  { key: 'name', shouldShowHeader: false, shouldCenterContent: false },
  { key: 'record', shouldShowHeader: false, shouldCenterContent: true },
  { key: 'pointsFor', shouldShowHeader: false, shouldCenterContent: true },
  {
    key: 'pointsAgainst',
    shouldShowHeader: false,
    shouldCenterContent: true,
  },
];
