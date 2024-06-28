<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useStore } from '@/stores/store'

const store = useStore()
const route = useRoute()
</script>

<template lang="pug">
q-page(padding)
	h5
		span {{ store.app.title }}
		span &nbsp;—&nbsp; {{ store.editor }}
		span(v-if="store.etap") &nbsp;—&nbsp; {{ store.etap }}
	router-view
</template>

<style scoped lang="scss">
.grd {
	display: grid;
	grid-template-columns: 200px 1fr;
	// justify-items: start;
	align-items: start;
	column-gap: 1rem;
	row-gap: 0.5rem;
}
.item {
	display: block;
	padding: 1rem;
	text-decoration: none;
	background: #fff;
	color: $secondary;
	margin-bottom: 0.5rem;
}
.router-link-active {
	background: $primary;
	color: #fff;
}
</style>
