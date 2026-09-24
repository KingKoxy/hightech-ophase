export interface Day {
  date: Date
  weekdayIndex: number
  events: ScheduleEvent[]
}

export interface ScheduleEvent {
  title: string
  startTime: string
  location: string
  locationLink?: string | null
  date: Date
}

export interface Contact {
  name: string
  phone: string
}

export interface Video {
  title: string
  url: string
}
