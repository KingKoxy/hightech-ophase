<script setup lang="ts">
import type { Video } from '@/types.ts'

const { video } = defineProps<{
  video: Video
}>()
</script>

<template>
  <div class="relative w-full overflow-hidden pt-[56.25%]">
    <iframe
      class="absolute top-0 right-0 bottom-0 left-0 z-0 h-full w-full"
      :src="video.url"
      :title="video.title"
      allow="
        accelerometer;
        autoplay;
        clipboard-write;
        encrypted-media;
        gyroscope;
        picture-in-picture;
      "
      allowfullscreen
    ></iframe>
  </div>
</template>

<style scoped></style>
