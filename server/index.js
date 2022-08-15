import { AUTH_HASH, CWD, PORT, StatusCode, dataUrlPattern, isDev } from './lib/constants.js';
import createErrorHandler from './lib/createErrorHandler.js';
import createView from './lib/createView.js';
import fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';
import fastifyMultipart from '@fastify/multipart';
import fastifySession from '@mgcrea/fastify-session';
import fastifyStatic from '@fastify/static';
import handleRequest from './lib/handleRequest.js';
import routes from './routes/index.js';
import writeFileSmart from './lib/writeFileSmart.js';

const logFile = `${CWD}/.app/server.log`;

(async () => {
	await writeFileSmart(logFile, '');

	const server = fastify({
		logger: {
			file: logFile,
			level: isDev ? 'info' : 'warn'
		},
		trustProxy: true
	});

	server.register(fastifyMultipart, { attachFieldsToBody: true });
	server.register(fastifyCookie);
	server.register(fastifySession, {
		cookie: {
			httpOnly: true,
			maxAge: 9e6,
			sameSite: 'Strict',
			secure: !isDev
		},
		secret: AUTH_HASH
	});
	server.register(fastifyStatic, { root: `${CWD}/public` });

	server.setErrorHandler(
		async (error, request, reply) => await createErrorHandler(error.statusCode, error)(request, reply)
	);
	server.setNotFoundHandler(createErrorHandler(StatusCode.NOT_FOUND));

	server.decorateRequest('hasAccess', false);
	server.addHook('onRequest', handleRequest);

	server.decorateReply('view', createView);
	server.decorateReply('json', function createJsonReply(props) {
		const { hasAccess, url } = this.request; // eslint-disable-line
		return {
			...props,
			hasAccess,
			isDev,
			url: url.replace(dataUrlPattern, '$<query>') || '/'
		};
	});

	routes.forEach((route) => server.route(route));

	server.listen({ port: PORT });

	if (isDev) {
		// For watching by browsersync
		await writeFileSmart('.app/restart.log', '');
		console.info(`Server is now listening on http://localhost:${PORT}`);
	}
})();
