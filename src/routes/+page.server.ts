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
		contacts: contacts.data ? queryToContacts(contacts.data) : [],
		videos: videos.data ? queryToVideos(videos.data) : []
	};
}
