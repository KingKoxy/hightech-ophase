import { queryToEvents, queryToSchedule } from '$lib/utils';

import { GetAllEventsStore } from '$houdini';

export async function load(event) {
	const eventStore = new GetAllEventsStore();
	const events = eventStore.fetch({ event });
	const schedulePromise = events.then((d) => queryToSchedule(d.data));
	const eventsPromise = events.then((d) => queryToEvents(d.data));
	return {
		schedulePromise,
		eventsPromise
	};
}
