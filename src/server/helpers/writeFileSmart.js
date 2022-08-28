import { mkdir, stat, writeFile } from 'fs/promises';
import { dirname } from 'path';
import getFilePath from './getFilePath.js';

export default async (file, content) => {
	const fullPath = getFilePath(file);
	const dirName = dirname(fullPath);

	try {
		await stat(dirName);
	} catch (err) {
		if (err.code === 'ENOENT') {
			await mkdir(dirName, { recursive: true });
		}
	}

	await writeFile(fullPath, content);
};
