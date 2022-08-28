<script>
	import '@/app.css';
	import { Route, Router } from 'svelte-routing';
	import ErrorPage from '@/routes/+error.svelte';
	import IndexPage from '@/routes/+page.svelte';
	import { onMount } from 'svelte';

	export let url = '/';
	export let greet = '';

	const magic = 1000;

	onMount(() => {
		setTimeout(() => {
			greet = 'XXXXX';
		}, magic);
	});
</script>

<svelte:head>
	<title>Проект</title>
</svelte:head>

<Router {url}>
	{greet}
	<main>
		<p />
		<Route path="/">
			<IndexPage />
		</Route>
		<Route path="*">
			<ErrorPage />
		</Route>
	</main>
</Router>

<style>
	main {
		& p {
			margin: 3px;
		}
	}
</style>
