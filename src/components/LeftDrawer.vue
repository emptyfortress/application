<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/stores/store'

const route = useRoute()
const router = useRouter()
const store = useStore()

const modelValue = defineModel()
const draw = ref(true)

const pages = [
	{
		id: 3,
		title: 'Роли',
		name: 'mask1',
		url: '/role',
	},
	{
		id: 4,
		title: 'Процессы',
		icon: 'mdi-shuffle-variant',
		url: '/process',
	},
	{
		id: 5,
		title: 'Субъекты',
		name: 'subject',
		url: '/subject',
	},
	{
		id: 6,
		title: 'Реестры',
		name: 'sheet',
		url: '/list',
	},
]
const mini = ref(true)

const calcColor = (to: string) => {
	return route.path == to ? 'white' : ''
}

const goToApp = () => {
	// const url = '/app/' + store.page
	// router.push(url)
}
</script>

<template lang="pug">
q-drawer(v-model="draw" show-if-above behavior="desktop" side="left" :width="240" :mini="modelValue")
	q-list.q-mt-lg
		q-item(clickable to="/")
			q-item-section(avatar)
				q-icon(name="mdi-home-roof")
			q-item-section
				q-item-label Старт
		q-item(clickable @click="goToApp")
			q-item-section(avatar)
				q-icon(name="mdi-arrow-left-circle-outline")
			q-item-section
				q-item-label Назад
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
.q-item:first-child {
	margin-bottom: 2rem;
}
</style>
