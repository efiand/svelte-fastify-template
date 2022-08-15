<script>
	import { Route, Router } from 'svelte-routing';
	import ErrorPage from './pages/ErrorPage.svelte';
	import IndexPage from './pages/IndexPage.svelte';
	import PageFooter from './components/PageFooter.svelte';
	import PageHeader from './components/PageHeader.svelte';

	export let url = '';
	export let projectName = '';
	export let title = '';

	let projectTitle = '';

	$: {
		projectTitle = [projectName, title].filter(Boolean).join(' : ');
	}
</script>

<svelte:head>
	<title>{projectTitle}</title>
</svelte:head>

<Router {url}>
	<PageHeader className="page__header" />

	<main class="page__main">
		<Route path="/"><IndexPage {projectName} /></Route>
		<Route path="*"><ErrorPage /></Route>
	</main>

	<PageFooter className="page__footer" />
</Router>
