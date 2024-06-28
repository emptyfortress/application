<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/stores/store'

const route = useRoute()
const router = useRouter()
const store = useStore()

const modelValue = defineModel()

const pages = [
	{
		id: 0,
		title: 'Процессы',
		icon: 'mdi-shuffle-variant',
		url: '/editor/process',
	},
	{
		id: 1,
		title: 'Формы',
		icon: 'mdi-list-box-outline',
		url: '/editor/forms',
	},
	{
		id: 1,
		title: 'Роли',
		icon: 'mdi-account-circle-outline',
		url: '/editor/roles',
	},
	{
		id: 6,
		title: 'Списки',
		icon: 'mdi-script-text-outline',
		url: '/editor/lists',
	},
]
const mini = ref(false)
</script>

<template lang="pug">
q-drawer(v-model="modelValue" show-if-above behavior="desktop" side="left" :width="220" :mini="store.mini")
	q-list.q-mt-lg
		q-item(v-if="route.name == 'main'" clickable to="/")
			q-item-section(avatar)
				q-icon(name="mdi-home-roof")
			q-item-section
				q-item-label {{ route.params.id }}

		q-item(clickable v-ripple v-for="page in pages" :to="page.url")
			q-item-section(avatar)
				q-icon(v-if="page.icon" :name="page.icon")
				SvgIcon.icon(v-if="page.name" :name="page.name")
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
