<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/stores/store'
import chooseEtapDialog from '@/components/chooseEtapDialog.vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const store = useStore()

const forms = ref([
	{
		id: 0,
		label: 'Создал заявку',
		conditions: [
			{ etap: ['Cоздал заявку'], role: ['Все роли'] },
			{ etap: ['Рассмотреть заявку', 'Отклонить заявку'], role: ['Руководитель', 'Инициатор'] },
		],
	},
	{
		id: 1,
		label: 'Согласовать заявку',
		conditions: [{ etap: ['Согласовал заявку'], role: ['Все роли'] }],
	},
	{
		id: 2,
		label: 'Исправить заявку',
		conditions: [{ etap: ['Исправить заявку'], role: ['Все роли'] }],
	},
	{
		id: 3,
		label: 'Рассмотреть заявку',
		conditions: [{ etap: ['Рассмотреть заявку'], role: ['Все роли'] }],
	},
	{
		id: 4,
		label: 'Обработать отказ',
		conditions: [{ etap: ['Обработать отказ'], role: ['Все роли'] }],
	},
	{
		id: 5,
		label: 'Исполнить заявку',
		conditions: [{ etap: ['Исполнить заявку'], role: ['Все роли'] }],
	},
	{
		id: 6,
		label: 'Принять результаты',
		conditions: [{ etap: ['Принять результаты'], role: ['Все роли'] }],
	},
	{
		id: 7,
		label: 'Заявка отменена',
		conditions: [{ etap: ['Заявка отменена'], role: ['Все роли'] }],
	},
	{
		id: 8,
		label: 'Заявка выполнена',
		conditions: [{ etap: ['Заявка выполнена'], role: ['Все роли'] }],
	},
])

const dialog = ref(false)
const choose = () => {
	dialog.value = !dialog.value
}
const edit = (e: string) => {
	let url = '/' + route.params.id + '/editor/process/' + e
	router.push(url)
}
const options = ['Этап 1', 'Этап 2', 'Этап 3']
const options1 = ['Роль 1', 'Роль 2', 'Роль 3']
const options2 = ['Состояние 1', 'Состояние 2', 'Состояние 3']
</script>

<template lang="pug">
.bl
	h5 Формы
	q-list(separator)
		q-expansion-item(v-for='form in forms' :key='form.id' )
			template(v-slot:header)
				q-item-section(avatar)
					q-icon(name='mdi-list-box-outline')
				q-item-section()
					q-item-label {{ form.label }}
				// q-item-section()
				// 	q-item-label {{ form.etap }}
				q-item-section(side)
					.row.q-gutter-x-sm
						q-btn(flat round icon='mdi-pencil-outline' color='primary' dense size='sm' @click.stop='') 
						q-btn(flat round icon='mdi-content-duplicate' color='primary' dense size='sm' @click.stop='') 
						q-btn(flat round icon='mdi-trash-can-outline' color='primary' dense size='sm' @click.stop='') 
			q-card
				q-card-section
					.grd
						.hd Условия показа формы:
						q-markup-table(flat)
							thead
								tr
									th.text-left Роли
									th.text-left Этапы
							tbody
								tr(v-for="item in form.conditions")
									td
										span(v-for="e in item.role") {{ e }}
									td
										span(v-for="a in item.etap") {{ a }}

	br
	q-btn(unelevated color="primary" label="Создать форму" @click="") 
chooseEtapDialog(v-model="dialog")
</template>

<style scoped lang="scss">
:deep(.q-expansion-item--expanded .q-expansion-item__container) {
	border: 1px solid $primary;
	margin-bottom: 1rem;
}
.hd {
	font-size: 1rem;
	font-weight: 600;
}
.grd {
	display: grid;
	grid-template-columns: auto 1fr;
	column-gap: 4rem;
}
th {
	font-weight: 600;
	background: #eee;
	padding: 0.3rem 1rem;
}
.q-table thead tr,
.q-table tbody td {
	height: initial;
}
td span {
	margin-right: 1rem;
}
</style>
