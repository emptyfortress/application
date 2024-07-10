<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/stores/store'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const store = useStore()

const section = computed(() => {
	return route.path
})
const calcUrl = computed(() => {
	return route.path
})
</script>

<template lang="pug">
q-breadcrumbs.q-ml-xl
	q-breadcrumbs-el(:label="store.currentNode?.data.text" to="/")

	q-breadcrumbs-el(v-for="br in store.bread" :label="br" :to="calcUrl")
	// q-breadcrumbs-el(v-if="store.bread.length == 2" label="Форма")
</template>

<style scoped lang="scss">
// .q-breadcrumbs-el {
// 	font-size: 1rem;
// }
</style>
