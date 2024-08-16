<script setup lang="ts">
import { ref } from 'vue'
import { useForms } from '@/stores/forms'
import CreateDialog from '@/components/CreateDialog.vue'

const myform = useForms()

const dialog = ref(false)

const selection = ref('')
const select = (e: Role) => {
	selection.value = e.name
	myform.selectRole(e)
}
</script>

<template lang="pug">
.bl
	h5 Роли
	q-list(separator)
		q-item(clickable v-for="role in myform.roles" :key="role.id" @click="select(role)" :class="{selected: role.name == selection}")
			q-item-section(avatar)
				q-icon(name="mdi-account-circle-outline")
			q-item-section {{ role.name }}
			q-item-section(v-if='role.descr') {{ role.descr }}
			q-item-section(side v-if='role.type' )
				q-icon(v-if='role.type' name="mdi-shuffle-variant")
				q-tooltip Используется в процессе
			q-item-section(side v-else)
				q-btn(v-if='!role.type' flat round dense icon="mdi-trash-can-outline" @click="myform.removeRole(role)" size="sm") 

	br
	q-btn(unelevated color="primary" label="Создать роль" @click="dialog = !dialog") 

	CreateDialog(v-model="dialog" mode='role')

</template>

<style scoped lang="scss">
.q-item.selected {
	background: var(--bg-selected);
}
</style>
