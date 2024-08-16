<script setup lang="ts">
import { reactive } from 'vue'
import { useForms } from '@/stores/forms'

const myform = useForms()
// import { useStore } from '@/stores/store'

// const store = useStore()

// const select = (e: Role) => {
// 	roles.map((item) => {
// 		item.selected = false
// 	})
// 	e.selected = true
// 	store.selectRole(e)
// }
</script>

<template lang="pug">
.bl
	h5 Роли
	q-list(separator)
		q-item(clickable v-for="role in myform.allRoles" :key="role.id" @click="select(role)" :class="{selected: role.selected}")
			q-item-section(avatar)
				q-icon(name="mdi-account-circle-outline")
			q-item-section {{ role.name }}
			// q-item-section {{ role.description }}
			q-item-section(side)
			q-btn(flat round dense icon="mdi-trash-can-outline" @click="" size="sm") 

	br
	q-btn(unelevated color="primary" label="Создать роль" @click="") 

</template>

<style scoped lang="scss">
.center {
	display: flex;
	justify-content: center;
	align-items: center;
}
.q-item.selected {
	background: var(--bg-selected);
}
</style>
