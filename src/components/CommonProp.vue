<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from '@/stores/store'
import FieldList from '@/components/FieldList.vue'
import { useStorage } from '@vueuse/core'
import { useForms } from '@/stores/forms'
import { useRoles } from '@/stores/roles'
import WhatSee from '@/components/WhatSee.vue'
import WhatSee1 from '@/components/WhatSee1.vue'

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

const app = useStorage('app', localStorage)

const emulate = () => {
	router.push('/emulate/1')
}
</script>

<template lang="pug">

template(v-if="route.name == 'Представление'")
	FieldList

template(v-if="route.name == 'Процесс' && !!myform.currentBO")
	q-card-section
		h6.text-center {{ myform.currentBO.name }}
	.grid
		// div id:
		// div {{ myform.currentBO.id}}
		div Название:
		.text-bold(v-if='myform.currentBO.$type == "bpmn:ExclusiveGateway"') Шлюз
		.text-bold(v-else) {{ myform.currentBO.name }}

		template(v-if='myform.currentBO.$type == "bpmn:Task" || myform.currentBO.$type == "bpmn:StartEvent" || myform.currentBO.$type == "bpmn:EndEvent"')
			div Исполнитель:
			.text-bold {{myrole.currentRole}}

			div Исходы:
			div
				.text-bold(v-for="item in myform.currentBO.outgoing") {{ item.name }}
			div Срок:
			div 25 сентября 2024 г.

	br
	WhatSee1(v-if='app.text == "Заявка" && (myform.currentBO.$type == "bpmn:Task" || myform.currentBO.$type == "bpmn:StartEvent")')
	WhatSee(v-if='app.text !== "Заявка" && (myform.currentBO.$type == "bpmn:Task" || myform.currentBO.$type == "bpmn:StartEvent") || myform.currentBO.$type == "bpmn:EndEvent"')


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
		.text-bold Название роли
		div Тут свойства роли

.prev(v-if='route.name == "Процесс" || route.name == "Этап"')
	q-btn.btn(v-if='myform.currentBO && myform.currentBO.$type == "bpmn:Task"' outline color="primary" icon='mdi-play' :label='myform.currentBO.name' @click='emulate') 
	q-btn.btn(v-else outline color="primary" icon='mdi-play' :label='app.text' @click='emulate') 
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
.prev {
	margin: 1rem;
	.btn {
		margin: 0 0.25rem;
	}
}
</style>
