import App from '@/routes/+layout.svelte';

new App({
	hydrate: true,
	props: window.props,
	target: document.body
});
