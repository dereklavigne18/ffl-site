/**
 * YearSelector
 */

import React from 'react';
import PropTypes from 'prop-types';

import RangeSlider from 'components/RangeSlider/Loadable';

const MIN = 2016;
const MAX = 2019; // Current year
const STEP = 1;

function YearSelector({ onChange, defaultValue }) {
  return (
    <div>
      <p>Year</p>
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

YearSelector.propTypes = {
  onChange: PropTypes.func,
  defaultValue: PropTypes.number,
}

export default YearSelector;
