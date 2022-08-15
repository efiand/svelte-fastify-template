import { validateHtml } from 'pineglade-w3c';

export default async (content, sourceName) => {
	const output = await validateHtml({
		forceOffline: true,
		htmlCode: content,
		sourceName
	});

	if (output) {
		const error = output.trim();
		console.error(error);
		return error;
	}

	return null;
};
