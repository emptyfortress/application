import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useFlow } from '@/stores/flow'
import { useForms } from '@/stores/forms'
import { useStorage } from '@vueuse/core'

export const useRoles = defineStore('roles', () => {
	// const rolesN = ref<Role[]>([{ id: 'all', name: 'Все остальные', selected: false }])
	const rolesN = ref<Role[]>([])

	const addRole = (role: Role) => {
		rolesN.value.push(role)
	}
	const removeRole = (role: Role) => {
		let ind = rolesN.value.findIndex((item) => {
			return item.name == role.name
		})
		rolesN.value.splice(ind, 1)
	}

	const myflow = useFlow()

	const roles = computed(() => {
		return myflow.lanes.concat(rolesN.value)
	})

	// const roles = computed({
	// 	get: () => {
	// 		return myflow.lanes.concat(rolesN.value)
	// 	},
	// 	set: (val) => {
	// 		rolesN.value = val.filter((item) => item.type !== 'bpmn:Lane')
	// 		myflow.lanes = val.filter((item) => item.type == 'bpmn:Lane')
	// 	}
	// })

	const tempRoles = ref([{ id: 'ini', name: 'Инициатор', trash: false }])
	const addTemp = (e: any) => {
		tempRoles.value.push(e)
	}
	const destroyTemp = (e: number) => {
		tempRoles.value.splice(e, 1)
	}

	const allroles = useStorage('roles', roles.value)

	watch(roles, (val) => {
		if (val) {
			console.log('new')
			allroles.value = [...roles.value]
		}
	})

	const myform = useForms()
	const currentRole = computed(() => {
		return myform.currentBO?.lanes[0].name
	})

	const selectedRole = ref<Role | null>(null)

	const selectRole = (role: Role | null) => {
		selectedRole.value = role
		if (role == null) {
			rolesN.value.map((item) => item.selected = false)
		}
	}

	return {
		allroles,
		rolesN,
		addRole,
		removeRole,
		roles,
		tempRoles,
		currentRole,
		selectedRole,
		selectRole,
		addTemp,
		destroyTemp,
	}
})
