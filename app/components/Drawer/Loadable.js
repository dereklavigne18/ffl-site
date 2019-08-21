/**
 *
 * Asynchronously loads the component for Drawer
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
