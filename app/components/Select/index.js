/**
 *
 * Select
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Option from './Option';

const StyledLabel = styled.label`
  font-size: 12px;
  padding-right: 15px;
  display: block;
`;

const SelectBox = styled.div`
  border-bottom: 1px solid white;
  margin-right: 10px;
  font-size: 20px;
`;

const StyledSelect = styled.select`
  display: block;
  background-color: transparent;
  cursor: pointer;
  color: white;
  border: none;
`;

function Select({ label, defaultValue, onChange, ...props }) {
  return (
    <SelectBox>
      {label ? <StyledLabel>{label}</StyledLabel> : null}
      <StyledSelect defaultValue={defaultValue} onChange={onChange}>
        {props.children}
      </StyledSelect>
    </SelectBox>
  );
}

Select.propTypes = {
  label: PropTypes.string,
  defaultValue: PropTypes.any,
  onChange: PropTypes.func,
  children: (props, propName, componentName) => {
    const prop = props[propName];

    let error = null;
    React.Children.forEach(prop, child => {
      if (child.type !== Option) {
        error = new Error(
          `\`${componentName}\` children should be of type \`Option\`.`,
        );
      }
    });
    return error;
  },
};

export default memo(Select);
