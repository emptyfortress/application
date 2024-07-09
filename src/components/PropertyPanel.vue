<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/stores/store'

const store = useStore()
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

// const prop2 = [
// 	{ id: 0, label: 'Название' },
// 	{ id: 1, label: 'Исполнитель' },
// 	{ id: 2, label: 'Инструкция пользователя' },
// 	{ id: 3, label: 'Название состояния карточки' },
// 	{ id: 4, label: 'Трудоемкость, ч' },
// 	{ id: 5, label: 'Трудоемкость, р' },
// 	{ id: 6, label: 'Дата начала исполнения' },
// 	{ id: 7, label: 'Плановый срок исполнения' },
// 	{ id: 8, label: 'Реальный срок исполнения' },
// 	{ id: 8, label: 'Реальный срок исполнения' },
// ]
</script>

<template lang="pug">
.prop
	template(v-if="!!store.currentBO")
		q-list
			q-item.ani(clickable)
				q-item-section type: {{ store.currentBO.type }}
			q-item.ani(clickable)
				q-item-section name: {{ store.currentBO.name }}
			q-item.ani(clickable)
				q-item-section id: {{ store.currentBO.id }}

	template(v-else)
		q-list
			q-item.ani(clickable v-for="item in prop1" :key="item.id")
				q-item-section {{ item.label }}
</template>

<style scoped lang="scss">
.prop {
	background: #fff;
	margin-left: 0.5rem;
	height: var(--panel-height);
}
</style>
