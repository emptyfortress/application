import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { uid } from 'quasar'

type Row = {
	etap: string
	role: string
	form: string | null
}

export const useForms = defineStore('forms', () => {
	const formList = ref<Row[]>([
		{
			etap: 'Этап',
			role: 'Инициатор',
			form: null,
		},
		{
			etap: 'Этап',
			role: 'Все остальные',
			form: null,
		},
	])

	const addForm = (etap: string, role: string, form: string) => {
		let row = { etap: etap, role: role, form: form }
		formList.value.push(row)
	}

	return {
		formList,
		addForm,
	}
})
