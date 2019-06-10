/**
 * TR (tr tag)
 */

import React from 'react';
import PropTypes from 'prop-types';

function buildCell({ content, column, key }) {
  let textAlign = 'left';
  if (column.shouldCenterContent) {
    textAlign = 'center';
  }

  const styles = {
    textAlign,
  };

  return (
    <td style={styles} key={key}>
      {content}
    </td>
  );
}

buildCell.propTypes = {
  content: PropTypes.string,
  column: PropTypes.object.isRequired,
  key: PropTypes.number.isRequired,
};

function TR({ data, columns }) {
  const cells = columns.map((column, index) =>
    buildCell({ column, content: data[column.key], key: index }),
  );

  return <tr>{cells}</tr>;
}

TR.propTypes = {
  data: PropTypes.object.isRequired,
  columns: PropTypes.array,
};

export default TR;
