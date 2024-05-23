<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CreateDialog from '@/components/CreateDialog.vue'

const router = useRouter()
const columns = [
	{
		name: 'name',
		required: true,
		label: 'Название',
		align: 'left',
		field: 'name',
		sortable: true,
	},
	{
		name: 'module',
		required: true,
		label: 'Модуль',
		align: 'left',
		field: 'module',
		sortable: true,
	},
	{
		name: 'descr',
		required: true,
		label: 'Описание',
		align: 'left',
		field: 'descr',
		sortable: true,
	},
	{
		name: 'author',
		required: true,
		label: 'Автор',
		align: 'left',
		field: 'author',
		sortable: true,
	},
	{
		name: 'created',
		required: true,
		label: 'Создано',
		align: 'left',
		field: 'created',
		sortable: true,
	},
]
const rows = ref([
	{
		id: 0,
		name: 'Квартальные цели',
		module: 'Web-клиент',
		descr: 'Здесь описание приложения',
		author: 'Орлов П.С.',
		created: '2023-10-14',
	},
	{
		id: 1,
		name: 'Тестовое приложение',
		module: 'Платформа',
		descr: 'Здесь описание приложения',
		author: 'Орлов П.С.',
		created: '2023-10-12',
	},
	{
		id: 2,
		name: 'Заявка на отпуск',
		module: 'Web-клиент',
		descr: 'Здесь описание приложения',
		author: 'Воробьева А.К.',
		created: '2023-10-14',
	},
])

const goto = (evt: Event, row: any, index: number) => {
	router.push(`/app/${row.name}`)
}

const dialog = ref(false)

const action = () => {
	dialog.value = !dialog.value
}
const create = (e: any) => {
	rows.value.push(e)
}
</script>

<template lang="pug">
q-page(padding)
	.zg Мои приложения ({{rows.length}})
	q-table(flat
		:rows="rows"
		:columns="columns"
		row-key="name"
		@row-click="goto"
		hide-bottom)

	.q-gutter-x-lg
		q-btn.q-mt-sm(flat icon="mdi-plus-circle" color="primary" label="Создать" @click="action") 
		q-btn.q-mt-sm(flat icon="mdi-arrow-right-thick" color="primary" label="Перенести" @click="") 

	CreateDialog(v-model="dialog" @create="create")
</template>

<style scoped lang="scss">
.zg {
	font-size: 1.3rem;
	font-weight: 300;
}
:deep(.q-table th) {
	background: $primary;
	color: white;
}
</style>
