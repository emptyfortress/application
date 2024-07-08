<script setup lang="ts">
import { ref, computed } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/stores/store'
import { gsap } from 'gsap'

const route = useRoute()
const router = useRouter()
const store = useStore()

const modelValue = defineModel()

const pages = [
	{
		id: 0,
		title: 'Процесс',
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
		id: 7,
		title: 'Состояния',
		icon: 'mdi-state-machine',
		url: '/editor/state',
	},
	{
		id: 6,
		title: 'Списки',
		icon: 'mdi-script-text-outline',
		url: '/editor/lists',
	},
]
const mini = ref(false)

const show = computed(() => {
	return route.name == 'home' ? false : true
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
const calcUrl = computed(() => {
	return '/'
	// return '/' + store.app.name
})
const navigate = (page: any) => {
	// store.setEditor(page.title)
	// store.setEtap(null)
	// router.push(page.url)
}
</script>

<template lang="pug">
q-drawer.rel(v-model="modelValue" behavior="desktop" side="left" :width="220" :mini="store.mini")
	transition(@enter="enter" @leave="leave" :css="false" mode="out-in")

		q-list(v-if="show")
			q-item(clickable v-ripple v-for="page in pages" :to="page.url" @click="navigate(page)")
				q-item-section(avatar)
					q-icon(:name="page.icon")
				q-item-section
					q-item-label {{ page.title }}

	q-btn(v-if="show" flat round color="primary"  @click="store.mini = !store.mini" dense) 
		q-icon(v-if="!store.mini" name="mdi-backburger")
		q-icon(v-else name="mdi-forwardburger")
</template>

<style scoped lang="scss">
:deep(.q-drawer) {
	background: transparent;
}
.q-item.q-router-link--active {
	background: $primary;
	color: white;
}
.q-btn {
	position: absolute;
	left: 1rem;
	bottom: 1rem;
}
</style>
