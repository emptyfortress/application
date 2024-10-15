<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useStore } from '@/stores/store'
import FieldList from '@/components/FieldList.vue'
import { useStorage } from '@vueuse/core'
import { useForms } from '@/stores/forms'
import { useRoles } from '@/stores/roles'
import WhatSee from '@/components/WhatSee.vue'
import WhatSee1 from '@/components/WhatSee1.vue'
import StateTable from '@/components/StateTable.vue'

const store = useStore()
const myform = useForms()
const route = useRoute()
const router = useRouter()
const myrole = useRoles()

const app = useStorage('app', localStorage)

const emulate = () => {
	router.push('/emulate/1')
}

const emulate1 = () => {
	router.push('/emulate1/1')
}

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
	WhatSee1(v-if='app.text == "Заявка" && (myform.currentBO.$type == "bpmn:Task" || myform.currentBO.$type == "bpmn:StartEvent" || myform.currentBO.$type == "bpmn:EndEvent")')

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

	br
	template(v-if='myform.currentBO.$type == "bpmn:Task" || myform.currentBO.$type == "bpmn:EndEvent"')
		StateTable

	br
	br

	WhatSee1(v-if='app.text == "Заявка" && (myform.currentBO.$type == "bpmn:Task" || myform.currentBO.$type == "bpmn:EndEvent")')
	WhatSee(v-if='app.text !== "Заявка" && (myform.currentBO.$type == "bpmn:Task" || myform.currentBO.$type == "bpmn:EndEvent")')


template(v-if="route.name == 'Этап' && store.currentField == null && store.currentBlock == null")
	.q-ma-md Здесь общие настройки формы

template(v-if="route.name == 'Этап' && store.currentField == null && store.currentBlock")
	.q-pa-md.text-bold Здесь свойства данного блока


.prev(v-if='app.text == "Заявка"')
	q-btn.btn(outline color="primary" icon='mdi-play' label='Проверка работы приложения с текущего этапа' @click='emulate' size='sm') 

.prev(v-if='app.text !== "Заявка" && (route.name == "Процесс" || route.name == "Этап")')
	q-btn.btn(v-if='myform.currentBO && myform.currentBO.$type == "bpmn:Task"' outline color="primary" icon='mdi-play' label='Проверка работы приложения с текущего этапа' @click='emulate1' size='sm') 

</template>

<style scoped lang="scss">
.grid {
	padding: 0 1rem;
	display: grid;
	grid-template-columns: 170px 2fr;
	align-items: start;
	column-gap: 1rem;
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
</style>
