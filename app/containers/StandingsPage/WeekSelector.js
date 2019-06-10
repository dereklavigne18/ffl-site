/**
 * WeekSelector
 */

import React from 'react';
import PropTypes from 'prop-types';

import RangeSlider from 'components/RangeSlider/Loadable';

const MIN = 1;
const MAX = 18;
const STEP = 1;

function WeekSelector({ onChange, defaultValue }) {
  return (
    <div>
      <p>Week</p>
      <RangeSlider
        min={MIN}
        max={MAX}
        defaultValue={defaultValue}
        step={STEP}
        onChange={onChange}
      />
    </div>
  );
}

WeekSelector.propTypes = {
  onChange: PropTypes.func,
  defaultValue: PropTypes.number,
};

export default WeekSelector;
