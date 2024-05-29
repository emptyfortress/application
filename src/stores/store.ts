import { defineStore } from 'pinia'

interface BusinessObject {
	id: string
	type: string
	name: string
}

export const useStore = defineStore('store', {
	state: () => ({
		count: 0,
		page: 'Заявка',
		current: {
			id: 'id',
			type: 'bpmn:Task',
			name: 'Исправить заявку',
		},
		tabs: 'process',
	}),
	getters: {
		doubleCount: (state) => state.count * 2,
	},
	actions: {
		setPage(e: string) {
			this.page = e
		},
		setCurrent(e: BusinessObject) {
			this.current = e
		},
	},
})
