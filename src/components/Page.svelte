<script context="module">
	import Error from '../pages/Error.svelte';
	import Heading from './Heading.svelte';
	import Preloader from './Preloader.svelte';
	import { beforeUpdate } from 'svelte';
	import { data } from '../lib/stores.js';

	const TITLE_LIMIT = 48;
	let firstMounted = false;

	const getTitle = (title) => {
		if (title.length > TITLE_LIMIT) {
			const [, result] = title.match(/^(?<title>.{1,47})\s/u);
			return `${result}…`;
		}
		return title;
	};
</script>

<script>
	export let Component = null,
		location = {};

	let preload = false;

	beforeUpdate(async () => {
		if (!firstMounted && $data.error) {
			Component = Error;
			firstMounted = true;
			return;
		}

		if ($data.url !== location.pathname) {
			preload = true;

			let props = {};
			try {
				props = await (await fetch(`${location.pathname.replace(/\/$/u, '')}/data`)).json();
			} catch (error) {
				props.error = error;
			}

			data.set(props);
			if (props.error) {
				Component = Error;
			}

			preload = false;
		}

		firstMounted = true;
	});
</script>

<svelte:head>
	<title>Project &gt; {getTitle($data.title)}</title>
</svelte:head>

{#if preload}
	<Preloader />
{:else}
	<Heading>{$data.title}</Heading>
	<svelte:component this={Component} {...$data} />
{/if}
