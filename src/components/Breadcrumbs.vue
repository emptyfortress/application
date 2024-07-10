<script setup lang="ts">
import { computed } from 'vue'
// import { useStore } from '@/stores/store'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// const store = useStore()

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
		default:
			return item
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
</script>

<template lang="pug">
q-breadcrumbs.q-ml-xl
	q-breadcrumbs-el(v-for="br in bread" :key="br.title" :label="br.title" :to="br.url")
</template>

<style scoped lang="scss"></style>
