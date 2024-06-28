<script setup ulang="ts">
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

const show = computed(() => {
	return route.name == 'home' ? false : true
})
const enter = async (el, done) => {
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
const leave = async (el, done) => {
	await gsap.to('.q-item', {
		duration: 0.4,
		left: -50,
		opacity: 0,
		ease: 'power3.out',
	})
	done()
}
const calcUrl = computed(() => {
	return '/' + store.app.name
})
</script>

<template lang="pug">
q-drawer.rel(v-model="modelValue" show-if-above behavior="desktop" side="left" :width="220" :mini="store.mini")

	transition(@enter="enter" @leave="leave" :css="false" mode="out-in")

		q-list.q-mt-lg(v-if="show")
				q-item(clickable to="/")
					q-item-section(avatar)
						q-icon(name="mdi-home-roof")
					q-item-section
						q-item-label Мои приложения

				q-item(clickable :to="calcUrl")
					q-item-section(avatar)
						q-icon(name="mdi-application-braces-outline")
					q-item-section
						q-item-label {{ store.app.title }}

				q-item(clickable v-ripple v-for="page in pages" :to="page.url")
					q-item-section(avatar)
						q-icon(v-if="page.icon" :name="page.icon")
						SvgIcon.icon(v-if="page.name" :name="page.name")
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
.q-btn {
	position: absolute;
	left: 1rem;
	bottom: 1rem;
}
</style>
