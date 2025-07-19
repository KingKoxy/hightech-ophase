<script setup lang="ts">
import type { IVideo } from '@/types.ts'

const { video } = defineProps<{
  video: IVideo
}>()
</script>

<template>
  <div class="relative overflow-hidden w-full pt-[56.25%]">
    <iframe
      class="absolute top-0 left-0 bottom-0 right-0 w-full h-full z-0"
      :src="video.url"
      title="{video.title}"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<style scoped></style>
