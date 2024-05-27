<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/stores/store'
import CreateDialog from '@/components/CreateDialog.vue'

const store = useStore()

const roles = ref([
	{
		id: 1,
		name: 'Инициатор',
		icon: 1,
	},
	{
		id: 2,
		name: 'Согласующий',
		icon: 2,
	},
	{
		id: 3,
		name: 'Контролер',
		icon: 3,
	},
])
const dialog = ref(false)

const showDialog = () => {
	dialog.value = !dialog.value
}
const create = (e: any) => {
	roles.value.push(e)
}
const remove = (idx: number) => {
	roles.value.splice(idx, 1)
}
</script>

<template lang="pug">
q-page(padding)
	div {{ store.page }}
	h4 Роли
	br
	.roles
		.role(v-for="(item, index) in roles" :key="item.id")
			q-avatar(color="blue-4" size="56px")
				img(:src="`user${item.icon}.svg`")
			.label {{ item.name }}
			.rule Правила выбора
			.rule Здвеь какие-то правила выбора роли.
			q-card-actions.q-mt-md.full-width
				q-btn(flat round icon="mdi-pencil" color="primary" @click="" size="sm") 
				q-space
				q-btn(flat round icon="mdi-trash-can-outline" color="primary" @click="remove(index)" size="sm") 

		q-btn(unelevated round icon="mdi-plus" color="primary" @click="showDialog") 

	CreateDialog(v-model="dialog" mode="role" @create="create")
</template>

<style scoped lang="scss">
.roles {
	display: flex;
	gap: 0.5rem;
	justify-content: flex-start;
	align-items: center;
}
.role {
	background: #fff;
	padding: 1rem;
	border: 1px solid #ccc;
	display: flex;
	width: 150px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.rule {
	font-size: 0.8rem;
	margin-top: 1rem;
	color: $secondary;
	text-align: center;
	line-height: 1.2;
}
</style>
