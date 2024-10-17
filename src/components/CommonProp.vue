<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useStore } from '@/stores/store'
import FieldList from '@/components/FieldList.vue'
import { useStorage } from '@vueuse/core'
import { useForms } from '@/stores/forms'
import { useRoles } from '@/stores/roles'
// import WhatSee2 from '@/components/WhatSee2.vue'
import StateTable from '@/components/StateTable.vue'
import { ref } from 'vue'

const store = useStore()
const myform = useForms()
const route = useRoute()
const router = useRouter()
const myrole = useRoles()

const app = useStorage('app', localStorage)

const emulate1 = () => {
	router.push('/emulate1/1')
}

const form = ref('Форма 1')

</script>

<template lang="pug">

template(v-if="route.name == 'Представление'")
	FieldList

template(v-if="route.name == 'Процесс' && myform.currentBO == null")
	q-card-section
		h6.text-center {{ app.text }}
		div {{ app.descr }}

template(v-if="route.name == 'Процесс' && !!myform.currentBO && myform.currentBO.$type == 'bpmn:StartEvent'")
	q-card-section
		h6.text-center.q-gutter-x-md Событие:
		.text-center Возникла необходимость в запуске процесса

template(v-if="route.name == 'Процесс' && !!myform.currentBO && myform.currentBO.$type !== 'bpmn:StartEvent'")
	q-card-section
		h6.text-center.q-gutter-x-md
			span(v-if='myform.currentBO.$type == "bpmn:Task"') Задача:
			span(v-if='myform.currentBO.$type == "bpmn:Lane"') Роль:
			span(v-if='myform.currentBO.$type == "bpmn:StartEvent"') Событие:
			span(v-if='myform.currentBO.$type == "bpmn:EndEvent"') Событие:
			span {{ myform.currentBO.name }}

	.grid
		div(v-if='myform.currentBO.$type == "bpmn:ExclusiveGateway" || myform.currentBO.$type == "bpmn:Task" || myform.currentBO.$type == "bpmn:Lane" || myform.currentBO.$type == "bpmn:EndEvent"') Название:
		.text-bold(v-if='myform.currentBO.$type == "bpmn:ExclusiveGateway"') Шлюз
		.sec(v-if='myform.currentBO.$type == "bpmn:ExclusiveGateway"') (пользователь может выполнить одно из исходящих действий)
		.text-bold(v-else) {{ myform.currentBO.name }}

		template(v-if='myform.currentBO.$type == "bpmn:Task" || myform.currentBO.$type == "bpmn:EndEvent"')
			div Исполнитель:
			.text-bold {{ myrole.currentRole }}
			template(v-if='myform.currentBO.$type == "bpmn:Task"')
				div Срок:
				div 25 сентября 2024 г.

			div Форма:
			q-select(v-model="form" dense filled)

	br
	StateTable(v-if='myform.currentBO.$type == "bpmn:Task" || myform.currentBO.$type == "bpmn:EndEvent"')

template(v-if="route.name == 'Этап' && store.currentField == null && store.currentBlock == null")
	.q-ma-md Здесь общие настройки формы

template(v-if="route.name == 'Этап' && store.currentField == null && store.currentBlock")
	.q-pa-md.text-bold Здесь свойства данного блока

.prev(v-if='route.name == "Процесс" || route.name == "Этап"')
	q-btn.btn(v-if='myform.currentBO && myform.currentBO.$type == "bpmn:Task"' outline color="primary" icon='mdi-play' label='Проверка работы приложения с текущего этапа' @click='emulate1' size='sm') 

</template>

<style scoped lang="scss">
.grid {
	padding: 0 1rem;
	display: grid;
	grid-template-columns: auto 2fr;
	align-items: center;
	column-gap: 2rem;
	row-gap: 1rem;
	line-height: 1.1;
}

.show {
	font-size: 0.9rem;
	margin: 0 1rem;
	margin-top: 1rem;
}

.prev {
	margin: 1rem;
	margin-top: 2rem;
}

.btd {
	color: $primary;
	text-decoration: underline;
	text-align: left;
	cursor: pointer;
}

.sec {
	grid-column: 1/-1;
}

:deep(.formkit-wrapper) {
	max-width: initial;
}

:deep(.formkit-input) {
	font-size: 0.8rem;
}

.fill {
	grid-column: 1/-1;
}
</style>
