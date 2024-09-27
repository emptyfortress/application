import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useData = defineStore('data', () => {
	const myxml = ref<null | string>(null)
	const assist = ref(false)
	const button = ref('Введите название')

	const saveXML = (e: any) => {
		myxml.value = e
	}
	const setAssist = (e: boolean) => {
		assist.value = e
	}
	const setButton = (e: string) => {
		button.value = e
	}

	return {
		myxml,
		saveXML,
		assist,
		setAssist,
		button,
		setButton,
	}
})
