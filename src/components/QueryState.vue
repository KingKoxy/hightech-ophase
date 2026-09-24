<script setup lang="ts">
import LoadingSpinner from '@/components/LoadingSpinner.vue'

defineProps<{
  loading: boolean
  error?: unknown
}>()
</script>

<template>
  <div v-if="loading" class="flex w-full p-10 items-center justify-center h-full">
    <LoadingSpinner />
  </div>
  <div v-else-if="error" class="flex w-full p-10 items-center justify-center h-full text-center">
    Beim Laden der Daten ist ein Fehler aufgetreten. Bitte versuche es später erneut.
  </div>
  <slot v-else />
</template>
