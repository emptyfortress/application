import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useFlow = defineStore('flow', () => {
	const flow = ref<any>(null)

	const saveFlow = (e: any) => {
		flow.value = e
	}

	const lanes = computed(() => {
		let tmp = flow.value[1].laneSets[0].lanes.map((item: any) => ({
			id: item.id,
			type: item.$type,
			name: item.name,
			selected: false,
		}))
		return tmp
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
