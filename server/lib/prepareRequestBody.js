const NUMBER_PATTERN = /^\d+$/u;

export default (body) =>
	Object.fromEntries(
		Object.keys(body)
			.map((key) => {
				const { value = null } = body[key];
				if (key === 'parentId' && !value) {
					return [key, null];
				}
				if (NUMBER_PATTERN.test(value)) {
					return [key, parseInt(value, 10)];
				}
				if (typeof value === 'string') {
					return [key, value === null ? null : value.trim()];
				}
				return value || value === 0 ? [key, value] : null;
			})
			.filter((item) => item)
	);
