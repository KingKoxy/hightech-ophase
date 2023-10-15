import type { ICalEventData } from 'ical-generator';

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
