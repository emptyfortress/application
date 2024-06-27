<script setup lang="ts">
import VueDraggableResizable from 'vue-draggable-resizable'
</script>

<template lang="pug">
.grid
	.bl.col
		.inp
		.inp
		.inp
		.inp


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
	height: 42px;
	width: 200px;
	background: #dedede;
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
