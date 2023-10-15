export class ICalendar {
	name: string;
	events: ICalEventData[];

	constructor(name: string, events: ICalEventData[]) {
		this.events = events;
		this.name = name;
	}

	toString() {
		let g = '';

		// VCALENDAR and VERSION
		g = 'BEGIN:VCALENDAR\r\nVERSION:2.0\r\n';

		// PRODID
		g += 'PRODID:-' + '//sebbo.net//ical-generator//EN' + '\r\n';

		// NAME
		g += 'NAME:' + this.name + '\r\n';
		g += 'X-WR-CALNAME:' + this.name + '\r\n';

		// Events
		this.events.forEach((event) => (g += event.toString()));

		g += 'END:VCALENDAR';

		return foldLines(g);
	}
}

class ICalEventData {
	start: Date;
	end: Date;
	summary: string;
	location: string;

	constructor(data: { start: Date; end: Date; summary: string; location: string }) {
		this.start = data.start;
		this.end = data.end;
		this.summary = data.summary;
		this.location = data.location;
	}

	toString() {
		return `
BEGIN:VEVENT
UID:${Math.random().toString(36).substring(2, 15)}
DTSTAMP:${dateToICalString(new Date())}
DTSTART:${dateToICalString(this.start)}
DTEND:${dateToICalString(this.end)}
SUMMARY:${this.summary}
LOCATION:${this.location}
END:VEVENT`;
	}
}

export function queryToICal(data: {
	eventCollection: {
		items: {
			startTime: string;
			title: string;
			locationName: string;
			locationGoogleMapsLink: string;
		}[];
	};
}): Blob {
	const events = data.eventCollection.items;
	events.sort((a, b) => a.startTime.localeCompare(b.startTime));
	const eventData: ICalEventData[] = [];
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
		eventData.push(
			new ICalEventData({
				start: new Date(currentElement.startTime),
				end: endDate,
				summary: currentElement.title,
				location: currentElement.locationName
			})
		);
	}

	const calendar = new ICalendar('Wochenplan O-Phase', eventData);
	console.log(calendar.toString());
	return new Blob([calendar.toString()], { type: 'text/calendar' });
}

function dateToICalString(date: Date) {
	return date.toISOString().replace(/-|:|\.\d+/g, '');
}

function foldLines(input: string): string {
	return input
		.split('\r\n')
		.map(function (line) {
			let result = '';
			let c = 0;
			for (let i = 0; i < line.length; i++) {
				let ch = line.charAt(i);

				// surrogate pair, see https://mathiasbynens.be/notes/javascript-encoding#surrogate-pairs
				if (ch >= '\ud800' && ch <= '\udbff') {
					ch += line.charAt(++i);
				}

				// TextEncoder is available in browsers and node.js >= 11.0.0
				const charsize = new TextEncoder().encode(ch).length;
				c += charsize;
				if (c > 74) {
					result += '\r\n ';
					c = charsize;
				}

				result += ch;
			}
			return result;
		})
		.join('\r\n');
}
