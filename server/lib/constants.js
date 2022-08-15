import { config } from 'dotenv';
config();

const DEFAULT_PORT = 4444;
export const {
	AUTH_HASH,
	CWD = process.cwd().replace(/\\/gu, '/'),
	NODE_ENV = 'production',
	PORT = DEFAULT_PORT
} = process.env;
export const isDev = NODE_ENV === 'development';

export const HttpMethod = {
	GET: 'GET',
	POST: 'POST'
};

export const Message = {
	INTERNAL_SERVER_ERROR: 'Произошла ошибка серваре.',
	NOT_FOUND: 'Страница не найдена.'
};

export const StatusCode = {
	INTERNAL_SERVER_ERROR: 500,
	NOT_FOUND: 404
};

export const dataUrlPattern = /\/data(?<query>\??.*)$/u;

export const svgoOptions = {
	multipass: true,
	plugins: [
		...[
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
		].map((name) => ({
			active: true,
			name
		})),
		...['cleanupNumericValues', 'convertPathData', 'convertTransform', 'cleanupListOfValues'].map((name) => ({
			active: true,
			name,
			params: {
				floatPrecision: 2
			}
		}))
	]
};

export const cssnanoOptions = {
	preset: [
		'default',
		{
			cssDeclarationSorter: false,
			discardComments: { removeAll: true }
		}
	]
};

export const terserOptions = {
	format: {
		comments: false
	}
};

export const htmlnanoOptions = {
	collapseWhitespace: 'aggressive',
	minifyCss: cssnanoOptions,
	minifyJs: terserOptions,
	minifySvg: svgoOptions,
	removeComments: 'safe'
};
