import { defineStore } from 'pinia'
import { ref } from 'vue'

export const userCountStore = defineStore(
  'big-count',
  () => {
    const count = ref(12)
    const addCount = (newToken) => {
      count.value += newToken
    }
    return {
      count,
      addCount,
    }
  },
  {
    persist: true,
  },
)
