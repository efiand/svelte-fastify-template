import config from '../../webpack.config.js';
import { log } from '../../app/lib/index.js';
import webpack from 'webpack';

export default () =>
	new Promise((resolve, reject) => {
		log.info('Start building scripts...');

		webpack(config, (err, stats) => {
			if (err) {
				log.error(err.stack || err);

				if (err.details) {
					log.error(err.details);
				}

				reject(err.details);
			}

			const info = stats.toJson();

			if (stats.hasErrors()) {
				log.error(info.errors);
			}

			if (stats.hasWarnings()) {
				log.warn(info.warnings);
			}

			log.success('Scripts successfully builded');
			resolve();
		});
	});
