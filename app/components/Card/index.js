/**
 *
 * Card
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledCard = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  border: 2px solid white;
  border-radius: 5px;

  margin: 2px 0px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  
  overflow: auto;

  & h3 {
    margin-top 5px;
  }
`;

function Card({ title, ...props }) {
  return (
    <StyledCard>
      {title && <h3>{title}</h3>}
      {props.children}
    </StyledCard>
  );
}

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default memo(Card);
