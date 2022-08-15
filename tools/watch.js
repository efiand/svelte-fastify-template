import { PORT } from '../server/lib/constants.js';
import browserSync from 'browser-sync';
import ensureArray from '../server/lib/ensureArray.js';
import eslintTask from './tasks/eslintTask.js';
import imageTask from './tasks/imageTask.js';
import markdownlintTask from './tasks/markdownlintTask.js';
import nodemon from 'nodemon';
import rollup from 'rollup/dist/rollup.js';
import rollupOptions from '../rollup.config.js';
import runTask from './lib/runTask.js';
import spriteTask from './tasks/spriteTask.js';
import stylelintTask from './tasks/stylelintTask.js';

let started = false;

const server = browserSync.create();

const browserSyncOptions = {
	cors: true,
	files: [
		'.app/restart.log',
		...[eslintTask, imageTask, markdownlintTask, spriteTask, stylelintTask].map((task) => ({
			async fn() {
				await runTask(task);
			},
			match: task.patterns
		}))
	],
	open: false,
	proxy: `http://localhost:${PORT}`,
	ui: false
};

(async () => {
	console.info('Bundle...');
	await Promise.all(
		rollupOptions.map(async (config) => {
			const bundle = await rollup.rollup(config);
			return await Promise.all(ensureArray(config.output).map(bundle.write));
		})
	);

	rollup.watch(rollupOptions).on('event', ({ code, error, result }) => {
		if (error) {
			return console.error(error);
		}

		if (result) {
			result.close();
		}

		if (started) {
			return;
		}

		if (code === 'END') {
			nodemon({ watch: ['server', '.app'] }).on('start', () => {
				if (started) {
					return;
				}

				server.init(browserSyncOptions);
				started = true;
			});
		}
	});
})();
