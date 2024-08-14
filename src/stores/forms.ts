import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useStore } from '@/stores/store'

const store = useStore()

type Row = {
	etap: string
	role: string
	form: string | null
}

export const useForms = defineStore('forms', () => {
	const allBO = ref<any[]>([])
	const setAllBO = (e: any) => {
		allBO.value = e
	}
	const roles = ref<string[]>([])

	const currentBO = ref()
	const setCurrentBO = (e: any) => {
		currentBO.value = e
	}

	const formList = ref<Row[]>([
		{
			etap: 'Старт',
			role: 'Инициатор',
			form: null,
		},
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

	const calcList = computed(() => {
		return formList.value.filter((item) => {
			return item.etap == store.currentBO.name
		})
	})

	const addForm = (etap: string, role: string, form: string) => {
		let row = { etap: etap, role: role, form: form }
		formList.value.push(row)
	}

	const ind = ref<null | number>(null)
	const editForm = (form: string) => {
		if (ind.value !== null) {
			formList.value[ind.value].form = form
		}
	}

	return {
		allBO,
		setAllBO,

		currentBO,
		setCurrentBO,

		formList,
		calcList,
		ind,
		addForm,
		editForm,
	}
})
