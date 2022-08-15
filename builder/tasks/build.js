import { buildScripts, del, lintScripts } from './index.js';

export default async () => {
	await Promise.all([del(), lintScripts()]);

	await Promise.all([buildScripts()]);
};
