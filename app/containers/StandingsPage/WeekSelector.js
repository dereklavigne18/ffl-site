/**
 * WeekSelector
 */

import React from 'react';
import PropTypes from 'prop-types';

// import RangeSlider from 'components/RangeSlider/Loadable';
import Select from '../../components/Select';
import Option from '../../components/Select/Option';

const MIN = 1;
const MAX = 18;
const STEP = 1;

function WeekSelector({ onChange, defaultValue }) {
  // return (
  //   <div>
  //     <RangeSlider
  //       min={MIN}
  //       max={MAX}
  //       defaultValue={defaultValue}
  //       step={STEP}
  //       widthPerStep={30}
  //       onChange={onChange}
  //     />
  //   </div>
  // );
  const options = [];
  for (let value = MIN; value <= MAX; value += STEP) {
    options.push(
      <Option key={value} value={value} isSelected={value === defaultValue}>
        {value.toString()}
      </Option>,
    );
  }

  return (
    <div>
      <Select label="Week" onChange={onChange}>
        {options}
      </Select>
    </div>
  );
}

WeekSelector.propTypes = {
  onChange: PropTypes.func,
  defaultValue: PropTypes.number,
};

export default WeekSelector;
