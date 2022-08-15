import { optimize } from 'svgo';
import { svgoOptions } from './constants.js';

export default (svg, pretty = false) => {
	const options = { ...svgoOptions };
	if (pretty) {
		options.js2svg = {
			indent: '\t',
			pretty
		};
	}

	return optimize(svg, options).data;
};
