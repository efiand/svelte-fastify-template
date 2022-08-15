import App from './App.svelte';

new App({
	hydrate: true,
	props: window.data || {},
	target: document.body
});
