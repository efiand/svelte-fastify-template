<script>
	import { punctify } from '@/scripts/common/utils.js';

	const RETINA_START = 2;

	export let className = '',
		images = [],
		title = '',
		webpImages = [];

	const getSrcset = (list, start = 1) =>
		list.map(({ url, density }, i) => {
			if (start <= i + 1) {
				return `${url} ${density}x`;
			}
			return '';
		});

	let srcset = images.length > 1 && getSrcset(images, RETINA_START);
	let src = images[0].url;
</script>

<picture class={className}>
	{#if webpImages.length}
		<source type="image/webp" srcset={getSrcset(webpImages)} />
	{/if}
	<img {src} {srcset} alt={punctify(title)} loading="lazy" />
</picture>
