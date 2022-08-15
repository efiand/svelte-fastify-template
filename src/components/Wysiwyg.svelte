<script context="module">
	import { createEventDispatcher, onMount } from 'svelte';
	import { createRichTextEditor, toHTML, toggleMark } from 'prosemirror-svelte/state';
	import { getCurrentMarks, getNodeTypeAtSelectionHead } from 'prosemirror-svelte/helpers';
	import Button from './Button.svelte';
	import ProsemirrorEditor from 'prosemirror-svelte';
</script>

<script>
	export let value = '';

	let currentMarks = null;
	let editorState = null;
	let isBold = false;
	let isItalic = false;
	let nodeAtSelectionHead = {};

	const dispatch = createEventDispatcher();

	const postprocess = (html) =>
		html
			.trim()
			.replace(/ (?<attr>style|class)=".*?"/gisu, '')
			.replace(/<span>(?<content>.*?)<\/span>/gisu, '$<content>')
			.replace(/<div>(?<content>.*?)<\/div>/gisu, '<p>$<content></p>')
			.replace(/<br><\/p>/gisu, '</p><p></p>')
			.replace(/(?<space> | |&nbsp;)<\/p>/gisu, '</p>'); // eslint-disable-line

	const emitChanges = () => {
		const html = postprocess(toHTML(editorState));
		dispatch('change', html === '<p></p>' ? '' : html);
	};

	const transformText = () => {
		const html = postprocess(toHTML(editorState))
			.replace(/(?<space> | |&nbsp;)<\/p>/gisu, '</p>') // eslint-disable-line
			// Кавычки
			.replace(/"(?<content>[^"]*)"/gsu, '«$<content>»')
			.replace(/=«(?<content>.*?)»/gsu, '="$<content>"') // eslint-disable-line
			// Длинное тире вместо дефиса или короткого тире
			.replace(/(?<space> | )(?<dash>-|–)/gu, ' —') // eslint-disable-line
			.replace(/(?<dash>-|–)(?<space> | )/gu, '— ') // eslint-disable-line
			// Многоточие
			.replace(/\.{3}/gu, '…')
			// Лишний пробел перед некоторой пунктуацией
			.replace(/ (?<punct>…|,|;|:|!|\?)/gu, '$<punct> ')
			.replace(/ (?<punct>\.(?!\.))/gu, '$<punct> ')
			// Лишние пробелы
			.replace(/ {2,}/gu, ' ')
			.replace(/\( /gu, '(')
			.replace(/ \)/gu, ')')
			.trim();
		dispatch('change', html === '<p></p>' ? '' : html);
		editorState = createRichTextEditor(html);
	};

	const toggleBold = () => {
		editorState = toggleMark(editorState, 'strong');
		emitChanges();
	};

	const toggleItalic = () => {
		editorState = toggleMark(editorState, 'em');
		emitChanges();
	};

	const transactionHandler = ({ detail }) => {
		editorState = detail.editorState;
		emitChanges();
	};

	onMount(() => {
		editorState = createRichTextEditor(value);
	});

	$: if (editorState) {
		currentMarks = getCurrentMarks(editorState);
		nodeAtSelectionHead = getNodeTypeAtSelectionHead(editorState);
		isBold = currentMarks && currentMarks.activeMarks && currentMarks.activeMarks.strong;
		isItalic = currentMarks && currentMarks.activeMarks && currentMarks.activeMarks.em;
	}
</script>

{#if editorState}
	<div class="panel">
		<button
			class:active={isBold}
			type="button"
			aria-label="Жирный"
			style="--icon: url('/images/bundle.svg#bold');"
			on:click={toggleBold}
		/>
		<button
			class:active={isItalic}
			type="button"
			aria-label="Курсив"
			style="--icon: url('/images/bundle.svg#italic');"
			on:click={toggleItalic}
		/>

		<div class="rightSide">
			<Button secondary on:click={transformText}>Типограф</Button>
		</div>
	</div>

	<ProsemirrorEditor {editorState} on:transaction={transactionHandler} />
{/if}

<style>
	:global(.ProseMirror) {
		padding: 0.5rem;
		border: 1px solid var(--colorLightgray);
		border-radius: 0.125rem;
		outline: none;
		transition: border-color 0.3s ease-in-out;

		&:focus-visible {
			border-color: var(--colorGray);
			outline: none;
		}
	}

	.panel {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}

	.rightSide {
		margin-left: auto;
	}

	button {
		position: relative;
		box-sizing: border-box;
		width: 2rem;
		height: 2rem;
		margin-right: 0.25rem;
		background-color: transparent;
		cursor: pointer;

		&.active {
			background-color: var(--colorLightgray);
			cursor: default;
		}

		&::before {
			content: '';
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			background-color: var(--colorBlacky);
			mask-image: var(--icon);
		}

		&:hover::before {
			background-color: var(--colorGreen);
		}
	}
</style>
