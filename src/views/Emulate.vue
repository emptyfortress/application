<script setup lang="ts">
import VueDraggableResizable from 'vue-draggable-resizable'
import { useStorage } from '@vueuse/core'

const app = useStorage('app', {})
</script>

<template lang="pug">
q-page
	.preview
		div {{ app.text }}

	Teleport(to="body")
		vue-draggable-resizable.fuck(:x="100" :y="-300" :w="250" :h="150" :active="false" :z="2000" :handles='["br"]' drag-handle='.bar')
			q-card
				.bar Навигация
				q-img(src='@/assets/img/preview.png')
</template>

<style scoped lang="scss">
.preview {
	width: 600px;
	background: #fff;
	margin: 1rem auto;
	height: 400px;
}
</style>
