<script setup lang="ts">
import { PAGES } from '@/constants'
</script>

<template>
  <div class="text-lg sm:flex hidden items-center">
    <template v-for="([url, { name, icon }], i) in Object.entries(PAGES)" :key="url">
      <RouterLink
        :to="url"
        class="font-bold navlink mx-3 hover:no-underline flex items-center hover:text-white transition-all gap-1.5"
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
