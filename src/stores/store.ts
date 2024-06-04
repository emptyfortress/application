import { defineStore } from 'pinia'

interface BusinessObject {
	id: string
	type: string
	name: string
}

export const useStore = defineStore('store', {
	state: () => ({
		title: 'Конструктор приложений',
		page: 'Заявка',
		current: {
			id: 'id',
			type: 'bpmn:Process',
			name: '',
		},
		tabs: 'process',
		formName: '',
		currentField: null as null | BusinessObject,
	}),
	getters: {
		startFormName: (state) => 'Форма "' + state.current.name + '"',
	},
	actions: {
		setPage(e: string) {
			this.page = e
		},
		setCurrent(e: BusinessObject) {
			this.current = e
		},
		setFormName(e: string) {
			this.formName = e
		},
		setField(e: BusinessObject) {
			this.currentField = e
		},
		clearField() {
			this.currentField = null
		},
	},
})
