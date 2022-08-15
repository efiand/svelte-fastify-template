<script context="module">
	import Modal from './Modal.svelte';

	const OWN_PATTERN = /^\d+\..{3,4}$/u;
</script>

<script>
	export let images = [];
</script>

<ul>
	{#each images as { filename, opened = false }, i}
		{@const src = OWN_PATTERN.test(filename) ? `/images/${filename}` : filename}
		{@const alt = `Изображение ${i + 1}`}

		<li>
			{#if opened}
				<Modal on:close={() => (opened = false)}>
					<img {src} {alt} />
				</Modal>
			{:else}
				<a href={src} on:click|preventDefault={() => (opened = true)}>
					<img class="preview" {src} {alt} />
				</a>
			{/if}
		</li>
	{/each}
</ul>

<style>
	ul {
		display: flex;
		flex-wrap: wrap;
		margin: -0.5rem 0 0 -0.5rem;
	}

	li {
		width: 6rem;
		height: 6rem;
		margin: 0.5rem 0 0 0.5rem;
		background-color: var(--colorLightgray);
		border-radius: 0.25rem;
	}

	a {
		display: block;
	}

	img {
		display: block;
		object-fit: cover;
		border-radius: 1rem;
	}

	.preview {
		width: 6rem;
		height: 6rem;
		border-radius: 0.25rem;
	}
</style>
