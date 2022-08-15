import { htmlnanoOptions, isDev } from './constants.js';
import htmlnano from 'htmlnano';
import ssrBundle from '../../.app/bundle.js';
import validateHtml from './validateHtml.js';

const HEAD = `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="HandheldFriendly" content="True">
<meta name="format-detection" content="telephone=no">
<link href="/bundle.css" rel="stylesheet">
<link href="/fonts/roboto.woff2" rel="preload" as="font" crossorigin="anonymous">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#00796b">
<meta name="msapplication-TileColor" content="#ffffff">
<meta name="theme-color" content="#ffffff">
<script src="/bundle.js" defer></script>`;

const createLayout = ({ data, head, html }) => `
<!DOCTYPE html>
<html lang="ru">
	<head>
		${HEAD}
		${head}
	</head>
	<body>
		${html}
		<script>window.data = ${JSON.stringify(data)}</script>
	</body>
</html>`;

export default async function view(props) {
	const { hasAccess, url } = this.request; // eslint-disable-line
	const data = {
		props: {
			...props,
			hasAccess,
			isDev,
			url
		}
	};

	const { head, html } = ssrBundle.render(data);
	const layout = createLayout({ data, head, html });

	this.header('Content-Type', 'text/html;charset="utf-8"'); // eslint-disable-line

	if (isDev) {
		const w3cError = await validateHtml(layout, url);

		if (w3cError) {
			return createLayout({ data: { props: { ...data.props, w3cError } }, head, html });
		}

		return layout;
	}

	const minifiedLayout = (await htmlnano.process(layout, htmlnanoOptions)).html;
	return minifiedLayout;
}
