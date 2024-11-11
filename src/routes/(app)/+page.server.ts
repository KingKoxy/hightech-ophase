import { queryToVideos } from '$lib/utils';

import { GetAllVideosStore } from '$houdini';

export async function load(event) {
	const videoStore = new GetAllVideosStore();
	const videosPromise = videoStore.fetch({ event }).then((d) => queryToVideos(d.data));
	const isOPhase = new Date().getMonth() === 8 || new Date().getMonth() === 9;

	return {
		videosPromise,
		isOPhase
	};
}
