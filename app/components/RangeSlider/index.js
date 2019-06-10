/**
 *
 * RangeSlider
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledSlider = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 5px;
  background: #ffffff;
  outline: none;

  & ::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 10px;
    height: 20px;
    border-radius: 15%;
    background: red;
    cursor: pointer;
  }

  & ::-moz-range-thumb {
    width: 10px;
    height: 20px;
    border-radius: 15%;
    background: red;
    cursor: pointer;
  }
`;

// Need to add value labels and notches and space notches out appropriately

function RangeSlider({ min, max, defaultValue, step = 1, onChange }) {
  return (
    <div>
      <StyledSlider
        type="range"
        min={min}
        max={max}
        defaultValue={defaultValue}
        step={step}
        onChange={onChange}
      />
    </div>
  );
}

RangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number,
  defaultValue: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};

export default memo(RangeSlider);
