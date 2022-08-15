import chalk from 'chalk';

const { error, info, warn } = console;
const { blue, green, red, yellow } = chalk;

export default {
	error(message) {
		process.exitCode = 1;
		error(red(message));
	},
	info(message) {
		info(blue(message));
	},
	success(message) {
		info(green(message));
	},
	warn(message) {
		warn(yellow(message));
	}
};
