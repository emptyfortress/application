<script setup lang="ts"></script>

<template lang="pug">
q-page(padding)
	h5
		q-btn(flat round icon="mdi-arrow-left-circle-outline" @click="$router.push('/main')") 
		span {{ store. app.title }}
	.grid
		.left
			router-link.item(to='/process') Процесс
			router-link.item(to='/forms') Формы
			router-link.item(to='/roles') Роли
			router-link.item(to='/list') Списки
		.bl.right
			router-view
</template>

<style scoped lang="scss">
.grid {
	margin-top: 1rem;
	display: grid;
	grid-template-columns: 200px 1fr;
	// justify-items: start;
	align-items: start;
	column-gap: 1rem;
	row-gap: 0.5rem;
}
.bl {
	background: #fff;
	height: calc(100vh - 175px);
	padding: 1rem;
}
</style>
