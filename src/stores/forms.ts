import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { uid } from 'quasar'

export const useForms = defineStore('forms', () => {
	const currentBO = ref<any>()
	const setCurrentBO = (e: any) => {
		currentBO.value = e
	}

	const currentEtap = computed(() => {
		if (
			currentBO.value?.$type == 'bpmn:Task' ||
			currentBO.value?.$type == 'bpmn:StartEvent' ||
			currentBO.value?.$type == 'bpmn:EndEvent'
		) {
			return currentBO.value.name
		}
		return null
	})

	// для заявки only
	const zay = ref(false)
	const zayform = ref('create')
	const toggleZay = () => {
		zay.value = !zay.value
	}
	const setZay = (b: boolean) => {
		zay.value = b
	}
	const setZayForm = (e: string) => {
		zayform.value = e
	}

	// это кнопки на форме сверху ***********************
	const notMain = ref(false)
	const desc = ref('Это сопроводительный текст-описание')
	// const setDesc = (s: string) => {
	// 	des
	// 	// description.value = s
	// }
	const bt = computed(() => {
		if (!!currentBO.value) {
			let mybt = currentBO.value.outgoing?.filter((item: any) => {
				return item.name !== undefined
			})
			if (notMain.value == true) return []
			if (!!mybt && mybt.length > 0) return mybt
			else if (
				!!mybt &&
				mybt.length == 0 &&
				currentBO.value.outgoing[0]?.targetRef.$type == 'bpmn:ExclusiveGateway'
			) {
				let alsobt = currentBO.value.outgoing[0]?.targetRef.outgoing.filter((item: any) => {
					return item.name !== undefined
				})
				return alsobt
			} else if (!!mybt && mybt.length == 0) return []
			else return []
		} else return []
	})

	const newform = ref(false)
	const showBt = computed(() => {
		return bt.value.length > 0 ? true : false
	})

	const formList = ref<Form[]>([])

	const conditionList = ref<Condition[]>([])

	// function moveToEnd(arr, key, value) {
	// 	const index = arr.findIndex((obj) => obj[key] === value)
	// 	if (index !== -1) {
	// 		const removed = arr.splice(index, 1)[0]
	// 		arr.push(removed)
	// 	}
	// 	return arr
	// }

	const addCondition = (e: Condition) => {
		conditionList.value.push(e)
		// moveToEnd(conditionList.value, 'role', ['Все остальные'])
	}

	const removeCondition = (e: Form) => {
		// let n = formList.value.findIndex((item) => {
		let n = conditionList.value.findIndex((item) => {
			return item.id == e.id
		})
		conditionList.value.splice(n, 1)
	}

	const createForm = (form: Form) => {
		let row = {
			id: uid(),
			name: form.name,
			desc: form.desc || 'Это описание формы',
			selected: false,
			creation: form.creation,
		}
		formList.value.push(row)
	}

	const removeForm = (e: string) => {
		const ind = formList.value.findIndex((el: Form) => el.name == e)
		if (ind !== undefined) formList.value.splice(ind, 1)
	}

	return {
		currentBO,
		currentEtap,
		setCurrentBO,

		formList,
		conditionList,
		addCondition,
		removeCondition,

		bt,
		showBt,
		notMain,
		newform,
		desc,
		createForm,
		removeForm,

		zay,
		zayform,
		toggleZay,
		setZayForm,
		setZay,
	}
})
