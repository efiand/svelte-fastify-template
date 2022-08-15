import { mkdir, stat, writeFile } from 'fs/promises';
import { CWD } from './constants.js';
import { dirname } from 'path';

export default async (file, content) => {
	const fullPath = file.includes(CWD) ? file : `${CWD}/${file}`;
	const dirName = dirname(fullPath);

	try {
		await stat(dirName);
	} catch (err) {
		if (err.code === 'ENOENT') {
			await mkdir(dirName, { recursive: true });
		}
	}

	return await writeFile(fullPath, content);
};
