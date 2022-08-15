import { CWD } from '../../server/lib/constants.js';
import chalk from 'chalk';
import ensureArray from '../../server/lib/ensureArray.js';
import { globby } from 'globby';
import { readFile } from 'fs/promises';
import writeFileSmart from '../../server/lib/writeFileSmart.js';

const getContent = async (fileName) => await readFile(`${CWD}/${fileName}`, 'utf-8');

const writeContent = async (result, dest) => {
	if (result && dest) {
		await writeFileSmart(dest, result);
		console.info(`File ${chalk.grey(dest)} was successfully written.`);
	}
};

export default async ({
	dest,
	glob = false,
	patterns = null,
	processAll,
	processAllContent,
	processOne,
	processOneContent
}) => {
	const fileNames = glob ? await globby(patterns) : ensureArray(patterns);
	if (!fileNames.length) {
		return;
	}

	if (typeof processOne === 'function') {
		return await Promise.all(fileNames.map(processOne));
	}

	if (typeof processAll === 'function') {
		return await processAll(fileNames);
	}

	if (typeof processOneContent === 'function') {
		return await Promise.all(
			fileNames.map(async (fileName) => {
				const content = await getContent(fileName);
				const result = await processOneContent(fileName, content);
				if (typeof dest !== 'string') {
					return;
				}
				return await writeContent(result, `${dest}${dest ? '/' : ''}${fileName}`);
			})
		);
	}

	if (typeof processAllContent === 'function') {
		const contents = await Promise.all(fileNames.map(getContent));

		const result = await processAllContent(fileNames, contents);
		await writeContent(result, dest);
	}
};
