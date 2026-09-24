import { ref} from 'vue'

export const darkMode = ref(false)

export const isOPhase = new Date().getMonth() === 8 || new Date().getMonth() === 9;
