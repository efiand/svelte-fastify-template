import { Message, StatusCode, dataUrlPattern, isDev } from './constants.js';

export default (statusCode, error) => {
	if (!statusCode) {
		statusCode = StatusCode.INTERNAL_SERVER_ERROR;
	}

	if (statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
		if (!error || !isDev) {
			error = Message.INTERNAL_SERVER_ERROR;
		} else {
			error = error.stack || error.message || error;
		}
	} else if (statusCode === StatusCode.NOT_FOUND) {
		error = error || Message.NOT_FOUND;
	}

	return async (request, reply) => {
		const { url } = request;

		reply.code(statusCode);
		reply.log.error(`${statusCode} ${url}`);

		const props = { error, title: `Ошибка ${statusCode}` };

		if (dataUrlPattern.test(url)) {
			return reply.json(props);
		}

		return reply.send(await reply.view(props));
	};
};
