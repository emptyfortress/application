<script setup lang="ts">
import { ref } from 'vue'
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from '@/stores/store'
import FieldLib from '@/components/FieldLib.vue'

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
// const tabs = ref('property')
</script>

<template lang="pug">
.prop
	q-tabs(v-model="store.tabs" dense active-color="primary" indicator-color="primary" inline-label)
		q-tab(name="property" icon="mdi-tune-variant" label="Свойства")
		q-tab(name="lib" icon="mdi-book-outline" label="Библиотека" v-if="route.name == 'Этап'")
	q-separator
	q-tab-panels(v-model="store.tabs" animated)
		q-tab-panel(name="property")

			template(v-if="route.name == 'Процесс' && !!store.currentBO")
				.grid
					div id:
					div {{ store.currentBO.id }}
					div Тип:
					div {{ store.currentBO.type }}
					div Название:
					.text-bold {{ store.currentBO.name }}

				q-btn(unelevated color="primary" label="Настроить форму" @click="goto(store.currentBO.name)") 

			template(v-if="route.name == 'Процесс' && store.currentBO == null")
				q-list
					q-item.ani(clickable v-for="item in prop1" :key="item.id")
						q-item-section {{ item.label }}



			template(v-if="route.name == 'Этап' && !!store.currentField")
				.q-pa-md.text-bold {{ store.currentField?.name }}

			template(v-if="route.name == 'Этап' && store.currentField == null && store.currentBlock")
				.q-pa-md.text-bold Здесь свойства данного блока

			template(v-if="route.name == 'Этап' && store.currentField == null && store.currentBlock == null")
				.q-ma-md Здесь общие настройки формы
				br
				br
				br
				.q-ma-md.text-bold Разметка
				q-img(src="@/assets/img/control.png")
				q-img(src="@/assets/img/control1.png")

		q-tab-panel(name="lib")
			FieldLib
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
.q-btn {
	display: block;
	margin: 1rem auto;
}
.q-tab-panel {
	padding: 0;
}
</style>
