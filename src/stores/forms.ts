import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

type Row = {
	etap: string
	role: string
	form: string
}

export const useForms = defineStore('forms', () => {
	const allBO = ref<any[]>([])
	const setAllBO = (e: any) => {
		allBO.value = e
	}

	const currentBO = ref()
	const setCurrentBO = (e: any) => {
		currentBO.value = e
	}

	const currentRole = computed(() => {
		return currentBO.value.lanes[0].name
	})
	const currentEtap = computed(() => {
		return currentBO.value.name
	})
	const roles = computed(() => {
		return currentBO.value.$parent.laneSets[0].lanes
	})

	// это кнопки на форме сверху
	const bt = computed(() => {
		let mybt = currentBO.value.outgoing.filter((item: any) => {
			return item.name !== undefined
		})
		// return mybt
		if (mybt.length > 0) return mybt
		else if (
			mybt.length == 0 &&
			currentBO.value.outgoing[0].targetRef.$type == 'bpmn:ExclusiveGateway'
		) {
			let alsobt = currentBO.value.outgoing[0].targetRef.outgoing.filter((item: any) => {
				return item.name !== undefined
			})
			return alsobt
		} else if (mybt.length == 0) return []
	})

	const newform = ref(false)
	const showBt = computed(() => {
		return bt.value.length > 0 ? true : false
	})

	const formList = ref<Row[]>([])
	const addToFormList = (e: Row) => {
		formList.value.push(e)
	}

	const calcList = computed(() => {
		return formList.value.filter((item) => {
			return item.etap == currentBO.value.name
		})
	})
	const removeForm = (e: Row) => {
		let n = formList.value.findIndex((item) => {
			return item == e
		})
		formList.value.splice(n, 1)
	}

	const createForm = (form: string) => {
		let row = { etap: currentBO.value.name, role: currentRole.value, form: form }
		formList.value.push(row)
	}

	const ind = ref<null | number>(null)

	return {
		allBO,
		setAllBO,

		currentBO,
		currentRole,
		currentEtap,
		roles,
		setCurrentBO,

		ind,
		formList,
		addToFormList,
		calcList,
		bt,
		showBt,
		newform,
		createForm,
		removeForm,
	}
})
