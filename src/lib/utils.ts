import type { IDay } from '$lib/types';

export function queryToSchedule(data: {
	eventCollection: {
		items: {
			startTime: string;
			title: string;
			locationName: string;
			locationGoogleMapsLink: string;
		}[];
	};
}): IDay[] {
	if (!data) return [] as IDay[];
	const items = data.eventCollection.items;
	const dayMap = new Map<
		number,
		{ title: string; startTime: string; location: string; locationLink: string }[]
	>();

	for (const item of items) {
		const date = new Date(item.startTime);
		const startTime = date.toLocaleTimeString(['de'], {
			hour: '2-digit',
			minute: '2-digit'
		});

		//For anyone wondering: https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers
		const weekDay = (((date.getDay() - 1) % 7) + 7) % 7;
		const events = dayMap.get(weekDay) ?? [];
		events.push({
			title: item.title,
			startTime,
			location: item.locationName,
			locationLink: item.locationGoogleMapsLink
		});
		dayMap.set(weekDay, events);
	}

	const days: IDay[] = [];
	for (const [key, value] of dayMap) {
		days.push({
			index: key,
			events: value
		});
	}
	return days;
}

