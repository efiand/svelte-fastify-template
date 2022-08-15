import { AUTH_HASH, HttpMethod } from '../lib/constants.js';
import { compare } from 'bcrypt';

const AUTH_DATA = {
	title: 'Вход для администрирования'
};

export default [
	{
		handler: async (request, reply) => await reply.view(AUTH_DATA),
		method: HttpMethod.GET,
		url: '/auth'
	},
	{
		handler: (request, reply) => reply.json(AUTH_DATA),
		method: HttpMethod.GET,
		url: '/auth/data'
	},
	{
		handler: async (request, reply) => {
			// Администратор один, ключ проверки зашит в .env
			const compared = await compare(request.body.password.value, AUTH_HASH);
			request.session.set('hasAccess', compared);
			request.hasAccess = compared;

			return reply.json({
				error: compared ? null : 'Неверный пароль'
			});
		},
		method: HttpMethod.POST,
		url: '/auth/data'
	},
	{
		handler: async (request, reply) => {
			if (request.hasAccess) {
				await request.session.destroy();
			}
			return reply.redirect('/');
		},
		method: HttpMethod.GET,
		url: '/auth/exit'
	}
];
