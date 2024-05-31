import { defineStore } from 'pinia'

interface BusinessObject {
	id: string
	type: string
	name: string
}

export const useStore = defineStore('store', {
	state: () => ({
		page: 'Заявка',
		current: {
			id: 'id',
			type: 'bpmn:Task',
			name: 'Исправить заявку',
		},
		tabs: 'process',
		formName: '',
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
	},
})
