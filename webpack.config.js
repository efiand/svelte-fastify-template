import { __dirname, isDev, NODE_ENV as mode } from './app/constants.js';
import { resolve } from 'path';

const createConfig = (generate = 'dom') => {
	return {
		mode,
		module: {
			rules: [
				{
					test: /\.svelte$/,
					use: {
						loader: 'svelte-loader',
						options: {
							compilerOptions: {
								css: false,
								dev: isDev,
								generate,
								hydratable: true
							}
						}
					}
				},
				{
					resolve: {
						fullySpecified: false
					},
					test: /node_modules\/svelte\/.*\.mjs$/
				}
			]
		},
		optimization: {
			minimize: !isDev
		},
		resolve: {
			alias: {
				'@': resolve(__dirname, 'src'),
				svelte: resolve('node_modules', 'svelte')
			}
		}
	};
};

export default [
	{
		...createConfig(),
		entry: './src/main.js',
		output: {
			filename: 'main.bundle.js',
			path: resolve(__dirname, 'public/scripts')
		}
	},
	{
		...createConfig('ssr'),
		entry: './src/App.svelte',
		experiments: {
			outputModule: true
		},
		output: {
			filename: 'ssr.bundle.js',
			library: {
				type: 'module'
			},
			path: resolve(__dirname, 'app')
		}
	}
];
