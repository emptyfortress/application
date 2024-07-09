import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
	state: () => ({
		mini: false,
		drawer: false,
		currentNode: null as Stat | null,
		currentBO: null as BusinessObject | null,
	}),
	getters: {},
	actions: {
		setCurrentNode(e: Stat | null) {
			this.currentNode = e
		},
		setCurrentBO(e: BusinessObject | null) {
			this.currentBO = e
		},
	},
})
