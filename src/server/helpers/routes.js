import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { HttpMethod } from '../../lib/constants.js';
import createLayout from './createLayout.js';
import getAntiCashQuery from './getAntiCashQuery.js';

const view = async ({ url }, reply) => {
	const bundle = await import(`../../../.app/ssr.bundle.js${getAntiCashQuery()}`);
	const { render } = bundle.default;
	const { head, html } = render({ url });
	const response = await createLayout({ head, html, props: { url } });

	reply.type('text/html;charset="utf-8"');
	return response;
};

export const notFoundHandler = async (request, reply) => {
	reply.code(StatusCodes.NOT_FOUND);
	reply.log.error(`${StatusCodes.NOT_FOUND} ${request.url} ${ReasonPhrases.NOT_FOUND}`);

	const response = await view(request, reply);
	return response;
};

export default [
	{
		handler: view,
		method: HttpMethod.GET,
		url: '/'
	}
];
