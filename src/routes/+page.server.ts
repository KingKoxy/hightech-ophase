import { queryToContacts, queryToVideos } from '$lib/utils';

import { GetAllContactsStore, GetAllVideosStore } from '$houdini';

export async function load(event) {
	const contactStore = new GetAllContactsStore();
	const videoStore = new GetAllVideosStore();
	const contactsPromise = contactStore.fetch({ event }).then((d) => queryToContacts(d.data));
	const videosPromise = videoStore.fetch({ event }).then((d) => queryToVideos(d.data));

	return {
		contactsPromise,
		videosPromise
	};
}
