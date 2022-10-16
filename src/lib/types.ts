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

export interface IContact {
	name: string;
	phone: string;
}
