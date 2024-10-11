import { queryToEvents, queryToSchedule } from '$lib/utils';

import { GetAllEventsStore } from '$houdini';

export async function load(event) {
	const eventStore = new GetAllEventsStore();
	const events = await eventStore.fetch({ event });
	return {
		schedule: queryToSchedule(events.data),
		events: queryToEvents(events.data)
	};
}
