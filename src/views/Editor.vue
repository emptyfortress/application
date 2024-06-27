<script setup lang="ts">
import { useStore } from '@/stores/store'
const store = useStore()
</script>

<template lang="pug">
q-page(padding)
	h5
		q-btn(flat round icon="mdi-arrow-left-circle-outline" @click="$router.back()") 
		span {{ store.app.title }}
	.grd
		.left
			router-link.item(to='/editor/process') Процесс
			router-link.item(to='/editor/forms') Формы
			router-link.item(to='/editor/roles') Роли
			router-link.item(to='/editor/lists') Списки
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
