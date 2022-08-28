import { CWD, isDev, PORT as port } from './constants.js';
import routes, { notFoundHandler } from './helpers/routes.js';
import fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import { resolve } from 'path';

const server = fastify({
	logger: {
		file: resolve(CWD, '.app/server.log'),
		level: isDev ? 'info' : 'warn'
	},
	trustProxy: true
});

server.register(fastifyStatic, { root: resolve(CWD, 'public') });
server.setNotFoundHandler(notFoundHandler);

routes.forEach((route) => server.route(route));

server.listen({ port });
