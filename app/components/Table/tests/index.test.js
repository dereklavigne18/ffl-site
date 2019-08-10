/**
 *
 * Tests for Table
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import Table from '../index';

describe('<Table />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<Table columns={columns} rows={rows} />);
    expect(spy).not.toHaveBeenCalled();
  });

  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it.skip('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<Table />);
    expect(firstChild).toMatchSnapshot();
  });
});

const rows = [
  {
    text: 'hello',
  },
  {
    text: 'world',
  },
];

const columns = [
  {
    key: 'text',
    text: 'Text',
  },
];
