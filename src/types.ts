export interface IDay {
  date: Date;
  weekdayIndex: number;
  events: IEvent[];
}

export interface IEvent {
  title: string;
  startTime: string;
  location: string;
  locationLink?: string | null;
  date: Date;
}

export interface IContact {
  name: string;
  phone: string;
}

export interface IVideo {
  title: string;
  url: string;
}
