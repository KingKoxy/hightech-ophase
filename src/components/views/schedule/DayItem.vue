<script setup lang="ts">
import type { IDay } from '@/types.ts'
import { ref } from 'vue'
import { DAY_MAP } from '@/constants.ts'
import EventItem from '@/components/views/schedule/EventItem.vue'

const { day, currentDate } = defineProps<{
  day: IDay
  currentDate: Date
}>()

const events = [...day.events].sort((a, b) => {
  return a.date.toISOString().localeCompare(b.date.toISOString());
});

const activeIndex = ref(-1);
// If the current date is the same as the day's date, highlight the event that is currently happening
// The day should change at 03:00
const todayMinus3 = new Date();
todayMinus3.setTime(currentDate.getTime() - 3 * 60 * 60 * 1000);

if (day.date.toISOString().split('T')[0] === todayMinus3.toISOString().split('T')[0]) {
  for (let i = 0; i < events.length - 1; i++) {
    if (currentDate < events[i+1].date) {
      activeIndex.value = i;
      break;
    }
  }
  if (activeIndex.value === -1) activeIndex.value = events.length - 1;
}
</script>

<template>
  <div class="text-lg mb-3 font-semibold">{{ DAY_MAP[day.weekdayIndex] }}</div>
  <div class="border-gray-500 border-2 border-b-0">
    <EventItem v-for="(event, i) in events" :key='event.title' :event="event" :active="i === activeIndex" />
  </div>
</template>

<style scoped></style>
