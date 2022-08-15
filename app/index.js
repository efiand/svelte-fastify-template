import { isDev, PORT as port } from './constants.js';
import routes, { handleErrorPage } from './routes/index.js';
import fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import fs from 'fs';
import { log } from './lib/index.js';
import path from 'path';

const { writeFile } = fs.promises;

const fastifyOptions = {
	logger: {
		file: path.join(process.cwd(), 'logs/app.log'),
		level: isDev ? 'info' : 'warn'
	},
	trustProxy: true
};

const startApp = async () => {
	const app = fastify(fastifyOptions);

	app.register(fastifyStatic, { root: path.join(process.cwd(), 'public') });
	app.setNotFoundHandler(handleErrorPage);

	routes.forEach((route) => app.route(route));

	app.listen({ port });
};

(async () => {
	log.info('Starting server...');
	await startApp();

	if (isDev) {
		// Надежный способ уведомить gulp о том, что сервер перезапустился
		await writeFile(
			'./logs/restart.log',
			`App restarted at ${new Date().toISOString()}`
		);

		log.success(`Server successfully started at http://localhost:${port}`);
	}
})();
