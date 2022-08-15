import { ImagePool } from '@squoosh/lib';

export default async (file) => {
	let imagePool = new ImagePool();
	const image = imagePool.ingestImage(file);

	await image.preprocess();
	await image.encode({
		webp: { quality: 75 }
	});

	const [encodedImage] = Object.values(image.encodedWith);
	const { binary } = await encodedImage;

	await imagePool.close();
	imagePool = null;

	return binary;
};
