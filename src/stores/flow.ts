import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useFlow = defineStore('flow', () => {
	const flow = ref<any>(null)

	const saveFlow = (e: any) => {
		flow.value = e
	}

	const lanes = computed(() => {
		return flow.value[1].laneSets[0].lanes
	})
	const etaps = computed(() => {
		if (!!flow.value) {
			return flow.value[1].flowElements
		} else return []
	})

	return {
		flow,
		saveFlow,
		lanes,
		etaps,
	}
})
