<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from '@/stores/store'
import FieldList from '@/components/FieldList.vue'
import { useStorage } from '@vueuse/core'
import draggable from 'vuedraggable'
import ConditionDialog1 from '@/components/ConditionDialog1.vue'
import { useForms } from '@/stores/forms'
import { useRoles } from '@/stores/roles'

const store = useStore()
const myform = useForms()
const route = useRoute()
const router = useRouter()
const myrole = useRoles()

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

const goto = (e: string) => {
	router.push(`/${route.params.id}/editor/process/${e}`)
}

const goto1 = (e: string) => {
	myform.newform = true
	router.push(`/${route.params.id}/editor/process/${e}`)
}
const app = useStorage('app', localStorage)

const dialog = ref(false)

const toggle = () => {
	dialog.value = !dialog.value
}
const emulate = () => {
	router.push('/emulate/1')
}

const list = ref([...myform.calcList])
</script>

<template lang="pug">

template(v-if="route.name == 'Представление'")
	FieldList

template(v-if="route.name == 'Процесс' && !!myform.currentBO")
	q-card-section
		h6.text-center {{ myform.currentBO.name }}
	.grid
		div id:
		div {{ myform.currentBO.id}}
		div Название:
		.text-bold(v-if='myform.currentBO.$type == "bpmn:ExclusiveGateway"') Шлюз
		.text-bold(v-else) {{ myform.currentBO.name }}

		template(v-if='myform.currentBO.$type == "bpmn:Task" || myform.currentBO.$type == "bpmn:StartEvent" || myform.currentBO.$type == "bpmn:EndEvent" || myform.currentBO.$type == "bpmn:ExclusiveGateway"')
			div Исполнитель:
			.text-bold {{ myrole.currentRole }}

			div Исходы:
			div
				.text-bold(v-for="item in myform.currentBO.outgoing") {{ item.name }}

	br
	.q-mx-md(v-if='myform.currentBO.$type == "bpmn:Task" || myform.currentBO.name == "Старт"')
		.text-bold Что видит пользователь?
		q-markup-table(bordered flat)
			thead
				tr
					th.text-left Роль
					th.text-left Форма
					th
			draggable(v-if='myform.calcList.length > 0' v-model="myform.calcList" tag="tbody" item-key="id")
				template(#item="{ element }")
					tr.cursor-pointer(scope='row' @click='toggle')
						td {{ element.role }}
						td 
							span(v-if='!!element.form' @click.stop="goto(element.form)") {{ element.form }}
							q-btn(v-else flat color="primary" label="Создать" @click.stop="goto(myform.currentBO.name, true)" size='sm') 
						td.text-right
							q-btn(flat round color="primary" icon='mdi-trash-can-outline' dense @click.stop="myform.removeForm(element)" size='sm') 
			tbody(v-else)
				tr
					td {{ myrole.currentRole}}
					td(colspan='2')
						q-btn(flat color="primary" label="Создать" @click.stop="goto1(myform.currentBO.name, true)" size='sm') 

		q-btn.q-ma-md(unelevated color="primary" label="Добавить" @click="toggle" size='sm') 

	ConditionDialog1(v-model="dialog")

template(v-if="route.name == 'Процесс' && myform.currentBO == null")
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
td span {
	color: $primary;
	text-decoration: underline;
}
</style>
