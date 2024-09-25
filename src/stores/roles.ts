import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useFlow } from '@/stores/flow'
import { useForms } from '@/stores/forms'

export const useRoles = defineStore('roles', () => {
	const rolesN = ref<Role[]>([
		// { id: 'Lane_0kutmjb', type: 'bpmn:Lane', name: 'Инициатор', selected: false },
		{ id: 'all', name: 'Все остальные', selected: false },
	])

	const addRole = (role: Role) => {
		rolesN.value.push(role)
	}
	const removeRole = (role: Role) => {
		let ind = rolesN.value.findIndex((item) => {
			return item == role
		})
		rolesN.value.splice(ind, 1)
	}

	const myflow = useFlow()

	const roles = computed(() => {
		return myflow.lanes.concat(rolesN.value)
	})

	const myform = useForms()
	const currentRole = computed(() => {
		return myform.currentBO.lanes[0].name
		// if (
		// 	myform.currentBO?.$type == 'bpmn:Task' ||
		// 	myform.currentBO?.$type == 'bpmn:StartEvent' ||
		// 	myform.currentBO?.$type == 'bmpn:EndEvent'
		// ) {
		// 	return myform.currentBO.lanes[0].name
		// }
		// return null
	})

	const selectedRole = ref<Role | null>(null)
	const selectRole = (role: Role) => {
		selectedRole.value = role
	}

	return {
		rolesN,
		addRole,
		removeRole,
		roles,
		currentRole,
		selectedRole,
		selectRole,
	}
})
