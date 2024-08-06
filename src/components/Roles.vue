<script setup lang="ts">
import { reactive } from 'vue'
import { useStore } from '@/stores/store'

const store = useStore()

const roles = reactive([
	{
		id: 0,
		label: 'Роль 1',
		selected: true,
		description: 'Самая первая роль',
		conditions: [
			{ id: 0, etaps: ['Создал заявку', 'Согласовать заявку'], form: 'Форма 1', dis: true },
		],
	},
	{
		id: 1,
		label: 'Роль 2',
		selected: false,
		description: 'Описание роли',
		conditions: [{ id: 0, etaps: ['Согласовать заявку'], form: 'Форма 2', dis: true }],
	},
	{
		id: 2,
		label: 'Роль 3',
		selected: false,
		description: 'Описание роли',
		conditions: [{ id: 0, etaps: ['Обработать отказ'], form: 'Форма 3', dis: true }],
	},
	{
		id: 3,
		label: 'Роль 4',
		selected: false,
		description: 'Описание роли',
		conditions: [
			{ id: 0, etaps: ['Создал заявку', 'Согласовать заявку'], form: 'Форма 4', dis: true },
		],
	},
])
const select = (e: Role) => {
	roles.map((item) => {
		item.selected = false
	})
	e.selected = true
	store.selectRole(e)
}
</script>

<template lang="pug">
.bl
	h5 Роли
	q-list(separator)

		q-item(clickable v-for="role in roles" :key="role.id" @click="select(role)" :class="{selected: role.selected}")
			q-item-section(avatar)
				q-icon(name="mdi-account-circle-outline")
			q-item-section {{ role.label }}
			q-item-section {{ role.description }}
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
