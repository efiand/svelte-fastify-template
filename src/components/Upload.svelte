<script context="module">
	import Gallery from './Gallery.svelte';

	const Format = {
		jpeg: 'image/jpeg',
		jpg: 'image/jpeg',
		png: 'image/png',
		svg: 'image/svg+xml'
	};
</script>

<script>
	export let allowedExtensions = ['jpg', 'jpeg', 'png', 'svg'],
		images = [],
		multiple = true,
		name = null;

	let accept = Array.from(new Set(allowedExtensions.map((format) => Format[format]).filter(Boolean))).join();
	let inputElement = null;
	let previousImages = [...images];

	const changeHandler = () => {
		const uploadedImages = [];
		for (const file of inputElement.files) {
			const fileExt = file.name.split('.').pop();
			if (allowedExtensions.some((ext) => ext === fileExt)) {
				uploadedImages.push({ filename: URL.createObjectURL(file) });
			}
		}

		images = [...uploadedImages, ...previousImages];
	};
</script>

<div>
	<label>
		<span class="visuallyHidden">Выбрать.</span>
		<input
			class="visuallyHidden"
			{name}
			type="file"
			{multiple}
			{accept}
			bind:this={inputElement}
			on:change={changeHandler}
		/>
	</label>

	<Gallery {images} />
</div>

<style>
	div {
		display: flex;
	}

	label {
		position: relative;
		display: block;
		flex-shrink: 0;
		width: 6rem;
		height: 6rem;
		margin-right: 0.5rem;
		background-color: var(--colorLightergray);
		border-radius: 0.25rem;
		transition: background-color 0.3s ease-in-out;
		cursor: pointer;

		&:hover,
		div:focus-within & {
			background-color: var(--colorLightgray);
		}

		&::before,
		&::after {
			content: '';
			position: absolute;
			top: 50%;
			left: 50%;
			background-color: var(--colorGray);
			border-radius: 0.125rem;
			transform: translate(-50%, -50%);
		}

		&::before {
			width: 3rem;
			height: 0.5rem;
		}

		&::after {
			width: 0.5rem;
			height: 3rem;
		}
	}
</style>
