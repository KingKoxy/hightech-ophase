<script setup lang="ts">
import { PAGES } from '@/constants'
</script>

<template>
  <div class="hidden items-center text-lg sm:flex">
    <template v-for="([url, { name, icon }], i) in Object.entries(PAGES)" :key="url">
      <RouterLink
        :to="url"
        class="navlink mx-3 flex items-center gap-1.5 font-bold transition-all hover:text-white hover:no-underline"
        active-class="text-white"
      >
        <i class="text-xl" :class="icon"></i>
        {{ name }}
      </RouterLink>
      <span v-if="i !== Object.keys(PAGES).length - 1" class="mx-1">|</span>
    </template>
  </div>
</template>

<style scoped></style>
