import eslintTask from './tasks/eslintTask.js';
import lintspacesTask from './tasks/lintspacesTask.js';
import markdownlintTask from './tasks/markdownlintTask.js';
import runTask from './lib/runTask.js';
import stylelintTask from './tasks/stylelintTask.js';

console.info('Linting all files...');
Promise.all([eslintTask, lintspacesTask, markdownlintTask, stylelintTask].map(runTask));
