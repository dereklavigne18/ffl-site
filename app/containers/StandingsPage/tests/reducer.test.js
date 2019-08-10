import standingsPageReducer, { initialState } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('standingsPageReducer', () => {
  it('returns the initial state', () => {
    const expectedResult = initialState;
    expect(standingsPageReducer(undefined, {})).toEqual(expectedResult);
  });

  /**
   * Example state change comparison
   *
   * it('should handle the someAction action correctly', () => {
   *   const expectedResult = produce(state, draft => {
   *     draft.loading = true;
   *     draft.error = false;
   *     draft.userData.nested = false;
   *   });
   *
   *   expect(appReducer(state, someAction())).toEqual(expectedResult);
   * });
   */
});
