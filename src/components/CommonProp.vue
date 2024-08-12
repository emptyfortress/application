<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from '@/stores/store'
import FieldList from '@/components/FieldList.vue'
import { useStorage } from '@vueuse/core'
import draggable from 'vuedraggable'
import ConditionDialog1 from '@/components/ConditionDialog1.vue'

const store = useStore()
const route = useRoute()
const router = useRouter()

const prop1 = [
	{ id: 0, label: 'Владелец процесса' },
	{ id: 1, label: 'Инструкции для пользователей процесса' },
	{ id: 2, label: 'Инициатор процесса' },
	{ id: 3, label: 'Плановая продолжительность' },
	{ id: 4, label: 'Плановая суммарная трудоемкость' },
	{ id: 5, label: 'Реальная продолжительность' },
	{ id: 5, label: 'Реальная трудоемкость, ч/ч' },
	{ id: 5, label: 'Реальная трудоемкость, руб' },
]
const list = ref([
	{
		id: 0,
		role: 'Инициатор',
		form: null,
	},
	{
		id: 1,
		role: 'Все остальные',
		form: null,
	},
])

const goto = (e: string) => {
	router.push(`/${route.params.id}/editor/process/${e}`)
}
const app = useStorage('app', localStorage)
// const bo = ref(useStorage('bo', {}))

const dialog = ref(false)
const toggle = () => {
	dialog.value = !dialog.value
}
const add = (e: any) => {
	list.value.push(e)
}
const remove = (n: number) => {
	list.value.splice(n, 1)
}
const emulate = () => {
	router.push('/emulate/1')
}
</script>

<template lang="pug">

template(v-if="route.name == 'Представление'")
	FieldList

template(v-if="route.name == 'Процесс' && !!store.currentBO")
	q-card-section
		h6.text-center {{ store.currentBO.name }}
	.grid
		div Название:
		.text-bold(v-if='store.currentBO.$type == "bpmn:ExclusiveGateway"') Шлюз
		.text-bold(v-else) {{ store.currentBO.name }}
		template(v-if='store.currentBO.$type == "bpmn:Task"')
			div Исполнитель:
			.text-bold {{ store.currentBO.lanes[0]?.name }}

			div Исходы:
			div
				.text-bold(v-for="item in store.currentBO.outgoing") {{ item.name }}

	br
	.q-mx-md(v-if='store.currentBO.$type == "bpmn:Task"')
		.text-bold Что видит пользователь?
		q-markup-table(bordered flat)
			thead
				tr
					th.text-left Роль
					th.text-left Форма
					th
			draggable(v-model="list" tag="tbody" item-key="id")
				template(#item="{ element, index }")
					tr(scope='row' @click='toggle')
						td {{ element.role }}
						td
							span(v-if='!!element.form') {{ element.form }}
							q-btn(v-else flat color="primary" label="Создать" @click.stop="goto(store.currentBO.name)" size='sm') 
						td.text-right
							q-btn(v-if='element.form' flat round color="primary" icon='mdi-pencil-outline' dense @click.stop="goto(store.currentBO.name)" size='sm') 
							q-btn(v-if='element.form' flat round color="primary" icon='mdi-trash-can-outline' dense @click.stop="remove(index)" size='sm') 

		q-btn.q-ma-md(unelevated color="primary" label="Добавить" @click="toggle" size='sm') 

	ConditionDialog1(v-model="dialog" @add='add')

template(v-if="route.name == 'Процесс' && store.currentBO == null")
	q-card-section
		h6.text-center {{ app.text }}
		q-list
			q-item.ani(clickable v-for="item in prop1" :key="item.id")
				q-item-section {{ item.label }}



template(v-if="route.name == 'Этап' && !!store.currentField")
	.q-pa-md.text-bold {{ store.currentField?.name }}
	.q-ma-md
		FormKit(type='text' label='Название поля')
		FormKit(type='text' label='Метка' v-model='store.currentField.name')
		FormKit(type='checkbox' label='Readonly')
		FormKit(type='checkbox' label='Visible')

template(v-if="route.name == 'Этап' && store.currentField == null && store.currentBlock")
	.q-pa-md.text-bold Здесь свойства данного блока

template(v-if="route.name == 'Этап' && store.currentField == null && store.currentBlock == null")
	.q-ma-md Здесь общие настройки формы
	.q-ma-md.text-red Выбор карточки для текущей функции
	.q-ma-md.text-red Состояния карточки

template(v-if='route.name == "Роли"')
	.q-pa-md
		.text-bold {{ store.currentRole?.label }}
		div Тут свойства роли

template(v-if='route.name == "Процесс" || route.name == "Этап"')
	br
	q-btn.btn(outline color="primary" icon='mdi-play' label='Запустить процесс' @click='emulate') 
</template>

<style scoped lang="scss">
.grid {
	padding: 0 1rem;
	display: grid;
	grid-template-columns: auto 1fr;
	column-gap: 1rem;
	row-gap: 0.5rem;
}
.show {
	font-size: 0.9rem;
	margin: 0 1rem;
	margin-top: 1rem;
}
.btn {
	display: block;
	margin: 1rem auto;
}
</style>
