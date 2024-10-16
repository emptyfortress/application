import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useFlow } from '@/stores/flow'
import { useForms } from '@/stores/forms'
import { useStorage } from '@vueuse/core'

export const useRoles = defineStore('roles', () => {
	const rolesN = ref<Role[]>([{ id: 'all', name: 'Все остальные', selected: false }])

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
		return myform.currentBO.lanes[0].name
	})

	const selectedRole = ref<Role | null>(null)
	const selectRole = (role: Role) => {
		selectedRole.value = role
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
