import type { ICalEventData } from 'ical-generator';

import type { GetAllEvents$result } from '$houdini';
import type { IDay, IEvent } from '$lib/types';

export function queryToSchedule(data: GetAllEvents$result): IDay[] {
	if (!data || !data.eventCollection) return [] as IDay[];
	const items = data.eventCollection.items;
	const dayMap = new Map<string, IEvent[]>();

	for (const item of items) {
		const date = new Date(item.startTime);

		// Map for example 01:00 club events to the day before
		const mappingDate = new Date();
		mappingDate.setTime(date.getTime() - 2 * 60 * 60 * 1000);

		const startTime = date.toLocaleTimeString(['de'], {
			hour: '2-digit',
			minute: '2-digit'
		});
		const mappingDateKey = mappingDate.toISOString().split('T')[0];

		const events: IEvent[] = dayMap.get(mappingDateKey) ?? [];
		events.push({
			title: item.title,
			startTime,
			location: item.locationName,
			locationLink: item.locationGoogleMapsLink,
			date: date
		});
		dayMap.set(mappingDateKey, events);
	}

	const days: IDay[] = [];
	for (const [dateString, events] of dayMap) {
		events.sort((a, b) => a.date.toISOString().localeCompare(b.date.toISOString()));
		const date = new Date(dateString);
		const weekDayIndex = date.getDay();
		days.push({
			date: date,
			weekdayIndex: weekDayIndex,
			events: events
		});
	}
	return days;
}

export function queryToEvents(data: {
	eventCollection: {
		items: {
			startTime: string;
			title: string;
			locationName: string;
			locationGoogleMapsLink: string;
		}[];
	};
}): ICalEventData[] {
	const events = data.eventCollection.items;
	events.sort((a, b) => a.startTime.localeCompare(b.startTime));
	const ret: ICalEventData[] = [];
	for (let i = 0; i < events.length; i++) {
		const currentElement = events[i];
		const nextElement = events[i + 1];

		let endDate;

		if (nextElement) {
			const currentStartDate = new Date(currentElement.startTime);
			const nextStartDate = new Date(nextElement.startTime);

			// Überprüfen, ob das Startdatum des nächsten Elements an einem anderen Tag liegt
			if (
				currentStartDate.getDate() !== nextStartDate.getDate() ||
				currentStartDate.getMonth() !== nextStartDate.getMonth() ||
				currentStartDate.getFullYear() !== nextStartDate.getFullYear()
			) {
				// Das Startdatum des nächsten Elements liegt an einem anderen Tag
				endDate = new Date(
					currentStartDate.getFullYear(),
					currentStartDate.getMonth(),
					currentStartDate.getDate(),
					24,
					0,
					0
				);
			} else {
				// Das Startdatum des nächsten Elements liegt am selben Tag
				endDate = nextStartDate;
			}
		} else {
			// Es gibt kein nächstes Element, also fügen wir 24 Uhr hinzu
			const currentStartDate = new Date(currentElement.startTime);
			endDate = new Date(
				currentStartDate.getFullYear(),
				currentStartDate.getMonth(),
				currentStartDate.getDate(),
				24,
				0,
				0
			);
		}
		ret.push({
			start: new Date(currentElement.startTime),
			end: endDate,
			summary: currentElement.title,
			location: currentElement.locationName
		});
	}

	return ret;
}
