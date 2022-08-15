import { build, buildPages } from './tasks/index.js';

(async () => {
	await build();

	await buildPages();
})();
