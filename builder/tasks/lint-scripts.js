import { ESLint } from 'eslint';
import { JS_LINTABLES } from '../constants.js';
import { log } from '../../app/lib/index.js';

const eslint = new ESLint();

export default async (scripts = JS_LINTABLES) => {
	log.info('Start linting scripts...');
	try {
		const results = await eslint.lintFiles(scripts);
		const formatter = await eslint.loadFormatter('stylish');

		if (results.filter(({ messages }) => messages.length).length) {
			console.warn(formatter.format(results));
		} else {
			log.success('Scripts successfully linted');
		}
	} catch (err) {
		log.error(err);
	}
};
