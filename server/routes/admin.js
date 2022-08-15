import { HttpMethod } from '../lib/constants.js';

const ADMIN_DATA = {
	title: 'Панель управления'
};

export default [
	{
		handler: async (request, reply) => await reply.view(ADMIN_DATA),
		method: HttpMethod.GET,
		url: '/admin'
	},
	{
		handler: (request, reply) => reply.json(ADMIN_DATA),
		method: HttpMethod.GET,
		url: '/admin/data'
	}
];
