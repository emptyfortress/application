import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
	state: () => ({
		mini: false,
		drawer: false,
		currentNode: null as Stat | null,
		currentBO: null as BusinessObject | null,
		bread: [] as String[],
		formSelected: false,
	}),
	getters: {},
	actions: {
		setCurrentNode(e: Stat | null) {
			this.currentNode = e
		},
		setCurrentBO(e: BusinessObject | null) {
			this.currentBO = e
		},
		setBread(e: string) {
			this.bread = []
			this.bread.push(e)
		},
		addBread(e: string) {
			this.bread.push(e)
		},
		selectForm() {
			this.formSelected = true
		},
	},
})
