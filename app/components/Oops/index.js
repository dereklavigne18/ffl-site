/**
 *
 * Oops
 *
 */

import React, { memo } from 'react';
import styled from 'styled-components';

const StyledOops = styled.div`
  width: 100%;
  text-align: center;

  & img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    max-height: 300px;
    max-width: 300px;
  }
`;

const imgAlt = 'Football Icon';

function Oops() {
  return (
    <StyledOops>
      <img src="/android-chrome-192x192.png" alt={imgAlt} />
      <h2>Oops! Something went wrong.</h2>
      <h4>Please contact the development team to report this issue.</h4>
    </StyledOops>
  );
}

Oops.propTypes = {};

export default memo(Oops);
