import cssnano from 'cssnano';
import { cssnanoOptions } from '../../server/lib/constants.js';
import mqpacker from 'postcss-sort-media-queries';
import postcss from 'postcss';

const postcssProcessor = postcss().use(mqpacker).use(cssnano(cssnanoOptions));

export default {
	dest: '',
	patterns: 'public/bundle.css',
	async processOneContent(from, cssBundle) {
		const { css } = await postcssProcessor.process(cssBundle, {
			from,
			map: false
		});
		return css;
	}
};
