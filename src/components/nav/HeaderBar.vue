<script setup lang="ts">
import lightModeAnim from '@/assets/animations/lightMode.json'
import TopNavigationLinks from '@/components/nav/TopNavigationLinks.vue'
import { onMounted, ref } from 'vue'
import { useDarkMode } from '@/composables/useDarkMode.ts'
import { useSiteAssets } from '@/composables/useSiteAssets.ts'
import lottie from 'lottie-web/build/player/lottie_light'

const { darkMode, toggleDarkMode: flipDarkMode } = useDarkMode()
const { logo } = useSiteAssets()

// The lightMode.json Lottie animation runs from frame 0 (light-mode icon) to
// its midpoint at frame 14 (dark-mode icon) to frame 28 (its end, which loops
// back to the same pose as frame 0).
const LIGHT_MODE_FRAME = 0
const DARK_MODE_FRAME = 14
const ANIMATION_END_FRAME = 28

const animationContainer = ref<Element>()

let toggleDarkMode: () => void = () => {}

onMounted(() => {
  if (!animationContainer.value) return
  const animation = lottie.loadAnimation({
    container: animationContainer.value,
    renderer: 'svg',
    loop: false,
    animationData: lightModeAnim,
  })
  animation.goToAndStop(darkMode.value ? DARK_MODE_FRAME : LIGHT_MODE_FRAME, true)
  animation.pause()

  toggleDarkMode = () => {
    animation.stop()
    if (darkMode.value) {
      animation.playSegments([DARK_MODE_FRAME, ANIMATION_END_FRAME], true)
    } else {
      animation.playSegments([LIGHT_MODE_FRAME, DARK_MODE_FRAME], true)
    }
    flipDarkMode()
  }
})
</script>

<template>
  <div class="sticky top-0 z-50 flex w-full text-black select-none">
    <div
      class="bg-grasshopper-green-700 z-20 hidden h-[140px] w-[280px] rounded-br-xl object-cover p-2 shadow-lg shadow-black/30 md:block"
    >
      <img
        v-if="logo"
        :src="logo"
        class="h-full w-full object-contain"
        alt="HiGHtech O-Phasen Logo"
      />
    </div>
    <header class="flex-grow">
      <div
        class="bg-grasshopper-green-500 z-10 flex h-[70px] items-center justify-between p-2 pr-5 shadow-lg shadow-black/30 lg:h-[50%]"
      >
        <div class="flex h-full items-center">
          <div class="h-full md:hidden">
            <img
              v-if="logo"
              :src="logo"
              class="h-full object-contain"
              alt="HIGHtech O-Phasen Logo"
            />
          </div>
          <h1 class="text-lg font-bold sm:hidden">O-Phase {{ new Date().getFullYear() }}</h1>
          <TopNavigationLinks />
        </div>
        <button
          ref="animationContainer"
          aria-label="Toggle Dark Mode"
          class="relative flex h-[24px] w-[24px] cursor-pointer items-center"
          @click="toggleDarkMode"
        ></button>
      </div>
    </header>
  </div>
</template>

<style scoped></style>
