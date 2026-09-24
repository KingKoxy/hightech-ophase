import { ref, watch } from 'vue'

const darkMode = ref(false)
let initialized = false

function initDarkMode() {
  if (initialized) return
  initialized = true

  if (localStorage.getItem('theme') === 'dark') {
    darkMode.value = true
  } else if (localStorage.getItem('theme') === 'light') {
    darkMode.value = false
  } else {
    darkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  watch(darkMode, (isDark) => {
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  })
}

export function useDarkMode() {
  initDarkMode()
  return {
    darkMode,
    toggleDarkMode: () => {
      darkMode.value = !darkMode.value
    },
  }
}
