import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { HttpMethod } from '../constants.js';
import { createHtml } from '../lib/index.js';
import getData from '../data/index.js';

const NOT_FOUND_URL = '/404.html';
const HTML_TYPE = 'text/html;charset="utf-8"';

const handleMainPage = async ({ url }, reply) => {
	const html = await createHtml(getData.main(url));
	return reply.type(HTML_TYPE).send(html);
};

export const handleErrorPage = async ({ url }, reply) => {
	if (url !== NOT_FOUND_URL) {
		reply.code(StatusCodes.NOT_FOUND);
		reply.log.error(
			`${StatusCodes.NOT_FOUND} ${url} ${ReasonPhrases.NOT_FOUND}`
		);
	}

	const html = await createHtml(getData.notFound(url));
	return reply.type(HTML_TYPE).send(html);
};

export default [
	{
		alias: 'main',
		handler: handleMainPage,
		method: HttpMethod.GET,
		url: '/'
	},
	{
		alias: 'notFound',
		handler: handleErrorPage,
		method: HttpMethod.GET,
		url: NOT_FOUND_URL
	}
];
