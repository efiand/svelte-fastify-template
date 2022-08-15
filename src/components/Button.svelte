<script context="module">
	import { link } from 'svelte-routing';
</script>

<script>
	export let href = null,
		secondary = false,
		to = null,
		type = 'button';
</script>

{#if href}
	<a class="button" class:secondary {href}><slot /></a>
{:else if to}
	<a class="button" class:secondary href={to} use:link><slot /></a>
{:else}
	<button class="button" class:secondary {type} on:click><slot /></button>
{/if}

<style>
	.button {
		box-sizing: border-box;
		margin: 0 auto;
		padding: 0.5rem 1.5rem;
		text-decoration: none;
		text-align: center;
		color: var(--colorWhite);
		background-color: var(--colorGreen);
		border-radius: 0.25rem;

		&:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}
	}

	.secondary {
		background-color: var(--colorBlacky);
	}

	.button,
	.secondary {
		&:hover,
		&:active {
			background-color: var(--colorDarkgray);
		}
	}
</style>
