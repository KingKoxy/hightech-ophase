<script setup lang="ts">
import ical from 'ical-generator'
import CustomHeadline from '@/components/CustomHeadline.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { useQuery } from '@vue/apollo-composable'
import { graphql } from '@/gql'
import { computed, onMounted, ref } from 'vue'
import DayItem from '@/components/views/schedule/DayItem.vue'
import { queryToEvents, queryToSchedule } from '@/utils.ts'

const allEventsQuery = useQuery(
  graphql(`
    query GetAllEvents {
      eventCollection(where: { startTime_gt: "2025-01-01T00:00:00+00:00" }) {
        items {
          title
          startTime
          locationName
          locationGoogleMapsLink
        }
      }
    }
  `),
)

async function exportCalendar() {
  if (!icalEvents.value) return
  const calendar = ical({ name: 'Wochenplan O-Phase' })
  for (const calendarEvent of icalEvents.value) {
    // check if calendarEvent is IEvent
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
const icalEvents = computed(() => {
  return queryToEvents(allEventsQuery.result.value)
})

onMounted(() => {
  const interval = setInterval(() => {
    currentDate.value = new Date()
  }, 10000)
  return () => clearInterval(interval)
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
    <!-- <div class="text-xl">CUMMING SOON 💦</div> -->
    <div class="md:mx-10 mt-5">
      <div
        v-if="allEventsQuery.loading.value"
        class="flex w-full p-10 items-center justify-center h-full"
      >
        <LoadingSpinner />
      </div>
      <template
        v-else-if="schedule"
        v-for="(day, i) in [...schedule].sort((a, b) => {
          return a.date.toISOString().localeCompare(b.date.toISOString())
        })"
        :key="day"
      >
        <div :class="{ 'mb-10': i < schedule.length - 1 }">
          <DayItem :day="day" :current-date="currentDate" />
        </div>
      </template>
    </div>
  </section>
</template>

<style scoped></style>
