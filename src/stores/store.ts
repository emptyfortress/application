import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
	state: () => ({
		mini: false,
		appList: [
			{
				id: '0',
				name: 'Заявка',
				title: 'Заявка',
				version: '0.1.5',
				descr: 'Простая заявка',
				author: 'Орлов П.С.',
				created: '2023-10-14',
			},
			{
				id: '1',
				name: 'Архив',
				title: 'Архив',
				version: '0.1.5',
				descr: 'Пример архива без процессов',
				author: 'Орлов П.С.',
				created: '2023-10-14',
			},
		],
		app: {
			id: '1',
			name: 'Архив',
			title: 'Архив',
			version: '0.1.5',
			descr: 'Пример архива без процессов',
			author: 'Орлов П.С.',
			created: '2023-10-14',
		} as App,

		current: {
			id: 'id',
			type: 'bpmn:Process',
			name: '',
		},

		tabs: 'process',
		formName: '',
		currentField: null as null | BusinessObject,
		lastState: null,
	}),
	getters: {
		startFormName: (state) => 'Форма "' + state.current.name + '"',
	},
	actions: {
		addAppToList(e: App) {
			this.appList.push(e)
		},
		setApp(e: App) {
			this.app = e
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
