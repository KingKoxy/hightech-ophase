<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted, onUnmounted } from 'vue'
import { useDarkMode } from '@/composables/useDarkMode.ts'
import BottomNavigation from '@/components/nav/BottomNavigation.vue'
import HeaderBar from '@/components/nav/HeaderBar.vue'

// Activates the dark-mode watcher (adds/removes the `dark` class on <html>
// and syncs localStorage) for the whole app, regardless of which route or
// layout is active.
useDarkMode()

const resizeObserver = new ResizeObserver(() => {
  const height = document.documentElement.scrollHeight
  parent.postMessage({ type: 'iframe-resize', height }, '*')
})

onMounted(() => {
  resizeObserver.observe(document.body)
})

onUnmounted(() => {
  resizeObserver.disconnect()
})
</script>

<template>
  <div
    class="dark:bg-background-dark-500 flex min-h-screen w-full flex-col transition-all duration-200 dark:text-white"
  >
    <template v-if="!$route.meta.onlyContent">
      <HeaderBar />
      <main class="flex flex-grow justify-center">
        <div class="m-7 mb-0 flex h-full w-full flex-col gap-10 md:m-10 md:mb-0 xl:mt-0 xl:w-[55%]">
          <router-view v-slot="{ Component, route }">
            <transition name="fade" mode="out-in">
              <component :is="Component" :key="route.path" />
            </transition>
          </router-view>
        </div>
      </main>

      <footer v-if="$route.name !== 'imprint'" class="mt-2 flex justify-center p-3">
        <a href="/imprint">Impressum</a>
      </footer>
      <div class="h-[80px] sm:h-0"></div>
      <BottomNavigation />
    </template>
    <template v-else>
      <RouterView />
    </template>
  </div>
</template>
