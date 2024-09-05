<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/stores/store'
import { useRouter, useRoute } from 'vue-router'
import { useStorage } from '@vueuse/core'

const router = useRouter()
const route = useRoute()

const store = useStore()
const app = useStorage('app', localStorage)

const calcTitle = (item: string) => {
	switch (item) {
		case 'process':
			return 'Процесс'
		case 'forms':
			return 'Формы'
		case 'roles':
			return 'Роли'
		case 'lists':
			return 'Списки'
		case 'request':
			return 'Запрос'
		case 'view':
			return 'Представление'
		case 'emulate':
			return
		case 'emulate1':
			return

		case route.params.etap:
			// store.tabs = 'lib'
			return decodeURIComponent(route.params.etap.toString())

		case route.params.req:
			// store.tabs = 'property'
			return decodeURIComponent(route.params.req.toString())

		default:
			store.tabs = 'property'
			return decodeURIComponent(item)
	}
}

const calcUrl = (item: string) => {
	switch (item) {
		case 'process':
			return '/' + route.params.id + '/editor/process'
		case 'forms':
			return '/' + route.params.id + '/editor/forms'
		case 'roles':
			return '/' + route.params.id + '/editor/roles'
		case 'lists':
			return '/' + route.params.id + '/editor/lists'

		case route.params.etap:
			return '/' + route.params.id + '/editor/process'

		case route.params.req:
			return '/' + route.params.id + '/editor/lists'

		default:
			return '/' + item
	}
}

const bread = computed(() => {
	let start = route.fullPath.split('/')
	start.splice(0, 1)
	start.splice(1, 1)

	return start.map((item: string) => ({
		title: calcTitle(item),
		url: calcUrl(item),
	}))
})
const reset = (url: string) => {
	let arr = url.split('/')
	// console.log(arr.length)
	if (arr.length == 4) {
	}
}
const back = () => {
	let url = '/' + app.value.text + '/editor/process'
	router.push(url)
}
</script>

<template lang="pug">
q-breadcrumbs.q-ml-xl
	// q-breadcrumbs-el(v-for="br in bread" :key="br.title" :label="br.title" :to="br.url" @click="reset(br.url)")
	// q-breadcrumbs-el(v-if="route.name == 'Этап'") Форма

	template(v-if='route.name == "emulate" || route.name == "emulate1"' )
		h6 Процесс "{{ app.text }}"
</template>

<style scoped lang="scss"></style>
