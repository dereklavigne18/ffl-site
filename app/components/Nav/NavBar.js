/**
 * NavBar
 */

import styled from 'styled-components';

const NavBar = styled.nav`
  margin: 0;
  padding: 0;
  overflow: hidden;

  background-color: lightgray;
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 1px,
    rgba(255, 255, 255, 0.8) 1px,
    rgba(255, 255, 255, 0.9) 10px
  );
`;

export default NavBar;
