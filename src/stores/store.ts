import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
	state: () => ({
		mini: false,
		drawer: false,
		drawer1: false,
		currentNode: null as Stat | null,
		currentBO: null as BusinessObject | null,
		bread: [] as String[],
		formSelected: false,
		currentField: null as Field | null,
		currentBlock: null as Block | null,
		del: false,
		dub: false,
		tabs: 'role',
		currentRole: { id: 0, label: 'Роль 1', selected: true },
	}),
	getters: {},
	actions: {
		toggleDrawer() {
			this.drawer1 = !this.drawer1
		},
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
		unselectForm() {
			this.formSelected = false
		},
		setField(e: Field | null) {
			this.currentField = e
		},
		setCurrentBlock(e: Block | null) {
			this.currentBlock = e
		},
		selectRole(e: Role) {
			this.currentRole = e
		},
	},
})
