/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { memo } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Nav from 'components/Nav/Loadable';

import HomePage from 'containers/HomePage/Loadable';
import StandingsPage from 'containers/StandingsPage/Loadable';
import ScoreboardPage from 'containers/ScoreboardPage/Loadable';
import LoginModal from 'containers/LoginModal/Loadable';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import {
  closeLoginModal,
  openLoginModal,
  logoutUser,
} from 'containers/App/actions';
import reducer from 'containers/App/reducer';
import saga from 'containers/App/saga';
import {
  makeSelectIsLoginModalOpen,
  makeSelectUser,
} from 'containers/App/selectors';

import GlobalStyle from '../../global-styles';

const AppContent = styled.div`
  margin-top: 49px;
`;

export function App({
  user,
  isLoginModalOpen,
  onOpenLoginModal,
  onCloseLoginModal,
  onClickLogout,
}) {
  useInjectReducer({ key: 'app', reducer });
  useInjectSaga({ key: 'app', saga });

  return (
    <div>
      <Nav
        routes={routes}
        onClickLogin={onOpenLoginModal}
        onClickLogout={onClickLogout}
        user={user}
      />
      <AppContent>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/standings" component={StandingsPage} />
          <Route exact path="/scoreboard" component={ScoreboardPage} />
          <Route component={HomePage} />
        </Switch>
        {isLoginModalOpen ? (
          <LoginModal onLoginClose={onCloseLoginModal} />
        ) : null}
        <GlobalStyle />
      </AppContent>
    </div>
  );
}

App.propTypes = {
  user: PropTypes.object,
  isLoginModalOpen: PropTypes.bool.isRequired,
  onOpenLoginModal: PropTypes.func.isRequired,
  onCloseLoginModal: PropTypes.func.isRequired,
  onClickLogout: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isLoginModalOpen: makeSelectIsLoginModalOpen(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    onOpenLoginModal: () => dispatch(openLoginModal()),
    onCloseLoginModal: () => dispatch(closeLoginModal()),
    onClickLogout: () => dispatch(logoutUser()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(App);

const routes = [
  {
    to: '/standings',
    title: 'Standings',
  },
  {
    to: '/scoreboard',
    title: 'Scoreboard',
  },
];
