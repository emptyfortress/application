<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/stores/store'
import chooseEtapDialog from '@/components/chooseEtapDialog.vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const store = useStore()

const forms = ref([
	{ id: 0, label: 'Создал заявку', etap: ['Cоздал заявку'], role: ['Все'] },
	{ id: 1, label: 'Согласовать заявку', etap: ['Согласовал заявку'], role: ['Все'] },
	{ id: 2, label: 'Исправить заявку', etap: ['Исправил заявку'], role: ['Все'] },
	{ id: 3, label: 'Рассмотреть заявку', etap: ['Согласовал заявку'], role: ['Все'] },
	{ id: 4, label: 'Обработать отказ', etap: ['Согласовал заявку'], role: ['Все'] },
	{ id: 5, label: 'Исполнить заявку', etap: ['Согласовал заявку'], role: ['Все'] },
	{ id: 6, label: 'Принять результаты', etap: ['Принял результаты'], role: ['Все'] },
	{ id: 7, label: 'Заявка отменена', etap: ['Отмена заяки'], role: ['Все'] },
	{ id: 8, label: 'Заявка выполнена', etap: ['Финиш'], role: ['Все'] },
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
	q-list
		q-expansion-item(v-for='form in forms' :key='form.id' popup)
			template(v-slot:header)
				q-item-section(avatar)
					q-icon(name='mdi-list-box-outline')
				q-item-section()
					q-item-label {{ form.label }}
				q-item-section()
					q-item-label {{ form.etap }}
				q-item-section(side)
					.row.q-gutter-x-sm
						q-btn(flat round icon='mdi-pencil-outline' color='primary' dense size='sm') 
						q-btn(flat round icon='mdi-content-duplicate' color='primary' dense size='sm') 
						q-btn(flat round icon='mdi-trash-can-outline' color='primary' dense size='sm') 
			q-card
				q-card-section
					.grd
						.text-weight-bold Правила выбора
						FormKit(type='select' label='Этап' :options='options')
						FormKit(type='select' label='Роль' :options='options1')
						FormKit(type='select' label='Состояние' :options='options2')
						// q-select(label='Этап' v-model="etapM" :options='etapO' dense filled)
						// q-select(label='Этап' v-model="etapM" :options='etapO' dense filled)

chooseEtapDialog(v-model="dialog")
</template>

<style scoped lang="scss">
:deep(.q-expansion-item--expanded .q-expansion-item__container) {
	border: 1px solid $primary;
}
.grd {
	display: grid;
	grid-template-columns: auto 1fr 1fr 1fr;
	// justify-items: start;
	// align-items: center;
	column-gap: 1rem;
}
</style>
