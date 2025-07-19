import type { ICalEventData } from 'ical-generator'

import type { IContact, IDay, IEvent, IVideo } from '@/types'
import type {
  GetAllContactsQuery,
  GetAllEventsQuery,
  GetAllImagesQuery,
  GetAllVideosQuery,
} from '@/gql/graphql.ts'

export function queryToSchedule(data: GetAllEventsQuery | undefined): IDay[] {
  if (!data || !data.eventCollection) return [] as IDay[]
  const items = [...data.eventCollection.items]
  const dayMap = new Map<string, IEvent[]>()

  for (const item of items) {
    if (
      !item ||
      !item.startTime ||
      !item.title ||
      !item.locationName ||
      !item.locationGoogleMapsLink
    )
      continue
    const date = new Date(item.startTime)

    // Map for example 01:00 club events to the day before
    const mappingDate = new Date()
    mappingDate.setTime(date.getTime() - 2 * 60 * 60 * 1000)

    const startTime = date.toLocaleTimeString(['de'], {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Berlin',
    })
    const mappingDateKey = mappingDate.toISOString().split('T')[0]

    const events: IEvent[] = dayMap.get(mappingDateKey) ?? []
    events.push({
      title: item.title,
      startTime,
      location: item.locationName,
      locationLink: item.locationGoogleMapsLink,
      date: date,
    })
    dayMap.set(mappingDateKey, events)
  }

  const days: IDay[] = []
  for (const [dateString, events] of dayMap) {
    events.sort((a, b) => a.date.toISOString().localeCompare(b.date.toISOString()))
    const date = new Date(dateString)
    const weekDayIndex = date.getDay()
    days.push({
      date: date,
      weekdayIndex: weekDayIndex,
      events: events,
    })
  }
  return days
}

export function queryToEvents(data: GetAllEventsQuery | undefined): ICalEventData[] {
  if (!data || !data.eventCollection) return [] as ICalEventData[]
  const events = [...data.eventCollection.items]
  events.sort((a, b) => {
    if (!a?.startTime || !b?.startTime) return 0
    return a.startTime.localeCompare(b.startTime)
  })
  const ret: ICalEventData[] = []
  for (let i = 0; i < events.length; i++) {
    const currentElement = events[i]
    const nextElement = events[i + 1]

    let endDate

    if (nextElement) {
      if (!currentElement?.startTime || !nextElement.startTime) continue
      const currentStartDate = new Date(currentElement.startTime)
      const nextStartDate = new Date(nextElement.startTime)

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
          0,
        )
      } else {
        // Das Startdatum des nächsten Elements liegt am selben Tag
        endDate = nextStartDate
      }
    } else {
      // Es gibt kein nächstes Element, also fügen wir 24 Uhr hinzu
      if (!currentElement?.startTime) continue
      const currentStartDate = new Date(currentElement.startTime)
      endDate = new Date(
        currentStartDate.getFullYear(),
        currentStartDate.getMonth(),
        currentStartDate.getDate(),
        24,
        0,
        0,
      )
    }
    if (!currentElement?.startTime || !currentElement.title || !currentElement.locationName)
      continue
    ret.push({
      start: new Date(currentElement.startTime),
      end: endDate,
      summary: currentElement.title,
      location: currentElement.locationName,
    })
  }

  return ret
}

export function queryToContacts(data: GetAllContactsQuery | undefined): IContact[] {
  if (!data || !data.contactCollection) return [] as IContact[]
  const contacts = data.contactCollection.items
  const ret: IContact[] = []
  for (const contact of contacts) {
    if (!contact || !contact.name || !contact.phone) continue
    ret.push({
      name: contact.name,
      phone: contact.phone,
    })
  }
  return ret
}

export function queryToVideos(data: GetAllVideosQuery | undefined): IVideo[] {
  if (!data || !data.videoCollection) return [] as IVideo[]
  const videos = data.videoCollection.items
  const ret: IVideo[] = []
  for (const video of videos) {
    if (!video || !video.title || !video.url) continue
    ret.push({
      title: video.title,
      url: video.url,
    })
  }
  return ret
}

export function queryToImages(data: GetAllImagesQuery | undefined) {
  if (!data || !data.imageCollection) return []
  const images = data.imageCollection.items
  const ret = []
  for (const image of images) {
    if (!image?.asset || !image.asset.url || !image.asset.fileName) continue
    ret.push({
      url: image.asset.url,
      fileName: image.asset.fileName,
    })
  }
  return ret
}
