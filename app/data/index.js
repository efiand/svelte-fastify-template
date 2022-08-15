import getGlobalData from './global.js';

const USEFUL_ORIGIN = 2;

export const getDataHandler =
	(payload) =>
	(url = '/') => ({
		...getGlobalData(),
		...payload,
		root: url
			.split('/')
			.slice(USEFUL_ORIGIN)
			.reduce((str) => `${str}../`, ''),
		url
	});

export default {
	main: getDataHandler({
		title: 'Главная страница'
	}),
	notFound: getDataHandler({
		title: 'Страница не найдена'
	})
};
