import { createHtml, log } from '../../app/lib/index.js';
import { __dirname } from '../../app/constants.js';
import fs from 'fs';
import getData from '../../app/data/index.js';
import routes from '../../app/routes/index.js';

const { writeFile } = fs.promises;

export default async (testOnly = false) => {
	log.info(`Start ${testOnly ? 'testing' : 'building'} pages...`);

	const promises = routes.map(async ({ alias, url }) => {
		const data = getData[alias](url);

		if (url === '/') {
			url += 'index.html';
		} else if (!url.includes('.')) {
			url += '/index.html';
			data.root += '../';
		}

		try {
			const html = (/\.html$/).test(url) ? await createHtml(data) : data;

			if (testOnly) {
				return;
			}

			return await writeFile(`${__dirname}/public${url}`, html);
		} catch (err) {
			log.error(err);
		}
	});

	try {
		await Promise.all(promises);

		log.success(`Pages successfully ${testOnly ? 'tested' : 'builded'}`);
	} catch (err) {
		log.error(err);
	}
};
