import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { uid } from 'quasar'
import { useRoles } from '@/stores/roles'
// import { useFlow } from '@/stores/flow'

export const useForms = defineStore('forms', () => {
	// const myflow = useFlow()

	const currentBO = ref<any>()
	const setCurrentBO = (e: any) => {
		currentBO.value = e
	}

	const currentEtap = computed(() => {
		if (currentBO.value?.$type == 'bpmn:Task' || currentBO.value?.$type == 'bpmn:StartEvent') {
			return currentBO.value.name
		}
		return null
	})

	// это кнопки на форме сверху ***********************
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
	//
	const formList = ref<Form[]>([])
	const addToFormList = (e: Form) => {
		formList.value.push(e)
	}

	const calcList = computed(() => {
		return formList.value.filter((item) => {
			return item.etap == currentBO.value.name
		})
	})
	const removeForm = (e: Form) => {
		let n = formList.value.findIndex((item) => {
			return item == e
		})
		formList.value.splice(n, 1)
	}

	const myrole = useRoles()
	const createForm = (form: string) => {
		let row = {
			id: uid(),
			etap: currentBO.value.name,
			role: myrole.currentRole,
			form: form,
			selected: false,
		}
		formList.value.push(row)
	}
	//
	// const ind = ref<null | number>(null)
	//
	return {
		currentBO,
		currentEtap,
		setCurrentBO,

		//
		// ind,
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
