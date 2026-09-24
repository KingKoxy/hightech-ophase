<script setup lang="ts">
import LoadingSpinner from '@/components/LoadingSpinner.vue'

defineProps<{
  loading: boolean
  error?: unknown
}>()
</script>

<template>
  <div v-if="loading" class="flex h-full w-full items-center justify-center p-10">
    <LoadingSpinner />
  </div>
  <div v-else-if="error" class="flex h-full w-full items-center justify-center p-10 text-center">
    Beim Laden der Daten ist ein Fehler aufgetreten. Bitte versuche es später erneut.
  </div>
  <slot v-else />
</template>
