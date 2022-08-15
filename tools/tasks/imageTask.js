import chalk from 'chalk';
import { deleteAsync } from 'del';
import minifySvg from '../../server/lib/minifySvg.js';
import path from 'path';
import processSquoosh from '../../server/lib/processSquoosh.js';
import { readFile } from 'fs/promises';
import writeFileSmart from '../../server/lib/writeFileSmart.js';

const createImage = async (entries, i) => {
	if (i === entries.length) {
		return;
	}

	const entry = entries[i];
	const entryName = path.basename(entry);
	const extName = path.extname(entry);
	const isSvg = extName === '.svg';

	console.info(`>> Optimizing ${chalk.grey(entryName)}...`);

	try {
		const file = await (isSvg ? readFile(entry, 'utf-8') : readFile(entry));
		const result = await (isSvg ? minifySvg(file, true) : processSquoosh(file));
		await writeFileSmart(`public/images/${isSvg ? entryName : `${path.basename(entry, extName)}.webp`}`, result);

		await deleteAsync(entry);

		console.info(`<< ${chalk.grey(entryName)} successfully optimized.`);

		await createImage(entries, i + 1);
	} catch (error) {
		return console.error(error);
	}
};

export default {
	glob: true,
	patterns: '.app/*.{svg,jpg,jpeg,png}',
	async processAll(files) {
		// Sequential processing to prevent pools from gobbling up memory.
		return await createImage(files, 0);
	}
};
