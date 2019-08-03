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

const SliderLabel = styled.div`
  float: left;
`;

const ActiveSliderLabel = styled(SliderLabel)`
  color: red;
`;

// Need to add value labels and notches and space notches out appropriately

function RangeSlider({
  min,
  max,
  defaultValue,
  step = 1,
  onChange,
  widthPerStep,
}) {
  const pointCount = (max - min) / step;
  const width = widthPerStep * pointCount;
  const labels = [];
  for (let value = min; value <= max; value += step) {
    const sliderLabel =
      value === defaultValue ? (
        <ActiveSliderLabel
          key={value}
          style={{ width: widthPerStep, textAlign: 'center' }}
        >
          {value}
        </ActiveSliderLabel>
      ) : (
        <SliderLabel
          key={value}
          style={{ width: widthPerStep, textAlign: 'center' }}
        >
          {value}
        </SliderLabel>
      );
    labels.push(sliderLabel);
  }

  const marginLeft = widthPerStep / 2;
  return (
    <div>
      <div style={{ marginLeft: `${marginLeft}px`, marginBottom: '5px' }}>
        <StyledSlider
          type="range"
          min={min}
          max={max}
          defaultValue={defaultValue}
          step={step}
          onChange={onChange}
          style={{ width }}
        />
      </div>
      <div>
        <div>{labels}</div>
      </div>
      <br />
    </div>
  );
}

RangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number,
  defaultValue: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  widthPerStep: PropTypes.number,
};

export default memo(RangeSlider);
