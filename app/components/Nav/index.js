/**
 * Nav
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { NavLink } from 'react-router-dom';

import NavBar from './NavBar';
import NavItem from './NavItem';

const HomeNavItem = styled(NavItem)`
  float: left;
  padding-top: 5px;
  padding-bottom: 0px;
  padding-left: 30px;

  & a {
    font-size: 28px;
    font-family: 'Lobster', cursive;
    color: red;
  }
`;

const Nav = ({ routes, onClickLogin, onClickLogout, user }) => {
  let navItems = [];
  if (routes) {
    // Reverse operates in place, so to avoid reversing the render order every time I'll just clone
    // the routes ahead of time.
    navItems = [...routes].reverse().map(route => (
      <NavItem key={route.title}>
        <NavLink to={route.to}>{route.title}</NavLink>
      </NavItem>
    ));
  }

  if (user) {
    navItems.unshift(
      <NavItem key="logout">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/interactive-supports-focus */}
        <a role="button" onClick={onClickLogout} onKeyUp={onClickLogout}>
          Log Out
        </a>
      </NavItem>,
    );
  } else {
    navItems.unshift(
      <NavItem key="login">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/interactive-supports-focus */}
        <a role="button" onClick={onClickLogin} onKeyUp={onClickLogin}>
          Log In
        </a>
      </NavItem>,
    );
  }

  navItems.unshift(
    <HomeNavItem key="home">
      <NavLink to="/">fancy football</NavLink>
    </HomeNavItem>,
  );

  return <NavBar>{navItems}</NavBar>;
};

Nav.propTypes = {
  routes: PropTypes.array.isRequired,
  onClickLogin: PropTypes.func.isRequired,
  onClickLogout: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default Nav;
