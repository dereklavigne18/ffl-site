/**
 *
 * Spinner
 *
 */

import React, { memo } from 'react';
import styled from 'styled-components';

const StyledSpinner = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 100px;
  font-size: 100px;
  color: red;
`;

function Spinner() {
  return (
    <StyledSpinner className="loader center">
      <i className="fa fa-spinner fa-spin" />
    </StyledSpinner>
  );
}

Spinner.propTypes = {};

export default memo(Spinner);
