<script setup lang="ts">
import VueDraggableResizable from 'vue-draggable-resizable'
</script>

<template lang="pug">
.grid
	.bl
		.col
			.row.justify-between
				h5 Редактирование формы
				q-btn(flat color="primary" label="Выбрать форму из доступных" @click="") 
			.inp Поле
			.inp Поле
			.inp Поле
			.inp Поле
			.inp Поле
			.inp Поле

		br
		q-btn(unelevated color="primary" label="Превью" @click="") 


	.bl.right Свойства

vue-draggable-resizable(:x="150" :y="500" :w="200" :h="150" :active="false")
	q-card
		p Hello! I'm a minimap.
</template>

<style scoped lang="scss">
.grid {
	display: grid;
	grid-template-columns: 1fr 300px;
	align-items: start;
	column-gap: 1rem;
	row-gap: 0.5rem;
}
.col {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}
.inp {
	// height: 42px;
	width: 200px;
	background: #dedede;
	padding: 0.5rem;
}
.center {
	display: flex;
	justify-content: center;
	align-items: center;
}
.bl {
	background: #fff;
	height: calc(100vh - 175px);
	padding: 1rem;
}
.q-card {
	height: 100%;
	padding: 1rem;
}
</style>
