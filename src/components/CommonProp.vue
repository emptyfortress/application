<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useStore } from '@/stores/store'
import FieldList from '@/components/FieldList.vue'

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
const cols = [
	{
		name: 'form',
		field: 'form',
		required: true,
		label: 'Форма',
		align: 'left',
		sortable: true,
	},
	{
		name: 'role',
		field: 'role',
		required: true,
		label: 'Роль',
		align: 'left',
		sortable: true,
	},
]
const rows = [
	{
		form: 'Рассмотреть заявку',
		role: 'Контролер',
	},
	{
		form: 'default',
		role: 'Все',
	},
]
const goto = (e: string) => {
	router.push(`/${route.params.id}/editor/process/${e}`)
}
</script>

<template lang="pug">

template(v-if="route.name == 'Представление'")
	FieldList

template(v-if="route.name == 'Процесс' && !!store.currentBO")
	.grid
		div id:
		div {{ store.currentBO.id }}
		div Тип:
		div {{ store.currentBO.type }}
		div Название:
		.text-bold {{ store.currentBO.name }}

	q-btn.btn(unelevated color="primary" label="Настроить форму" @click="goto(store.currentBO.name)") 
	q-btn.btn(unelevated color="primary" label="Редактировать форму" @click="goto(store.currentBO.name)") 

template(v-if="route.name == 'Процесс' && store.currentBO == null")
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
</template>

<style scoped lang="scss">
.grid {
	padding: 1rem;
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
