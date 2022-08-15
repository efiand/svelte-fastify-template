import { JS_BUILDABLES, JS_LINTABLES } from './constants.js';
import { build, buildScripts, lintScripts } from './tasks/index.js';
import { PORT } from '../app/constants.js';
import browserSync from 'browser-sync';
import nodemon from 'nodemon';

const devServer = browserSync.create();
let isInit = false;

(async () => {
	await build();

	nodemon({
		ext: 'js',
		script: './app',
		watch: ['app']
	}).on('start', () => {
		if (isInit) {
			return;
		}

		devServer.init({
			cors: true,
			files: [
				{
					match: ['logs/restart.log']
				},
				{
					async fn() {
						await lintScripts();
					},
					match: JS_LINTABLES
				},
				{
					async fn() {
						await Promise.all([lintScripts(JS_BUILDABLES), buildScripts()]);
					},
					match: JS_BUILDABLES
				}
			],
			open: false,
			proxy: `http://localhost:${PORT}`,
			ui: false
		});

		isInit = true;
	});
})();
