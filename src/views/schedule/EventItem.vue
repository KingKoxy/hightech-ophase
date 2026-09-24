<script setup lang="ts">
import type { IEvent } from '@/types.ts'
const { event, active } = defineProps<{
  event: IEvent
  active?: boolean
}>()
</script>

<template>
  <div
    class="grid border-b-2 grid-cols-[64px_1fr] border-gray-500"
    :class="{
      'bg-[#4ab93d40] text-white': active
    }"
  >
    <div class="flex justify-center items-center p-3 border-gray-500 border-r-2">
      {{event.startTime}}
    </div>
    <div class="flex-grow p-3 text-sm">
      <div class="text-base">{{event.title}}</div>
      <div v-if="event.locationLink" class="text-grasshopper-green-500">
        <a :href="event.locationLink" class="">{{event.location}}</a>
      </div>
      <p v-else>{{event.location}}</p>
    </div>
  </div>
</template>

<style scoped></style>
