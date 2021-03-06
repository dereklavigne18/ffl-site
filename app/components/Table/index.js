/**
 *
 * Table
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TH from './TH';
import TR from './TR';

const StyledTable = styled.table`
  width: 100%;

  color: white;
  background-color: #1f2021;

  & tr {
    border-bottom: 1px solid #686868;
  }
  & tr:nth-child(even) {
    background-color: rgba(255, 255, 255, 0.08);
  }
  & tr:hover {
    background-color: #7b7b7b;
  }

  & th {
    padding: 5px 10px;

    & :first-child {
      padding-left: 40px;
    }
  }

  & td {
    padding: 0.75rem;

    & :first-child {
      padding-left: 40px;
    }
  }
`;

function Table({ columns, rows }) {
  let headerCells = null;
  if (columns && rows.length > 0) {
    headerCells = columns
      .filter(column => column.shouldShowHeader)
      .map(column => <TH key={column.text}>{column.text}</TH>);
  }

  const rowElements = rows.map((row, index) => (
    /* eslint-disable-next-line react/no-array-index-key */
    <TR data={row} columns={columns} key={index} />
  ));

  return (
    <StyledTable>
      <tbody>
        {headerCells && <tr>{headerCells}</tr>}
        {rowElements}
      </tbody>
    </StyledTable>
  );
}

Table.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array.isRequired,
};

export default memo(Table);
