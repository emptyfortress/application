<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from '@/stores/store'
import SvgIcon from '@/components/SvgIcon.vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()

const store = useStore()
// const currentApp = computed(() => {
// 	return store.appList.find((item) => item.id == '1')
// })
//
// store.setApp(currentApp.value!)

const pages = [
	{ id: '0', url: '/editor/process', title: 'Процесс', icon: 'mdi-shuffle-variant' },
	{ id: '1', url: '/editor/forms', title: 'Формы', icon: 'mdi-list-box-outline' },
	{ id: '2', url: '/editor/roles', title: 'Роли', icon: 'mdi-account-circle-outline' },
	{ id: '3', url: '/editor/lists', title: 'Списки', icon: 'mdi-script-text-outline' },
]
// const goto = (e: string) => {
// 	router.push(e)
// }

const navigate = (page: any) => {
	store.setEditor(page.title)
	store.setEtap(null)
	router.push(page.url)
}
</script>

<template lang="pug">
q-page(padding)
	.container
		.grid
			div
				h4 {{ store.app.title }}
				.text-subtitle1 {{ store.app.descr }}
			.bl
				.text-overline version
				.big
					q-icon(name="mdi-source-branch" color="primary")
					span.q-ml-sm v. {{store.app.version }}
						q-menu
							q-list
								q-item(clickable)
									q-item-section v.0.2.0
								q-item(clickable)
									q-item-section v.1.1.0

			.q-gutter-x-sm
				q-btn(flat  round icon="mdi-pencil" color="primary" @click="") 
					q-tooltip Редактировать
				q-btn(flat  round icon="mdi-content-duplicate" color="primary" @click="") 
					q-tooltip Дублировать
				q-btn(unelevated color="negative" label="Удалить приложение" @click="") 

		.q-mt-md Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, autem consequatur. Aperiam quis consectetur beatae et labore rerum ut optio incidunt dolor ab exercitationem aliquam, fugit dolorum aspernatur, maiores ratione!
		.podzag Настройки приложения
		.parent
			.item(v-for="(page, index) in pages" :key="page.id" @click="navigate(page)")
				.txt {{ page.title }}
				q-icon.icon(:name="page.icon")
</template>

<style scoped lang="scss">
.container {
	max-width: 1200px;
	margin: 0 auto;
}
.grid {
	display: grid;
	grid-template-columns: 2fr 1fr auto;
	align-items: center;
	column-gap: 1rem;
	row-gap: 0.5rem;
}
.big {
	font-size: 1.2rem;
	color: $primary;
	cursor: pointer;
}
.text-overline {
	line-height: 1;
}
.podzag {
	font-size: 1.1rem;
	margin-bottom: 1rem;
	margin-top: 3rem;
	transition: 0.2s ease all;
}
.parent {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-column-gap: 1rem;
	grid-row-gap: 1rem;
}
.item {
	cursor: pointer;
	background-color: white;
	padding: 0.5rem;
	position: relative;
	color: $secondary;
	border: 1px solid white;
	height: 200px;
	.icon {
		position: absolute;
		bottom: 1rem;
		left: 1rem;
		font-size: 2rem;
	}
	&:hover {
		border: 1px solid #ccc;
		color: $primary;
		border: 1px solid $secondary;
	}
}
.txt {
	text-align: left;
	text-transform: uppercase;
}
</style>
