import { deleteAsync } from 'del';
import { log } from '../../app/lib/index.js';

const DEFAULT = ['**/*.bundle.js', 'public/**/*.html'];

export default async (config = DEFAULT) => {
	log.info('Start deleting bundles...');

	try {
		await deleteAsync(config);
		log.success('Bundles successfully deleted');
	} catch (err) {
		log.error(err);
	}
};
