import { CWD, isDev, terserOptions } from './server/lib/constants.js';
import { Breakpoint } from './src/lib/constants.js';
import autoprefixer from 'autoprefixer';
import commonjs from '@rollup/plugin-commonjs';
import mqpacker from 'postcss-sort-media-queries';
import postcss from 'rollup-plugin-postcss';
import postcssMixins from 'postcss-mixins';
import postcssNested from 'postcss-nested';
import postcssVars from 'postcss-simple-vars';
import resolve from '@rollup/plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import { terser } from 'rollup-plugin-terser';

const onwarn = (message, warn) => {
	if (message.toString().toLowerCase().includes('prosemirror')) {
		return;
	}

	warn(message);
};

const postcssPlugins = [
	postcssMixins({
		mixins: {}
	}),
	postcssVars({
		variables: {
			desktop: `(min-width: ${Breakpoint.DESKTOP}px)`,
			tablet: `(min-width: ${Breakpoint.TABLET}px)`
		}
	}),
	postcssNested(),
	autoprefixer(),
	mqpacker()
];

export default [
	// Server bundle
	{
		input: 'src/App.svelte',
		onwarn,
		output: {
			exports: 'default',
			file: '.app/bundle.js',
			format: 'esm',
			name: 'app',
			sourcemap: false
		},
		plugins: [
			svelte({
				compilerOptions: {
					generate: 'ssr'
				},
				preprocess: sveltePreprocess({
					postcss: {
						plugins: postcssPlugins
					}
				})
			}),
			postcss({
				extract: false,
				plugins: postcssPlugins
			}),
			resolve(),
			commonjs(),
			!isDev && terser(terserOptions)
		],
		watch: {
			clearScreen: false
		}
	},

	// Browser bundle
	{
		input: 'src/main.js',
		onwarn,
		output: {
			file: 'public/bundle.js',
			format: 'iife',
			name: 'app'
		},
		plugins: [
			svelte({
				compilerOptions: {
					dev: !isDev,
					hydratable: true
				},
				preprocess: sveltePreprocess({
					postcss: {
						plugins: postcssPlugins
					}
				})
			}),
			postcss({
				extract: `${CWD}/public/bundle.css`,
				plugins: postcssPlugins
			}),
			resolve({
				browser: true,
				dedupe: ['svelte']
			}),
			commonjs(),
			!isDev && terser(terserOptions)
		],
		watch: {
			clearScreen: false
		}
	}
];
