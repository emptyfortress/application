<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/stores/store'
import draggable from 'vuedraggable'
import AddFieldDialog from '@/components/AddFieldDialog.vue'

const store = useStore()
const dialog = ref(false)

const list1 = ref([
	{ visible: true, readonly: true, type: 'Сотрудник', label: 'Автор', name: 'Автор', id: 1 },
	{
		visible: true,
		readonly: true,
		type: 'Дата',
		label: 'Дата создания',
		name: 'Дата создания',
		id: 2,
	},
	{
		visible: true,
		readonly: false,
		type: 'Дата',
		label: 'Дата изменения',
		name: 'Дата изменения',
		id: 3,
	},
	{ visible: true, readonly: false, type: 'Строка', label: 'Название', name: 'Название', id: 4 },
	{ visible: true, readonly: false, type: 'Текст', label: 'Содержание', name: 'Содержание', id: 5 },
	{
		visible: true,
		readonly: false,
		type: '???',
		label: 'Результат исполнения',
		name: 'Результат исполнения',
		id: 6,
	},
])

const addField = (tmp: any) => {
	list1.value.push(tmp)
}
</script>

<template lang="pug">
q-drawer.rel(v-model="store.drawer1" side="left" :width="240" overlay bordered elevated)
	q-btn.close(flat round dense icon="mdi-close-circle" color="primary" @click="store.toggleDrawer") 
	.sid
		.zg Доступные поля:

	draggable(
		class="list-group"
		:list="list1"
		ghost-class="ghost"
		:group="{ name: 'people', pull: 'clone', put: false }"
		itemKey="id")

		template(#item="{ element, index }")
			.node
				.name {{ element.name }}

	q-btn.q-mt-md(flat icon="mdi-plus-circle-outline" color="primary" @click="dialog = !dialog" label="Добавить поле") 

AddFieldDialog(v-model="dialog" @create="addField")
</template>

<style scoped lang="scss">
.sid {
	padding: 1rem;
}
.zg {
	font-weight: 600;
}
.hh {
	font-size: 0.8rem;
	border-bottom: 1px solid #ccc;
}
.node {
	padding: 5px 1rem;
	background: #fff;
	cursor: pointer;
	// display: grid;
	// grid-template-columns: 1fr 1fr 0.5fr;
	&:hover {
		background: #eee;
	}
	&.ghost {
		opacity: 0.5;
		background: #c8ebfb;
	}
}
.close {
	position: absolute;
	top: 0.3rem;
	right: 0.3rem;
}
</style>
