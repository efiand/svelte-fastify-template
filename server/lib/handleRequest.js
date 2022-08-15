import { isDev } from './constants.js';

export default async (request, reply) => {
	let hasAccess = Boolean(request.session.get('hasAccess'));

	if (isDev) {
		hasAccess = true;
		request.session.set('hasAccess', true);
	}

	request.hasAccess = hasAccess;

	if (!hasAccess && ['/edit', '/add', '/admin'].some((it) => request.url.indexOf(it) > -1)) {
		return reply.redirect('/auth');
	}
};
