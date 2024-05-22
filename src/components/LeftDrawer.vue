<script setup lang="ts">
import { ref } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const modelValue = defineModel()
const draw = ref(true)

const pages = [
	{
		id: 0,
		title: 'Старт',
		icon: 'mdi-view-grid-outline',
		url: '/',
	},
	{
		id: 1,
		title: 'Сценарии',
		icon: 'mdi-movie-open',
		url: '/scene',
	},
	{
		id: 2,
		title: 'Роли',
		name: 'mask1',
		url: '/role',
	},
	{
		id: 3,
		title: 'Процессы',
		icon: 'mdi-shuffle-variant',
		url: '/process',
	},
	{
		id: 4,
		title: 'Субъекты',
		name: 'subject',
		url: '/subject',
	},
	{
		id: 5,
		title: 'Реестры',
		name: 'sheet',
		url: '/list',
	},
]
const mini = ref(true)

const calcColor = (to: string) => {
	return route.path == to ? 'white' : ''
}
</script>

<template lang="pug">
q-drawer(v-model="draw" show-if-above behavior="desktop" side="left" :width="240" :mini="modelValue")
	q-list.q-mt-lg
		q-item(clickable v-ripple v-for="page in pages" :to="page.url")
			q-item-section(avatar)
				q-icon(v-if="page.icon" :name="page.icon")
				SvgIcon.icon(v-if="page.name" :name="page.name" :color="calcColor(page.url)")
			q-item-section
				q-item-label {{ page.title }}
</template>

<style scoped lang="scss">
:deep(.q-drawer) {
	background: transparent;
}
.icon {
	height: 24px;
	transform: translateX(-3px);
}
.q-item.q-router-link--active {
	background: $primary;
	color: white;
}
</style>
