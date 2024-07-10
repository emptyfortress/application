<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/stores/store'
import { gsap } from 'gsap'

const route = useRoute()
const router = useRouter()
const store = useStore()

const modelValue = defineModel()

const par = computed(() => {
	return route.params.id
})

// const calcUrl = (e: string) => {
// 	return '/' + route.params.id + '/editor/' + e
// }

// watch(
// 	() => route.fullPath,
// 	(newPath, oldPath) => {
// 		par.value = newPath.split('/')[1]
// 	}
// )

const pages = reactive([
	{
		id: 0,
		title: 'Процесс',
		icon: 'mdi-shuffle-variant',
		url: 'process',
	},
	{
		id: 1,
		title: 'Формы',
		icon: 'mdi-list-box-outline',
		url: 'forms',
	},
	{
		id: 1,
		title: 'Роли',
		icon: 'mdi-account-circle-outline',
		url: 'roles',
		// url: `/${par.value}/editor/roles`,
	},
	// {
	// 	id: 7,
	// 	title: 'Состояния',
	// 	icon: 'mdi-state-machine',
	// 	// url: `/${par.value}/editor/state`,
	// },
	{
		id: 6,
		title: 'Списки',
		icon: 'mdi-script-text-outline',
		url: 'lists',
		// url: `/${par.value}/editor/lists`,
	},
])
const mini = ref(false)

const show = computed(() => {
	return route.path.includes('editor') ? true : false
})
const enter = async (el: any, done: any) => {
	await gsap.from('.q-item', {
		y: 50,
		opacity: 0,
		delay: 0.1,
		duration: 0.3,
		stagger: 0.1,
		ease: 'power3.out',
	})
	done()
}
const leave = async (el: any, done: any) => {
	await gsap.to('.q-item', {
		duration: 0.4,
		left: -50,
		opacity: 0,
		ease: 'power3.out',
	})
	done()
}
const navigate = (url: string) => {
	let temp = '/' + route.params.id + '/editor/' + url
	router.push(temp)
}
const calcClass = (e: string) => {
	let temp = '/' + route.params.id + '/editor/' + e
	if (temp == route.path) return 'active'
}
</script>

<template lang="pug">
q-drawer.rel(v-model="modelValue" behavior="desktop" side="left" :width="220" :mini="store.mini")
	transition(@enter="enter" @leave="leave" :css="false" mode="out-in")

		q-list
			q-item(clickable v-ripple v-for="page in pages" :key="page.id" @click="navigate(page.url)" :class="calcClass(page.url)")
				q-item-section(avatar)
					q-icon(:name="page.icon")
				q-item-section
					q-item-label {{ page.title }}

	q-btn(flat round color="primary"  @click="store.mini = !store.mini" dense) 
		q-icon(v-if="!store.mini" name="mdi-backburger")
		q-icon(v-else name="mdi-forwardburger")
</template>

<style scoped lang="scss">
:deep(.q-drawer) {
	background: transparent;
}
.q-item.q-router-link--active,
.active {
	background: $primary;
	color: white;
}
.q-btn {
	position: absolute;
	left: 1rem;
	bottom: 1rem;
}
</style>
