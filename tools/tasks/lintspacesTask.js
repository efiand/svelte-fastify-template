import Validator from 'lintspaces';
import { isDev } from '../../server/lib/constants.js';
import logLinterResults from '../lib/logLinterResults.js';

export default {
	glob: true,
	patterns: [
		'.*',
		'*.{cjs,js,json,md}',
		'{public, server,src,tools}/**/*.{css,js,md,svelte,svg,txt}',
		'!**/*bundle*',
		'!**/*.{jpg,png,webp,woff2}'
	],
	processAll(fileNames) {
		const validator = new Validator({ editorconfig: '.editorconfig' });
		fileNames.forEach((fileName) => validator.validate(fileName));

		const result = validator.getInvalidFiles();
		const resultEntries = Object.entries(result);

		if (resultEntries.length) {
			resultEntries.forEach(([fileName, errors]) => {
				result[fileName] = Object.values(errors).flat();
			});

			logLinterResults(result);
			process.exitCode = Number(!isDev);
		}
	}
};
