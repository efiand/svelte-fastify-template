import { JS_BUILDABLES, JS_LINTABLES } from './constants.js';
import { buildPages, lintScripts } from './tasks/index.js';

const JS_ALL_LINTABLES = [...JS_BUILDABLES, ...JS_LINTABLES];

(async () => {
	await Promise.all([lintScripts(JS_ALL_LINTABLES), buildPages(true)]);
})();
