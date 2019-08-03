/**
 *
 * Option
 *
 */

import React, { memo } from 'react';

import PropTypes from 'prop-types';

function Option({ value, ...props }) {
  return <option value={value}>{props.children}</option>;
}

Option.propTypes = {
  value: PropTypes.any.isRequired,
  children: PropTypes.string.isRequired,
};

export default memo(Option);
