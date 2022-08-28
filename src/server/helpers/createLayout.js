import layout from '../../../.app/layout.js';

export default (data) =>
	layout.replace(/\s*\/>/gu, '>').replace(/\{(?<key>.+?)\}/gu, (all, key) => {
		const param = data[key];
		return typeof param === 'object' ? JSON.stringify(param) : param;
	});
