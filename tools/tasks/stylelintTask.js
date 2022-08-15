import { isDev } from '../../server/lib/constants.js';
import stylelint from 'stylelint';

export default {
	patterns: 'src/**/*.{css,svelte}',
	async processAll(files) {
		const { errored, output } = await stylelint.lint({
			allowEmptyInput: true,
			files,
			formatter: 'string'
		});

		if (errored) {
			console.error(output.trim());
			process.exitCode = Number(!isDev);
		}
	}
};
