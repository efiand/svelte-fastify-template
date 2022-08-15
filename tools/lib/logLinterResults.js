import chalk from 'chalk';

const { bold, dim, red, underline, yellow } = chalk;

export default (errorData) => {
	const results = Object.entries(errorData);
	if (!results.length) {
		return;
	}

	let errCounter = 0;
	let warnCounter = 0;

	results.forEach(([file, errors]) => {
		console.error(underline(file));

		errors.forEach(({ code, line, message, type }) => {
			if (type === 'error') {
				type = red(type);
				errCounter++;
			} else {
				type = yellow(type);
				warnCounter++;
			}

			console.error([`  ${dim(line)}`, type, message, dim(code.toLowerCase())].join('  '));
		});
	});

	const totalCounter = errCounter + warnCounter;
	const plural = totalCounter === 1 ? '' : 's';
	const colorMethod = errCounter ? red : yellow;

	console.error(
		bold(colorMethod(`\n✖ ${totalCounter} problem${plural} (${errCounter} errors, ${warnCounter} warnings)\n`))
	);
};
