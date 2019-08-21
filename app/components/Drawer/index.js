/**
 *
 * Drawer
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ClosedToggleTab = styled.div`
  position: fixed;
`;

const OpenedToggleTab = styled(ClosedToggleTab)`
  left: 40%;
`;

const ToggleButton = styled.button`
  background-color: #1f2021;
  color: red;
  font-size: 50px;

  margin-top: 50px;
  margin-left: -3px;

  border-color: red;
  border-width: 3px;
  border-radius: 5%;

  & :hover {
    cursor: pointer;
  }
`;

const StyledDrawer = styled.div`
  position: fixed;
  z-index: 1;

  height: 100%;
  width: 40%;
  min-width: 200px;
  overflow-x: hidden;

  background-color: #38393b;
  border-right: 3px solid red;

  padding: 10px;
`;

function Drawer({ isOpen, handleCloseDrawer, handleOpenDrawer, ...props }) {
  if (isOpen) {
    return (
      <div>
        <StyledDrawer>{props.children}</StyledDrawer>
        <OpenedToggleTab>
          <ToggleButton onClick={handleCloseDrawer}>
            <i className="fa fa-chevron-left" />
          </ToggleButton>
        </OpenedToggleTab>
      </div>
    );
  }

  return (
    <div>
      <ClosedToggleTab>
        <ToggleButton onClick={handleOpenDrawer}>
          <i className="fa fa-chevron-right" />
        </ToggleButton>
      </ClosedToggleTab>
    </div>
  );
}

Drawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleCloseDrawer: PropTypes.func.isRequired,
  handleOpenDrawer: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default memo(Drawer);
