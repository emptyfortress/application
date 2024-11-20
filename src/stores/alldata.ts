import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useData = defineStore('data', () => {
	const myxml = ref<null | string>(null)
	const assist = ref(false)
	const button = ref('Кнопка')
	const begin = ref(0)

	const saveXML = (e: any) => {
		myxml.value = e
	}
	const setAssist = (e: boolean) => {
		assist.value = e
	}
	const setButton = (e: string) => {
		button.value = e
	}
	const increment = (() => {
		begin.value++
	})
	const firstRun = ref(true)
	const setFirstRun = ((e: boolean) => {
		firstRun.value = e
	})

	return {
		myxml,
		saveXML,
		assist,
		setAssist,
		button,
		setButton,
		begin,
		increment,
		firstRun,
		setFirstRun,
	}
})
