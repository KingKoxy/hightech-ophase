import { queryToImages } from '$lib/utils';

import { GetAllImagesStore } from '$houdini';

export async function load(event) {
	const imageStore = new GetAllImagesStore();

	const imagesPromise = imageStore.fetch({ event }).then((d) => queryToImages(d.data));
	return {
		imagesPromise
	};
}
