import { isDev } from '../../server/lib/constants.js';
import logLinterResults from '../lib/logLinterResults.js';
import markdownlint from 'markdownlint';

const config = {
	default: true,
	'line-length': false
};

export default {
	patterns: ['*.md', '{public,server,src,tools}/**/*.md'],
	processAll(fileNames) {
		markdownlint({ config, fileNames }, (info, errorData) => {
			Object.entries(errorData).forEach(([file, errors]) => {
				if (errors.length) {
					errorData[file] = errors
						.map((error) => ({
							code: error.ruleDescription,
							line: error.lineNumber,
							message: error.errorDetail,
							type: 'error'
						}))
						.sort((errA, errB) => errA.line - errB.line);
				} else {
					delete errorData[file];
				}
			});

			if (Object.keys(errorData).length) {
				logLinterResults(errorData);
				process.exitCode = Number(!isDev);
			}
		});
	}
};
