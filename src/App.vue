<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import SvgIcon from '@/components/SvgIcon.vue'
import { useStore } from '@/stores/store'
const store = useStore()

const route = useRoute()
</script>

<template lang="pug">
q-layout(view="hHh LpR fFf")
	q-header.head
		q-toolbar
			q-avatar
				SvgIcon.log(name="logo")

			q-breadcrumbs
				template(v-slot:separator)
					q-icon(name="mdi-arrow-right" color="primary")

				q-breadcrumbs-el(to="/" label="Конструктор")

				template(v-if="route.path !== '/'" )
					q-breadcrumbs-el(:to="`/split/${store.page}`" :label="store.page")

					.q-ml-xl.cursor-pointer
						q-icon(name="mdi-source-branch" color="primary")
						span.q-ml-sm v. 0.1.0
							q-menu
								q-list
									q-item(clickable)
										q-item-section v.0.2.0
									q-item(clickable)
										q-item-section v.1.1.0

			q-space
			template(v-if="route.path !== '/'" )
				.q-gutter-x-sm
					q-btn(flat  round icon="mdi-pencil" color="primary" @click="") 
						q-tooltip Редактировать
					q-btn(flat  round icon="mdi-content-duplicate" color="primary" @click="") 
						q-tooltip Дублировать
					q-btn(unelevated color="negative" label="Удалить приложение" @click="" size="sm") 

			q-avatar.q-ml-xl(color="blue-2" size="32px")
				img(src="@/assets/img/user0.svg")
				q-menu
					q-item(clickable v-close-popup)
						q-item-section(side).name
						q-item-section Орлов&nbsp;П.С.
					q-item(clickable v-close-popup)
						q-item-section О программе
					q-item(clickable v-close-popup)
						q-item-section Выход
 

	// LeftDrawer(v-model="leftDrawerOpen" v-show="inside")

	q-page-container
		.container
			router-view(v-slot="{ Component, route }")
				transition(:name="route.meta.transition || 'fade'" :mode="route.meta.mode || 'out-in'")
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
	cursor: pointer;
}
.title {
	margin-left: 1rem;
	font-size: 0.8rem;
	text-transform: uppercase;
	cursor: pointer;
}
.container {
	// max-width: 1400px;
	margin: 0 2rem;
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
.q-breadcrumbs {
	font-size: 1.1rem;
	.q-item__label {
		margin-left: 0.5rem;
	}
}
</style>
