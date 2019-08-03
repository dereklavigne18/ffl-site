/**
 *
 * Asynchronously loads the component for Floaters
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
