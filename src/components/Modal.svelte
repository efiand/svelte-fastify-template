<script context="module">
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import getScrollbarWidth from '../lib/getScrollbarWidth.js';

	const FOCUSABLES = [
		'a[href]',
		'button:not(:disabled)',
		'input:not(:disabled)',
		'textarea:not(:disabled)',
		'select:not(:disabled)',
		'[tabindex]:not([tabindex^="-"])'
	].join(', ');
</script>

<script>
	let focusables = [];
	let modalElement = null;
	let initialRootOverflow = 'auto';
	let firstFocusable = null;

	const dispatch = createEventDispatcher();

	const close = () => dispatch('close');

	const handleKeyClose = (event) => {
		if (event.key.startsWith('Esc')) {
			event.preventDefault();
			close();
		}
	};

	const handleFocus = () => {
		if (document.activeElement.closest('.modal') !== modalElement) {
			firstFocusable.focus();
		}
	};

	onMount(() => {
		[firstFocusable] = modalElement.querySelectorAll(FOCUSABLES);
		initialRootOverflow = document.documentElement.style.overflow;

		document.documentElement.style.setProperty('--rightOffset', getScrollbarWidth());
		document.documentElement.style.overflow = 'hidden';

		focusables = document.querySelectorAll(FOCUSABLES);
		focusables.forEach((focusableElement) => {
			focusableElement.addEventListener('focus', handleFocus);
		});
	});

	onDestroy(() => {
		document.documentElement.style.setProperty('--rightOffset', 0);
		document.documentElement.style.overflow = initialRootOverflow;

		focusables.forEach((focusableElement) => {
			focusableElement.removeEventListener('focus', handleFocus);
		});
	});
</script>

<svelte:window on:keydown={handleKeyClose} />

<div class="modal" transition:fade bind:this={modalElement} on:click|self={close}>
	<div class="inner">
		<slot />
	</div>

	<button type="button" on:click={close}>
		<span class="visuallyHidden">Закрыть окно.</span>
	</button>
</div>

<style>
	.modal {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1;
		display: flex;
		overflow-y: scroll;
		background-color: rgba(0, 0, 0, 0.87);

		@media $tablet {
			padding: 2.25rem;
		}
	}

	.inner {
		margin: auto;
	}

	button {
		position: absolute;
		top: 1rem;
		right: 1rem;
		width: 2rem;
		height: 2rem;
		padding: 0.5rem;
		background-color: var(--colorLightgray);
		border-radius: 50%;

		&::before,
		&::after {
			content: '';
			position: absolute;
			top: 1.375rem;
			right: 0.5rem;
			left: 0.5rem;
			height: 0.25rem;
			background-color: var(--colorDarkgray);
			transition: inherit;
		}

		&::before {
			transform: rotate(45deg);
		}

		&::after {
			transform: rotate(-45deg);
		}

		&:hover,
		&:focus {
			&::before,
			&::after {
				background-color: var(--colorGreen);
			}
		}
	}
</style>
