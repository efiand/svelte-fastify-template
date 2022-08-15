import { ESLint } from 'eslint';
import { isDev } from '../../server/lib/constants.js';

const eslint = new ESLint();

export default {
	patterns: ['.*.{cjs,js}', '*.{cjs,js,md}', '{server,tools}/**/*.{js,md}', 'src/**/*.{js,md,svelte}'],
	async processAll(fileNames) {
		const results = await eslint.lintFiles(fileNames);
		const formatter = await eslint.loadFormatter('stylish');

		if (results.filter(({ messages }) => messages.length).length) {
			console.error(formatter.format(results));
			process.exitCode = Number(!isDev);
		}
	}
};
