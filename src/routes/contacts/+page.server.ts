import { queryToContacts } from '$lib/utils';

import { GetAllContactsStore } from '$houdini';

export async function load(event) {
	const contactStore = new GetAllContactsStore();
	const isOPhase = new Date().getMonth() === 8 || new Date().getMonth() === 9;
	const contactsPromise = isOPhase
		? contactStore.fetch({ event }).then((d) => queryToContacts(d.data))
		: [];
	return {
		contactsPromise,
		isOPhase
	};
}
