import { HttpMethod } from '../lib/constants.js';

const getData = () => {
	const data = { title: 'Содержание' };

	// Use model here

	return data;
};

export default [
	{
		handler: async (request, reply) => await reply.view(getData()),
		method: HttpMethod.GET,
		url: '/'
	},
	{
		handler: (request, reply) => reply.json(getData()),
		method: HttpMethod.GET,
		url: '/data'
	}
];
