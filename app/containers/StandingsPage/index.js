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
  // makeSelectLoadingError,
} from 'containers/StandingsPage/selectors';

import Card from 'components/Card/Loadable';
import { FloatLeft } from 'components/Floaters';
import Table from 'components/Table/Loadable';
import Spinner from 'components/Spinner/Loadable';
import WeekSelector from './WeekSelector';
import YearSelector from './YearSelector';

const SelectorContainer = styled(FloatLeft)`
  margin-right: 15px;
`;

export function StandingsPage({
  year,
  week,
  standings,
  onChangeYear,
  onChangeWeek,
  isLoading,
  // loadingError,
}) {
  useInjectReducer({ key: 'standingsPage', reducer });
  useInjectSaga({ key: 'standingsPage', saga });

  // On initial render, set the current year, so we load the year's data
  useEffect(() => {
    if (standings.length === 0) {
      const evt = {
        target: { value: 2018 },
      };
      onChangeYear(evt);
    }
  }, []);

  return (
    <div>
      <Card title="Timeframe">
        <SelectorContainer>
          <YearSelector defaultValue={year} onChange={onChangeYear} />
        </SelectorContainer>
        <SelectorContainer>
          <WeekSelector defaultValue={week} onChange={onChangeWeek} />
        </SelectorContainer>
      </Card>
      {isLoading ? <Spinner /> : <Table rows={standings} columns={columns} />}
    </div>
  );
}

StandingsPage.propTypes = {
  year: PropTypes.number.isRequired,
  week: PropTypes.number.isRequired,
  standings: PropTypes.array,
  isLoading: PropTypes.bool,
  // loadingError: PropTypes.string,
  onChangeYear: PropTypes.func.isRequired,
  onChangeWeek: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  year: makeSelectYear(),
  week: makeSelectWeek(),
  standings: makeSelectStandings(),
  isLoading: makeSelectIsLoading(),
  // loadingError: makeSelectLoadingError(),
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
