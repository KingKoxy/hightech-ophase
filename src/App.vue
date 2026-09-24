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
    class="dark:bg-background-dark-500 dark:text-white w-full min-h-screen transition-all duration-200 flex flex-col"
  >
    <template v-if="!$route.meta.onlyContent">
      <HeaderBar />
      <main class="flex justify-center flex-grow">
        <div class="xl:w-[55%] h-full w-full mb-0 m-7 md:mb-0 xl:mt-0 md:m-10 flex gap-10 flex-col">
          <router-view v-slot="{ Component, route }">
            <transition name="fade">
              <component :is="Component" :key="route.path"/>
            </transition>
          </router-view>
        </div>
      </main>

      <footer v-if="$route.name !== 'imprint'" class="p-3 mt-2 flex justify-center">
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
