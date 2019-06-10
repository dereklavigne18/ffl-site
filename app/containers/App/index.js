/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Nav from 'components/Nav/Loadable';

import HomePage from 'containers/HomePage/Loadable';
import StandingsPage from 'containers/StandingsPage/Loadable';

import GlobalStyle from '../../global-styles';

export default function App() {
  const routes = [
    {
      to: '/standings',
      title: 'Standings',
    },
    {
      to: '/scoreboard',
      title: 'Scoreboard',
    },
    {
      to: '/login',
      title: 'Log In',
    },
  ];

  return (
    <div>
      <Nav routes={routes} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/standings" component={StandingsPage} />
        <Route component={HomePage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
