const params = {
	floatPrecision: 2
};
const simplePlugins = [
	'removeDoctype',
	'removeXMLProcInst',
	'removeEditorsNSData',
	'removeMetadata',
	'removeComments',
	'removeViewBox',
	'removeDesc',
	'removeTitle',
	'removeUselessDefs',
	'removeEmptyAttrs',
	'cleanupIDs'
];
const parametricPlugins = [
	'cleanupNumericValues',
	'convertPathData',
	'convertTransform',
	'cleanupListOfValues'
];

export default {
	multipass: true,
	plugins: [
		...simplePlugins.map((name) => ({
			active: true,
			name
		})),
		...parametricPlugins.map((name) => ({
			active: true,
			name,
			params
		}))
	]
};
