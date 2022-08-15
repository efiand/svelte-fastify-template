export default () => {
	const scrollbarWidth = Math.max(window.innerWidth - document.documentElement.clientWidth, 0);
	return `${scrollbarWidth}px`;
};
