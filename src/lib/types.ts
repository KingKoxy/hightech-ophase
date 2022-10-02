export interface IScheduleQuery {
	eventCollection: {
		items: {
			title: string;
			startTime: string;
			locationName: string;
			locationGoogleMapsLink: string;
		}[];
	};
}

export interface IDay {
	index: number; // starts with monday: 0, tuesday: 1, ...
	events: IEvent[];
}

export interface IEvent {
	title: string;
	startTime: string;
	location: string;
	locationLink?: string;
}
