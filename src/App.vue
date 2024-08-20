<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import SvgIcon from '@/components/SvgIcon.vue'
import { gsap } from 'gsap'
import { useStore } from '@/stores/store'
import LeftDrawer from '@/components/LeftDrawer.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import { useStorage } from '@vueuse/core'
import { useData } from '@/stores/alldata'

const route = useRoute()
const router = useRouter()
const store = useStore()
const mydata = useData()

// const beforeLeave = () => {}
//
// const leave = async (el: any, done: any) => {
// 	let div = document.createElement('div')
// 	let cont = document.querySelector('#cont')
// 	await cont?.appendChild(div)
// 	await div.classList.add('cover')
// 	await gsap.to(div, {
// 		duration: 0.5,
// 		left: 0,
// 		ease: 'power3.out',
// 	})
// 	done()
// 	div.remove()
// }
// const beforeEnter = (el: any) => {
// 	let div = document.createElement('div')
// 	let cont = document.querySelector('#cont')
// 	cont?.appendChild(div)
// 	div.classList.add('cover')
// }
//
// const enter = async (el: any, done: any) => {
// 	let div = document.querySelector('.cover')
// 	await gsap.fromTo(
// 		'.cover',
// 		{
// 			left: 0,
// 		},
// 		{
// 			delay: 0.3,
// 			left: '100%',
// 			duration: 0.5,
// 			ease: 'power3.out',
// 		}
// 	)
// 	div?.remove()
// 	done()
// }
// const title = computed(() => {
// 	return route.name == 'home' ? 'Конструктор приложений' : store.currentNode?.data.text
// })

const home = () => {
	store.setCurrentNode(null)
	mydata.saveXML(null)
	router.push('/')
}
const app = useStorage('app', localStorage)
</script>

<template lang="pug">
q-layout(view="hHr LpR fFf")
	q-header.head
		q-toolbar
			q-toolbar-title()
				q-avatar(@click="home")
					SvgIcon.log(name="logo")
				span.title(@click="home") Конструктор приложений

			Breadcrumbs(v-if="route.name !== 'home'")

			q-space
			q-avatar(color="blue-2" size="32px")
				img(src="@/assets/img/user0.svg")
				q-menu
					q-item(clickable v-close-popup)
						q-item-section(side).name
						q-item-section Орлов&nbsp;П.С.
					q-item(clickable v-close-popup)
						q-item-section О программе
					q-item(clickable v-close-popup)
						q-item-section Выход

	LeftDrawer(v-model="store.drawer")

	q-page-container
		#cont
			router-view(v-slot="{ Component, route }")
				component(:is="Component")

// transition(@before-enter="beforeEnter" @enter="enter" @leave="leave" :css="false" mode="out-in")
</template>

<style scoped lang="scss">
.head {
	backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(10px);
	background-color: #dce3f21a;
	height: 64px;
	color: var(--text-color);
	padding-right: 1rem;
	line-height: 64px;
	@media screen and (max-width: 1024px) {
		height: 48px;
		line-height: 48px;
	}
}

.log {
	width: 1.3rem;
	height: 1.3rem;
	cursor: pointer;
}
.title {
	margin-left: 1rem;
	font-size: 0.8rem;
	text-transform: uppercase;
	cursor: pointer;
}
#cont {
	position: relative;
	// background: yellow;
}

@media (min-width: 1024px) {
	header {
		display: flex;
		place-items: center;
		padding-right: calc(var(--section-gap) / 2);
	}

	.logo {
		margin: 0 2rem 0 0;
	}

	header .wrapper {
		display: flex;
		place-items: flex-start;
		flex-wrap: wrap;
	}
}
.name::before {
	content: '';
	width: 8px;
	height: 8px;
	border-radius: 8px;
	background: teal;
	display: inline-block;
}
.tool {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.center {
	display: flex;
	gap: 1rem;
	align-items: center;
}
</style>
