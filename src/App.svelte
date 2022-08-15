<script context="module">
	import './main.css';
	import { Route, Router } from 'svelte-routing';
	import Error from './pages/Error.svelte';
	import Index from './pages/Index.svelte';
	import Page from './components/Page.svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { data } from './lib/stores.js';
	import { noteFailure } from './lib/toast.js';
	import { onMount } from 'svelte';
</script>

<script>
	export let props = {};

	data.set(props);

	onMount(() => {
		if (props.w3cError) {
			noteFailure(props.w3cError);
		}
	});

	let routes = {
		'/': Index,
		'*': Error
	};
</script>

<main>
	<Router url={$data.url}>
		{#each Object.entries(routes) as [path, Component]}
			<Route {path} component={Page} {Component} />
		{/each}
	</Router>
</main>

{#if typeof window !== 'undefined'}
	<SvelteToast />
{/if}

<style>
	main {
		padding: 2rem;

		@media $tablet {
			padding: 2rem 3rem 4rem;
		}

		@media $desktop {
			padding: 3rem 5rem 6rem;
		}
	}
</style>
