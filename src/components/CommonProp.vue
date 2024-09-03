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
import ConditionDialogChoose from '@/components/ConditionDialogChoose.vue'

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

const goto = () => {
	myform.zay = false
	myform.newform = true
	let e = myform.currentEtap
	router.push(`/${route.params.id}/editor/process/${e}`)
}
const goto1 = (e: string) => {
	myform.zay = false
	router.push(`/${route.params.id}/editor/process/${e}`)
}

const defaultForm = computed(() => {
	let tmp = myform.conditionList.filter(
		(el: Condition) => el.etap == myform.currentEtap && el.role == myrole.currentRole
	)
	return tmp.length == 0 ? true : false
})
const def = computed(() => {
	let tmp = myform.conditionList.filter(
		(el: Condition) => el.etap == myform.currentEtap && el.role == myrole.currentRole
	)
	return tmp[0]?.form
})

const dialogAdd = ref(false)
const toggle2 = () => {
	dialogAdd.value = !dialogAdd.value
}

const calcFormName = computed(() => {
	switch (myform.currentBO.name) {
		case 'Создал Заявку':
			return 'Создание'
		case 'Принять результаты':
			return 'Архив'
		default:
			return 'Просмотр'
	}
})

const goto2 = (e: string) => {
	myform.toggleZay()
	myform.setZayForm(e)
	router.push(`/${route.params.id}/editor/process/${e}`)
}
</script>

<template lang="pug">

template(v-if="route.name == 'Представление'")
	FieldList

template(v-if="route.name == 'Процесс' && !!myform.currentBO")
	q-card-section
		h6.text-center {{ myform.currentBO.name }}
	.grid
		div Название:
		.text-bold(v-if='myform.currentBO.$type == "bpmn:ExclusiveGateway"') Шлюз
		.sec(v-if='myform.currentBO.$type == "bpmn:ExclusiveGateway"') (пользователь может выполнить одно из исходящих действий)
		.text-bold(v-else) {{ myform.currentBO.name }}

		template(v-if='myform.currentBO.$type == "bpmn:Task" || myform.currentBO.$type == "bpmn:StartEvent" || myform.currentBO.$type == "bpmn:EndEvent"')
			div Исполнитель:
			.text-bold {{myrole.currentRole}}

			div Исходы:
			div
				.text-bold(v-for="item in myform.currentBO.outgoing") {{ item.name }}
			template(v-if='myform.currentBO.$type == "bpmn:Task"')
				div Срок:
				div 25 сентября 2024 г.
				// .sec
				// 	FormKit(type='textarea' label='Описание:' v-model="desc" placeholder='Это текст в шапке задания (формы), который увидят исполнители')



			template(v-if='app.text == "Заявка"')
				.text-bold.q-mt-lg Исполнитель работает с формой:
				.q-mt-lg
					span.btd(@click='goto2(calcFormName)') {{ calcFormName }}
						q-tooltip Редактировать форму
					q-btn(flat color="primary" label="Выбрать" @click='' size='sm') 

			template(v-else)
				.text-bold.q-mt-lg Исполнитель работает с формой:
				.q-mt-lg
					q-btn(v-if='defaultForm' unelevated color="primary" label="Создать" @click='goto' size='sm') 
					span.btd(@click='goto1(def)') {{ def }}
						q-tooltip Редактировать форму
					q-btn(v-if='myform.formList.length' flat color="primary" label="Выбрать" @click='toggle2' size='sm') 

	br
	br
	WhatSee


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
	q-btn.btn(v-if='myform.currentBO && myform.currentBO.$type == "bpmn:Task"' outline color="primary" icon='mdi-play' label='Проверка работы приложения с текущего этапа' @click='emulate') 
		q-tooltip Эмуляция работы приложения
	q-btn.btn(v-else outline color="primary" icon='mdi-play' label='Проверка работы приложения' @click='emulate') 
		q-tooltip Эмуляция работы приложения

ConditionDialogChoose(v-model="dialogAdd")
</template>

<style scoped lang="scss">
.grid {
	padding: 0 1rem;
	display: grid;
	grid-template-columns: 170px 2fr;
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
	margin-top: 5rem;
	.btn {
		margin: 0 0.25rem;
	}
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
