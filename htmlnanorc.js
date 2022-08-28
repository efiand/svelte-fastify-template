import minifySvg from './svgo.config.js';

export const cssnanoOptions = {
	preset: ['default', { cssDeclarationSorter: false, discardComments: { removeAll: true } }]
};

export const terserOptions = {
	format: {
		comments: false
	}
};

export default {
	collapseWhitespace: 'aggressive',
	minifyCss: cssnanoOptions,
	minifyJs: terserOptions,
	minifySvg,
	removeComments: 'safe'
};
