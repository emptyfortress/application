<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import SvgIcon from '@/components/SvgIcon.vue'
import LeftDrawer from '@/components/LeftDrawer.vue'

const leftDrawerOpen = ref(true)
const toggleLeftDrawer = () => {
	leftDrawerOpen.value = !leftDrawerOpen.value
}

const route = useRoute()
const inside = computed(() => {
	return route.path == '/' ? false : true
})
</script>

<template lang="pug">
q-layout(view="hHh LpR fFf")
	q-header.head
		q-toolbar

			q-toolbar-title
				q-avatar(@click="toggleLeftDrawer")
					SvgIcon.log(name="logo")
				span.title Конструктор приложений

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
 

	LeftDrawer(v-model="leftDrawerOpen" v-show="inside")

	q-page-container
		.container
			router-view(v-slot="{ Component, route }")
				transition(name="fade" mode="out-in")
					component(:is="Component")
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
}
.title {
	margin-left: 1rem;
	font-size: 0.8rem;
	text-transform: uppercase;
}
.container {
	max-width: 1200px;
	margin: 0 auto;
	// background: pink;
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
</style>
