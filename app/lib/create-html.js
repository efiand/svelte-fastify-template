import log from './log.js';

const fonts = [];

export default async (data) => {
	let ssrBundle = {
		render: () => ({})
	};
	try {
		ssrBundle = await import('../ssr.bundle.js').then((res) => res.default);
	} catch (err) {
		log.error(err);
	}

	const { head = '', html = '' } = ssrBundle.render(data);

	return `<!DOCTYPE html>
	<html lang="ru">
		<head>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			${head}
			<link href="${data.root}styles/main.bundle.css" rel="stylesheet">
			${fonts.reduce((str, font) => {
				return `${str}<link rel="preload" href="${data.root}fonts/${font}" as="font" crossorigin="anonymous">`;
			}, '')}
			<script src="${data.root}scripts/main.bundle.js" defer></script>
		</head>
		<body class="page">${html}</body>
	</html>`;
};
