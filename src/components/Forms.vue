<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/stores/store'
import chooseEtapDialog from '@/components/chooseEtapDialog.vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const store = useStore()

const forms = ref([
	{ id: 0, name: 'Создал заявку', etap: ['Cоздал заявку'] },
	{ id: 1, name: 'Согласовать заявку', etap: ['Согласовал заявку', 'Исправил заявку'] },
	{ id: 2, name: 'Исправить заявку', etap: ['Исправил заявку'] },
	{ id: 3, name: 'Рассмотреть заявку', etap: ['Согласовал заявку'] },
	{ id: 4, name: 'Обработать отказ', etap: ['Согласовал заявку'] },
	{ id: 5, name: 'Исполнить заявку', etap: ['Согласовал заявку'] },
	{ id: 6, name: 'Принять результаты', etap: ['Принял результаты'] },
	{ id: 7, name: 'Заявка отменена', etap: [] },
	{ id: 8, name: 'Заявка выполнена', etap: [] },
])
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

const dialog = ref(false)
const choose = () => {
	dialog.value = !dialog.value
}
const edit = (e: string) => {
	let url = '/' + route.params.id + '/editor/process/' + e
	router.push(url)
}
</script>

<template lang="pug">
.bl
	q-table(flat :columns="cols" :rows="forms" :pagination="pagination")
		template(v-slot:body-cell-name="props")
			q-td(:props="props")
				div Форма "{{ props.row.name }}"
					q-popup-edit(v-model="props.row.name" title="Название формы" auto-save v-slot="scope")
						q-input(v-model="scope.value" dense autofocus counter @keyup.enter="scope.set")

		template(v-slot:body-cell-etap="props")
			q-td.cursor-pointer(:props="props" @click="choose")
				q-chip(dense v-for="item in props.value") {{ item }}

		template(v-slot:body-cell-actions="props")
			q-td.text-right
				.q-gutter-x-sm
					q-btn(flat round dense icon="mdi-pencil" color="primary" @click="edit(props.row.name)" size="sm") 
					q-btn(flat round dense icon="mdi-content-duplicate" color="primary" @click="" size="sm") 
					q-btn(flat round dense icon="mdi-trash-can-outline" color="primary" @click="" size="sm") 

	br
	q-btn(unelevated color="primary" label="Создать форму" @click="") 

chooseEtapDialog(v-model="dialog")
</template>

<style scoped lang="scss"></style>
