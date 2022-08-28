import htmlnanoOptions, { cssnanoOptions, terserOptions } from './htmlnanorc.js';
import CopyPlugin from 'copy-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import CssMqpackerPlugin from 'css-mqpacker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import StylelintPlugin from 'stylelint-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import autoprefixer from 'autoprefixer';
import htmlnano from 'htmlnano';
import path from 'path';
import postcssCalc from 'postcss-calc';
import postcssNested from 'postcss-nested';
import postcssSimpleVars from 'postcss-simple-vars';
import sveltePreprocess from 'svelte-preprocess';
import svgoOptions from './svgo.config.js';

const isSvg = (buffer) => /^<svg|<?xml/u.test(buffer.toString());

const getSprite = (icons) => {
	const xmlns = 'xmlns="http://www.w3.org/2000/svg"';
	const code = `<svg ${xmlns} xmlns:xlink="http://www.w3.org/1999/xlink">
<style>:root&gt;svg{display:none}:root&gt;svg:target{display:block}</style>
${icons.join('\n\n')}
</svg>`;
	return code;
};

const sveltePreprocessOptions = sveltePreprocess({
	postcss: {
		plugins: [
			postcssSimpleVars(),
			postcssNested(),
			postcssCalc({
				precision: 8
			}),
			autoprefixer()
		]
	}
});

const getClientConfig = (name, dev, mode) => ({
	devServer: {
		client: { overlay: { errors: true, warnings: false } },
		devMiddleware: {
			index: false,
			writeToDisk(filePath) {
				return /webp|svg$/u.test(filePath);
			}
		},
		proxy: {
			context: () => true,
			target: 'http://localhost:1993'
		}
	},
	entry: './src/lib/main.js',
	mode,
	module: {
		rules: [
			{
				test: /\.svelte$/u,
				use: {
					loader: 'svelte-loader',
					options: {
						compilerOptions: { dev, hydratable: true },
						emitCss: true,
						hotReload: dev,
						preprocess: sveltePreprocessOptions
					}
				}
			},
			{
				test: /\.css$/u,
				use: [
					MiniCssExtractPlugin.loader,
					{ loader: 'css-loader', options: { url: false } },
					'postcss-loader'
				]
			},
			{
				resolve: { fullySpecified: false },
				test: /node_modules\/svelte\/.*\.mjs$/u
			}
		]
	},
	name,
	optimization: {
		minimize: !dev,
		minimizer: [
			new CssMinimizerPlugin({ minimizerOptions: cssnanoOptions }),
			new CssMqpackerPlugin(),
			new TerserPlugin({ terserOptions }),
			new ImageMinimizerPlugin({
				minimizer: {
					filter: isSvg,
					implementation: ImageMinimizerPlugin.imageminMinify,
					options: { plugins: [['svgo', svgoOptions]] }
				}
			})
		]
	},
	output: {
		filename: 'main.bundle.js',
		path: path.resolve(process.cwd(), './public')
	},
	plugins: [
		new MiniCssExtractPlugin({ filename: '[name].bundle.css' }),
		new ESLintPlugin({ extensions: ['svelte', 'js'] }),
		new StylelintPlugin({ files: ['**/*.{svelte,css}'] }),
		new CopyPlugin({
			patterns: [
				{
					from: '.app/*.{jpg,png,svg}',
					noErrorOnMissing: true,
					to: './images/[name][ext]'
				},
				{
					from: './src/icons/*.svg',
					noErrorOnMissing: true,
					to: './images/sprite.bundle.svg',
					transformAll(icons) {
						return getSprite(
							icons.map(({ data, sourceFilename }) => {
								const target = `<svg id="${path.basename(sourceFilename, '.svg')}"`;
								return data.toString().replace(/^<svg/u, target);
							})
						);
					}
				}
			]
		}),
		new ImageMinimizerPlugin({
			generator: [
				{
					filter: (buffer) => !isSvg(buffer),
					implementation: ImageMinimizerPlugin.squooshGenerate,
					options: {
						encodeOptions: { webp: { quality: 75 } }
					},
					type: 'asset'
				}
			]
		})
	],
	resolve: {
		alias: {
			'@': path.resolve(process.cwd(), 'src'),
			svelte: path.resolve('node_modules', 'svelte')
		},
		extensions: ['.mjs', '.js', '.svelte']
	}
});

const getSsrConfig = (name, dev, mode) => ({
	entry: './src/routes/+layout.svelte',
	experiments: {
		outputModule: true
	},
	mode,
	module: {
		rules: [
			{
				test: /\.svelte$/u,
				use: {
					loader: 'svelte-loader',
					options: {
						compilerOptions: {
							css: false,
							generate: 'ssr',
							hydratable: true
						},
						preprocess: sveltePreprocessOptions
					}
				}
			},
			{
				test: /\.css$/u,
				use: [{ loader: 'css-loader', options: { url: false } }, 'postcss-loader']
			},
			{
				resolve: { fullySpecified: false },
				test: /node_modules\/svelte\/.*\.mjs$/u
			}
		]
	},
	name,
	optimization: {
		minimize: !dev,
		minimizer: [new TerserPlugin({ terserOptions })]
	},
	output: {
		filename: 'ssr.bundle.js',
		library: {
			type: 'module'
		},
		path: path.resolve(process.cwd(), '.app')
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{
					from: './src/app.html',
					info: { minimized: true },
					to: path.resolve(process.cwd(), '.app/layout.js'),
					async transform(buffer) {
						const { html } = await htmlnano.process(buffer.toString(), htmlnanoOptions);
						return `export default \`${html}\``;
					}
				}
			]
		})
	],
	resolve: {
		alias: {
			'@': path.resolve(process.cwd(), 'src'),
			svelte: path.resolve('node_modules', 'svelte')
		},
		extensions: ['.mjs', '.js', '.svelte']
	}
});

const getServerConfig = (name) => ({
	entry: './src/server/main.js',
	mode: 'production',
	name,
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin({ terserOptions })]
	},
	output: {
		filename: 'index.js',
		path: path.resolve(process.cwd(), '.app')
	},
	target: 'node'
});

export default (env, { mode = 'production' }) => {
	const dev = mode === 'development';

	return [
		getClientConfig('client', dev, mode),
		getSsrConfig('ssr', dev, mode),
		getServerConfig('server')
	];
};
