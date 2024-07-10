<script setup lang="ts">
import { useStore } from '@/stores/store'
const store = useStore()

const forms = [
	{ id: 0, name: 'Создал заявку', etap: ['Cоздал заявку'] },
	{ id: 1, name: 'Согласовать заявку', etap: ['Согласовал заявку', 'Исправил заявку'] },
	{ id: 2, name: 'Исправить заявку', etap: ['Исправил заявку'] },
	{ id: 3, name: 'Рассмотреть заявку', etap: ['Согласовал заявку'] },
	{ id: 4, name: 'Обработать отказ', etap: ['Согласовал заявку'] },
	{ id: 5, name: 'Исполнить заявку', etap: ['Согласовал заявку'] },
	{ id: 6, name: 'Принять результаты', etap: ['Принял результаты'] },
	{ id: 7, name: 'Заявка отменена', etap: [] },
	{ id: 8, name: 'Заявка выполнена', etap: [] },
]
const cols = [
	{
		name: 'name',
		label: 'Название',
		field: 'name',
		align: 'left',
		sortable: true,
	},
	{
		name: 'etap',
		label: 'Этапы',
		field: 'etap',
		align: 'left',
		sortable: true,
	},
	{
		name: 'actions',
		label: '',
		field: 'actions',
		align: 'right',
		sortable: false,
	},
]
const pagination = {
	rowsPerPage: 0,
}
const choose = (e) => {
	console.log(e)
}
</script>

<template lang="pug">
.bl
	q-table(flat :columns="cols" :rows="forms" :pagination="pagination")
		template(v-slot:body-cell-etap="props")
			q-td.cursor-pointer(:props="props" @click="choose(props.row.etap)")
				q-chip(dense v-for="item in props.value") {{ item }}

		template(v-slot:body-cell-actions="props")
			q-td.text-right
				.q-gutter-x-sm
					q-btn(flat round dense icon="mdi-pencil" color="primary" @click="" size="sm") 
					q-btn(flat round dense icon="mdi-content-duplicate" color="primary" @click="" size="sm") 
					q-btn(flat round dense icon="mdi-trash-can-outline" color="primary" @click="" size="sm") 

	br
	q-btn(unelevated color="primary" label="Создать форму" @click="") 

</template>

<style scoped lang="scss">
.bl {
	background: #fff;
	height: var(--panel-height);
	padding: 1rem;
	margin-right: 0.25rem;
}
// .q-btn {
// 	display: inline-flex;
// }
</style>
