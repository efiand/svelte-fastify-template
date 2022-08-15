<script context="module">
	import Button from './Button.svelte';
	import FormControl from './FormControl.svelte';
	import { createEventDispatcher } from 'svelte';
</script>

<script>
	export let action = null,
		enctype = 'multipart/form-data',
		fields = [],
		method = 'get',
		novalidate = true,
		resetable = false,
		submitText = 'Отправить',
		validable = false;

	let formElement = null;
	let one = fields.length === 1;

	const dispatch = createEventDispatcher();

	const submitHandler = () => {
		if (!formElement.checkValidity()) {
			validable = true;
			dispatch('invalid');

			// Фокусируемся на первом невалидном поле
			formElement.querySelector(':invalid').focus();
			return;
		}

		dispatch('submit', { action, body: new FormData(formElement) });
		if (resetable) {
			formElement.reset();
			validable = false;
		}
	};
</script>

<form
	class:one
	{action}
	{method}
	{enctype}
	{novalidate}
	bind:this={formElement}
	on:submit|preventDefault={submitHandler}
>
	{#each fields as field}
		<FormControl {...field} {validable} {one} />
	{/each}

	<p class="submit">
		<Button type="submit">{submitText}</Button>
	</p>
</form>

<style>
	form {
		display: grid;
		gap: 2rem;
	}

	.submit {
		display: grid;
		align-self: center;
		min-height: 44px;
		margin: 0;
	}

	.one {
		@media $tablet {
			grid-template-columns: 1fr min-content;
			gap: 0.5rem;

			& .submit {
				align-self: end;
			}
		}
	}
</style>
