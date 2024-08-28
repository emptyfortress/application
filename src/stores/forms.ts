import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { uid } from 'quasar'
import { useStore } from '@/stores/store'

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
	const setZayForm = (e: string) => {
		zayform.value = e
	}

	// это кнопки на форме сверху ***********************
	const notMain = ref(false)
	const bt = computed(() => {
		let mybt = currentBO.value.outgoing?.filter((item: any) => {
			return item.name !== undefined
		})
		// return mybt
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
	})

	const newform = ref(false)
	const showBt = computed(() => {
		return bt.value.length > 0 ? true : false
	})

	const formList = ref<Form[]>([])

	const conditionList = ref<Condition[]>([])

	const addCondition = (e: Condition) => {
		conditionList.value.push(e)
	}
	const removeCondition = (e: Form) => {
		let n = formList.value.findIndex((item) => {
			return item == e
		})
		conditionList.value.splice(n, 1)
	}

	const createForm = (form: string) => {
		let row = {
			id: uid(),
			name: form,
			selected: false,
		}
		formList.value.push(row)
	}

	// navigation
	const store = useStore()

	const calcNav = computed(() => {
		if (store.currentNode && store.currentNode.data.text == 'Заявка') {
			switch (currentBO.value?.name) {
				case 'Создал Заявку':
					return '/nav1.png'
				case 'Согласовать заявку':
					return '/nav2.png'
				case 'Исправить заявку':
					return '/nav3.png'
				case 'Рассмотреть заявку':
					return '/nav4.png'
				case 'Обработать отказ':
					return '/nav5.png'
				case 'Исполнить заявку':
					return '/nav6.png'
				case 'Принять результаты':
					return '/nav7.png'
				default:
					return '/nav0.png'
			}
		} else return '/preview.png'
	})

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
		createForm,
		// removeForm,
		zay,
		zayform,
		toggleZay,
		setZayForm,
		calcNav,
	}
})
