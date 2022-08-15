export default (str = '') => {
	if (/<p/u.test(str)) {
		// Строка уже отформатирована
		return str;
	}

	str = `<p>${str.replace(/\r?\n\s*/gu, '</p><p>')}</p>`;
	str = str.replace(/<p><\/p>/gu, '');

	return str;
};
