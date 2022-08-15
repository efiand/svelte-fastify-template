<script>
	export let action = '',
		disabled = false,
		method = '',
		validable = false;

	let formElement = null;

	const submitHandler = (evt) => {
		evt.preventDefault();

		disabled = true;

		if (formElement.checkValidity()) {
			formElement.submit();
		}

		validable = true;
		disabled = false;
	};
</script>

<form class="form {validable && 'form--validable'}" {action} {method} bind:this={formElement}>
	<button class="form__submit" type="submit" {disabled} on:click={submitHandler}>Send</button>
</form>
