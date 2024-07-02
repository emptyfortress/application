import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
	state: () => ({
		mini: false,
		currentNode: null as Stat | null,
		// appList: [
		// 	{
		// 		id: '0',
		// 		name: 'Заявка',
		// 		title: 'Заявка',
		// 		version: '0.1.5',
		// 		descr: 'Простая заявка',
		// 		author: 'Орлов П.С.',
		// 		created: '2023-10-14',
		// 	},
		// 	{
		// 		id: '1',
		// 		name: 'Архив',
		// 		title: 'Архив',
		// 		version: '0.1.5',
		// 		descr: 'Пример архива без процессов',
		// 		author: 'Орлов П.С.',
		// 		created: '2023-10-14',
		// 	},
		// ],
		// app: {
		// 	id: '1',
		// 	name: 'Архив',
		// 	title: 'Архив',
		// 	version: '0.1.5',
		// 	descr: 'Пример архива без процессов',
		// 	author: 'Орлов П.С.',
		// 	created: '2023-10-14',
		// } as App,
		// editor: '',
		// etap: null as null | string,
	}),
	getters: {},
	actions: {
		setCurrentNode(e: Stat | null) {
			this.currentNode = e
		},
		// addAppToList(e: App) {
		// 	this.appList.push(e)
		// },
		// setApp(e: App) {
		// 	this.app = e
		// },
		// setEditor(e: string) {
		// 	this.editor = e
		// },
		// setEtap(e: string | null) {
		// 	this.etap = e
		// },
	},
})
