import { queryToContacts, queryToVideos } from '$lib/utils';

import { GetAllContactsStore, GetAllVideosStore } from '$houdini';

export async function load(event) {
	const contactStore = new GetAllContactsStore();
	const videoStore = new GetAllVideosStore();
	const [contacts, videos] = await Promise.all([
		contactStore.fetch({ event }),
		videoStore.fetch({ event })
	]);

	return {
		contacts: queryToContacts(contacts.data),
		videos: queryToVideos(videos.data)
	};
}
