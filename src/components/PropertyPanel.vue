<script setup lang="ts">
import { ref } from 'vue'
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from '@/stores/store'
import CommonLib from '@/components/CommonLib.vue'
import FieldList from '@/components/FieldList.vue'

const store = useStore()
const router = useRouter()
const route = useRoute()

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
</script>

<template lang="pug">
.prop
	q-tabs(v-model="store.tabs" dense active-color="primary" indicator-color="primary" inline-label)
		q-tab(name="property" icon="mdi-tune-variant" label="Свойства")
		q-tab(name="lib" icon="mdi-book-outline" label="Библиотека" v-if="route.name == 'Этап'")
	q-separator
	q-tab-panels(v-model="store.tabs" animated)
		q-tab-panel(name="property")

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

				.show Условия показа формы
				q-table(:columns='cols' :rows='rows' hide-bottom flat)


				q-btn(flat color="primary" icon='mdi-plus' label="Добавить") 
				br
				q-btn.btn(unelevated color="primary" label="Настроить форму" @click="goto(store.currentBO.name)") 

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

		q-tab-panel(name="lib")
			CommonLib
</template>

<style scoped lang="scss">
.grid {
	padding: 1rem;
	display: grid;
	grid-template-columns: auto 1fr;
	column-gap: 1rem;
	row-gap: 0.5rem;
}
.prop {
	background: #fff;
	margin-left: 0.5rem;
	height: var(--panel-height);
}
.btn {
	display: block;
	margin: 1rem auto;
}
.q-tab-panel {
	padding: 0;
}
.show {
	font-size: 0.9rem;
	margin: 0 1rem;
	margin-top: 1rem;
}
</style>
