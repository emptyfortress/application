import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', () => {
	// const count = ref(0)
	// const name = ref('Eduardo')
	// const doubleCount = computed(() => count.value * 2)
	// function increment() {
	// 	count.value++
	// }
	const layout = reactive([
		{
			x: 0,
			y: 0,
			w: 6,
			h: 6,
			i: 0,
			data: {},
		},
		{
			x: 6,
			y: 0,
			w: 6,
			h: 6,
			i: 1,
		},
	])

	return { layout }
})
