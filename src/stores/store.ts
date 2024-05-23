import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
	state: () => ({
		count: 0,
		page: 'Квартальные цели',
	}),
	getters: {
		doubleCount: (state) => state.count * 2,
	},
	actions: {
		setPage(e: string) {
			this.page = e
		},
	},
})
