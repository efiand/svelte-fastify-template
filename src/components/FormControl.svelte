<script context="module">
	import Option from './Option.svelte';
	import RequiredSign from './RequiredSign.svelte';
	import Upload from './Upload.svelte';
	import Wysiwyg from './Wysiwyg.svelte';
	import { nanoid } from 'nanoid/non-secure';
</script>

<script>
	export let datalist = [],
		disabledId = 0,
		errorText = '',
		images = null,
		label = '',
		low = false,
		min = null,
		name = null,
		one = false,
		required = false,
		rows = null,
		selectedId = 0,
		size = 1,
		type = 'text',
		validable = false,
		value = null,
		wysiwyg = false;

	let id = images ? null : nanoid();
	let multiple = size > 1;

	if (typeof min === 'number') {
		type = 'number';
	}
	if (required && !errorText) {
		errorText = 'Обязательно для заполнения.';
	}

	const adaptRows = () => {
		rows = value.split('\n').length;
	};
	if (rows && typeof value === 'string') {
		adaptRows();
	}
</script>

<div>
	<svelte:element this={id ? 'label' : 'p'} class="label" for={id}>
		{label}
		{#if required}
			<RequiredSign />
		{/if}
	</svelte:element>

	{#if datalist.length}
		<select class="field" class:validable {id} {name} {size} {multiple} {required}>
			{#if !multiple}
				<Option />
			{/if}

			{#each datalist as item}
				<Option {...item} {disabledId} selectedId={multiple ? item.selectedId : selectedId} />
			{/each}
		</select>
	{:else if rows}
		<textarea class="field" class:validable {id} {name} {required} {rows} bind:value on:input={adaptRows} />
	{:else if wysiwyg}
		<Wysiwyg {name} {value} {required} on:change={({ detail }) => (value = detail)} />
		<input class="visuallyHidden" class:validable {id} {name} type="text" {required} bind:value />
	{:else if images}
		<Upload {name} {images} />
	{:else}
		<input class="field" class:low class:validable {id} {name} {type} {required} {value} />
	{/if}

	{#if errorText}
		<span class="error" class:one>{errorText}</span>
	{/if}
</div>

<style>
	div {
		position: relative;
		display: grid;
		gap: 0.25em;
		margin: 0;
	}

	.label {
		font-size: 0.85rem;
		color: var(--colorDarkgray);
	}

	.field {
		box-sizing: border-box;
		width: 100%;
		padding: 0.5rem;
		overflow-y: auto;
		-webkit-text-fill-color: currentColor;
		background-color: transparent;
		border: 1px solid var(--colorLightgray);
		border-radius: 0.125rem;
		outline: none;
		box-shadow: none;
		appearance: none;

		@media $tablet {
			min-height: 44px;
		}

		&:focus {
			border-color: var(--colorGray);
		}

		&:disabled {
			opacity: 0.3;
		}

		&::placeholder {
			color: inherit;
			opacity: 0.3;
		}

		&[type='number'] {
			appearance: textfield;

			&::-webkit-outer-spin-button,
			&::-webkit-inner-spin-button {
				appearance: none;
			}
		}

		&::-webkit-search-decoration,
		&::-webkit-search-cancel-button,
		&::-webkit-search-results-button,
		&::-webkit-search-results-decoration {
			display: none;
		}

		&:-webkit-autofill {
			box-shadow: none;
		}
	}

	textarea {
		overflow: auto;
		resize: vertical;
	}

	select {
		cursor: pointer;
	}

	.validable:invalid {
		color: var(--colorRed);
		border-color: currentColor;

		& ~ .error {
			display: block;
		}
	}

	.low {
		height: 43px;
	}

	.error {
		display: none;
		font-size: 0.85rem;
		color: var(--colorRed);

		&.one {
			@media $tablet {
				position: absolute;
				top: calc(100% + 0.25rem);
			}
		}
	}
</style>
