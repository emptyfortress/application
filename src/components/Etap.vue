<script setup lang="ts">
import { onMounted } from 'vue'
import VueDraggableResizable from 'vue-draggable-resizable'
import { gsap } from 'gsap'

onMounted(() => {
	gsap.from('.fuck', {
		delay: 0.5,
		x: -600,
		opacity: 0,
		ease: 'expo.out',
	})
})
</script>

<template lang="pug">
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

Teleport(to="body")
	vue-draggable-resizable.fuck(:x="100" :y="-300" :w="200" :h="150" :active="false" :z="2000")
		q-card
			p Minimap
</template>

<style scoped lang="scss">
.col {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}
.inp {
	width: 200px;
	background: #dedede;
	padding: 0.5rem;
}
.bl {
	background: #fff;
	height: calc(100vh - 150px);
	padding: 1rem;
	margin-right: 0.5rem;
	position: relative;
}
.q-card {
	height: 100%;
	padding: 1rem;
}
</style>
