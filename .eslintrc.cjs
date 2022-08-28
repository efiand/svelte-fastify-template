// The use of CJS, not JSON,
// is mandatory for the transfer of a function 'svelte3/ignore-styles'!

const STRING_MAX_LENGTH = 100;

module.exports = {
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	extends: ['eslint:all', 'prettier', 'plugin:markdown/recommended'],
	ignorePatterns: ['**/*.bundle.js'],
	overrides: [
		{
			files: ['postcss.config.cjs'],
			rules: {
				'sort-keys': 'off'
			}
		},
		{
			files: ['*.svelte'],
			processor: 'svelte3/svelte3',
			rules: {
				'prefer-const': 'off'
			}
		},
		{
			files: ['**/*.md'],
			processor: 'markdown/markdown'
		},
		{
			files: '**/*.md/*.js',
			rules: {
				'import/no-unresolved': 'off'
			}
		},
		{
			files: 'src/lib/main.js',
			rules: {
				'no-new': 'off'
			}
		},
		{
			files: 'webpack.config.js',
			rules: {
				'max-lines-per-function': 'off'
			}
		}
	],
	parser: '@babel/eslint-parser',
	parserOptions: {
		ecmaVersion: 2020,
		requireConfigFile: false,
		sourceType: 'module'
	},
	plugins: ['markdown', 'svelte3'],
	root: true,
	rules: {
		'array-element-newline': ['error', 'consistent'],
		'capitalized-comments': [
			'warn',
			'always',
			{
				ignoreConsecutiveComments: true,
				ignoreInlineComments: true
			}
		],
		'dot-location': ['error', 'property'],
		'function-call-argument-newline': ['error', 'consistent'],
		'id-length': [
			'error',
			{
				exceptions: ['i']
			}
		],
		indent: ['error', 'tab'],
		'max-len': ['error', STRING_MAX_LENGTH],
		'multiline-comment-style': ['error', 'separate-lines'],
		'multiline-ternary': ['error', 'never'],
		'no-console': [
			'warn',
			{
				allow: ['error', 'info', 'warn']
			}
		],
		'no-magic-numbers': [
			'error',
			{
				ignore: [-1, 0, 1]
			}
		],
		'no-tabs': [
			'error',
			{
				allowIndentationTabs: true
			}
		],
		'no-ternary': 'off',
		'object-curly-spacing': ['error', 'always'],
		'object-property-newline': [
			'error',
			{
				allowAllPropertiesOnSameLine: true
			}
		],
		'one-var': ['error', 'never'],
		'padded-blocks': ['error', 'never'],
		'quote-props': ['error', 'as-needed'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'space-before-function-paren': [
			'error',
			{
				anonymous: 'always',
				asyncArrow: 'always',
				named: 'never'
			}
		]
	},
	settings: {
		'svelte3/ignore-styles': () => true
	}
};
