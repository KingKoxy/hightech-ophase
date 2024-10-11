import { queryToUrls } from '$lib/utils';

import { GetAllImagesStore } from '$houdini';

export async function load(event) {
	const imageStore = new GetAllImagesStore();

	const images = await imageStore.fetch({ event });
	return {
		imageUrls: queryToUrls(images.data)
	};
}
