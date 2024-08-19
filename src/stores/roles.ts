import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useFlow } from '@/stores/flow'
import { useForms } from '@/stores/forms'

export const useRoles = defineStore('roles', () => {
	const rolesN = ref<Role[]>([])
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
	// const roles = computed({
	// 	get() {
	// 		return myflow.lanes.concat(rolesN.value)
	// 	},
	// 	set(newValue) {
	// 		myflow.lanes.value = newValue.filter((item: Role) => !!item.type)
	// 		rolesN.value = newValue.filter((item: Role) => item.type == undefined)
	// 	},
	// })

	const myform = useForms()
	const currentRole = computed(() => {
		if (myform.currentBO?.$type == 'bpmn:Task' || myform.currentBO?.$type == 'bpmn:StartEvent') {
			return myform.currentBO.lanes[0].name
		}
		return null
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
