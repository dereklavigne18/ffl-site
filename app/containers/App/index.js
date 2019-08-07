/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import Nav from 'components/Nav/Loadable';

import HomePage from 'containers/HomePage/Loadable';
import StandingsPage from 'containers/StandingsPage/Loadable';
import LoginModal from 'containers/LoginModal/Loadable';

import GlobalStyle from '../../global-styles';

function getOnLoginClickHandler(setShowLogin) {
  return () => {
    setShowLogin(true);
  };
}

function getOnLoginCloseHandler(setShowLogin) {
  return () => {
    setShowLogin(false);
  };
}

export default function App() {
  const [showLogin, setShowLogin] = useState(false);

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

  return (
    <div>
      <Nav
        routes={routes}
        onLoginClick={getOnLoginClickHandler(setShowLogin)}
      />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/standings" component={StandingsPage} />
        <Route component={HomePage} />
      </Switch>
      {showLogin ? (
        <LoginModal onLoginClose={getOnLoginCloseHandler(setShowLogin)} />
      ) : null}
      <GlobalStyle />
    </div>
  );
}
