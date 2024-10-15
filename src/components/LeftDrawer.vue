<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/stores/store'
import { gsap } from 'gsap'
import { useForms } from '@/stores/forms'

const route = useRoute()
const router = useRouter()
const store = useStore()
const myform = useForms()

const modelValue = defineModel<boolean>()

// const par = computed(() => {
// 	return route.params.id
// })

const pages = reactive([
	{
		id: 1,
		title: 'Процесс',
		icon: 'mdi-shuffle-variant',
		url: 'process',
	},
	{
		id: 2,
		title: 'Формы',
		icon: 'mdi-list-box-outline',
		url: 'forms',
	},
	{
		id: 3,
		title: 'Роли',
		icon: 'mdi-drama-masks',
		// icon: 'mdi-account-circle-outline',
		url: 'roles',
	},
	{
		id: 4,
		title: 'Списки',
		icon: 'mdi-script-text-outline',
		url: 'lists',
	},
	{
		id: 0,
		title: 'Карточки',
		icon: 'mdi-cards-playing-spade-outline',
		url: 'cards',
	},
])

const show = computed(() => {
	return route.path.includes('editor') ? true : false
})
const enter = async (el: any, done: any) => {
	await gsap.from('.q-item', {
		y: 50,
		opacity: 0,
		delay: 0.3,
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

const urlTo = ((url: string) => {
	let temp = '/' + route.params.id + '/editor/' + url
	return temp
})
const navigate = (url: string) => {
	// let temp = '/' + route.params.id + '/editor/' + url
	// router.push(temp)
	myform.setCurrentBO(null)
}
const calcClass = (e: string) => {
	let temp = '/' + route.params.id + '/editor/' + e
	if (temp == route.path) return 'active'
}
</script>

<template lang="pug">
q-drawer.rel(v-model="modelValue" side="left" :width="180" :mini="store.mini")
	transition(@enter="enter" @leave="leave" :css="false" mode="out-in")

		q-list(v-if="show")
			q-item(clickable v-ripple v-for="page in pages" :key="page.id" @click="navigate(page.url)" :class="calcClass(page.url)" :to='urlTo(page.url)')
				q-item-section(avatar)
					q-icon(:name="page.icon")
				q-item-section
					q-item-label {{ page.title }}

	q-btn(v-if='show' flat round color="primary"  @click="store.mini = !store.mini" dense) 
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
