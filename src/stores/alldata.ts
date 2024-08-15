import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useData = defineStore('data', () => {
	const myxml = ref<null | string>(null)

	const saveXML = (e: string) => {
		myxml.value = e
	}

	return {
		myxml,
		saveXML,
	}
})
