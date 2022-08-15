<script>
	import { links } from 'svelte-routing';

	export let className = '';
</script>

<header class="page-header {className}" use:links>
	<a class="pahe-header__Link" href="/fake">Go to</a>
</header>
