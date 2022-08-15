<script>
	export let children = [],
		disabledId = 0,
		id = '',
		padding = '',
		selectedId = 0,
		title = 'Не выбрано';

	let disabled = id === disabledId;
	let selected = id === selectedId;
</script>

<option value={id} {disabled} {selected}>
	{padding}{title}
</option>

{#if children && children.length}
	{#each children as child}
		<svelte:self {...child} {disabledId} {selectedId} padding="   {padding}" />
	{/each}
{/if}

<style>
	option {
		color: var(--colorBlacky);

		&:disabled {
			color: rgba(0, 0, 0, 0.5);
		}
	}
</style>
