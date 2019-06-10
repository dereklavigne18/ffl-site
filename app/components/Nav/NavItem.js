/**
 * NavItem
 */

import styled from 'styled-components';

const NavItem = styled.div`
  float: right;

  display: block;
  padding: 15px 15px;

  text-align: center;

  & a {
    color: black;
    text-decoration: none;
    font-weight: bold;
    font-family: georgia;
  }

  &:hover {
    & a {
      color: red;
    }
  }
`;

export default NavItem;
