/**
 *
 * Asynchronously loads the component for Oops
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
