<script setup lang="ts">
import ical from 'ical-generator'
import CustomHeadline from '@/components/CustomHeadline.vue'
import QueryState from '@/components/QueryState.vue'
import { useQuery } from '@vue/apollo-composable'
import { graphql } from '@/gql'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import DayItem from './DayItem.vue'
import { queryToEvents, queryToSchedule } from '@/gql/mappers.ts'

// Only show events from this year onward, so last year's O-Phase schedule
// doesn't leak into the current one without needing a yearly code change.
const currentYearStart = `${new Date().getFullYear()}-01-01T00:00:00+00:00`

const allEventsQuery = useQuery(
  graphql(`
    query GetAllEvents($startTime: DateTime!) {
      eventCollection(where: { startTime_gt: $startTime }) {
        items {
          title
          startTime
          locationName
          locationGoogleMapsLink
        }
      }
    }
  `),
  { startTime: currentYearStart },
)

function exportCalendar() {
  if (!icalEvents.value) return
  const calendar = ical({ name: 'Wochenplan O-Phase' })
  for (const calendarEvent of icalEvents.value) {
    calendar.createEvent(calendarEvent)
  }
  const calendarText = calendar.toString()
  const blob = new Blob([calendarText], { type: 'text/calendar' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'Wochenplan.ics'
  link.click()
  URL.revokeObjectURL(url)
}

const currentDate = ref(new Date())

const schedule = computed(() => {
  return queryToSchedule(allEventsQuery.result.value)
})

const sortedSchedule = computed(() => {
  return [...schedule.value].sort((a, b) => a.date.toISOString().localeCompare(b.date.toISOString()))
})
const icalEvents = computed(() => {
  return queryToEvents(allEventsQuery.result.value)
})

const CURRENT_TIME_REFRESH_INTERVAL_MS = 10_000

onMounted(() => {
  const interval = setInterval(() => {
    currentDate.value = new Date()
  }, CURRENT_TIME_REFRESH_INTERVAL_MS)

  onUnmounted(() => clearInterval(interval))
})
</script>

<template>
  <section>
    <CustomHeadline>
      <button class="text-3xl font-semibold flex gap-2" @click="exportCalendar">
        Wochenplan
        <i class="icon-export"></i>
      </button>
    </CustomHeadline>
    <div class="md:mx-10 mt-5">
      <QueryState :loading="allEventsQuery.loading.value" :error="allEventsQuery.error.value">
        <template v-for="(day, i) in sortedSchedule" :key="day.date.toISOString()">
          <div :class="{ 'mb-10': i < sortedSchedule.length - 1 }">
            <DayItem :day="day" :current-date="currentDate" />
          </div>
        </template>
      </QueryState>
    </div>
  </section>
</template>

<style scoped></style>
