/**
 *
 * ScoreboardPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import Drawer from 'components/Drawer/Loadable';

import { openSettingsDrawer, closeSettingsDrawer } from './actions';
import { makeSelectIsSettingsDrawerOpen } from './selectors';
import reducer from './reducer';
import saga from './saga';

export function ScoreboardPage({
  isSettingsDrawerOpen,
  handleOpenSettingsDrawer,
  handleCloseSettingsDrawer,
}) {
  useInjectReducer({ key: 'scoreboardPage', reducer });
  useInjectSaga({ key: 'scoreboardPage', saga });

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
      </Drawer>
    </div>
  );
}

ScoreboardPage.propTypes = {
  isSettingsDrawerOpen: PropTypes.bool.isRequired,
  handleOpenSettingsDrawer: PropTypes.func.isRequired,
  handleCloseSettingsDrawer: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isSettingsDrawerOpen: makeSelectIsSettingsDrawerOpen(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleOpenSettingsDrawer: () => dispatch(openSettingsDrawer()),
    handleCloseSettingsDrawer: () => dispatch(closeSettingsDrawer()),
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
