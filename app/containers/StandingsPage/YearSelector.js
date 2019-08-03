/**
 * YearSelector
 */

import React from 'react';
import PropTypes from 'prop-types';

import Option from '../../components/Select/Option';
import Select from '../../components/Select';

const MIN = 2016;
const MAX = 2019; // Current year
const STEP = 1;

function YearSelector({ onChange, defaultValue }) {
  // return (
  //   <div>
  //     <RangeSlider
  //       min={MIN}
  //       max={MAX}
  //       defaultValue={defaultValue}
  //       step={STEP}
  //       onChange={onChange}
  //       widthPerStep={80}
  //     />
  //   </div>
  // );

  const options = [];
  for (let value = MIN; value <= MAX; value += STEP) {
    options.push(
      <Option key={value} value={value}>
        {value.toString()}
      </Option>,
    );
  }

  return (
    <div>
      <Select label="Year" onChange={onChange} defaultValue={defaultValue}>
        {options}
      </Select>
    </div>
  );
}

YearSelector.propTypes = {
  onChange: PropTypes.func,
  defaultValue: PropTypes.number,
};

export default YearSelector;
