<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useStore } from '@/stores/store'

const store = useStore()

const router = useRouter()
const route = useRoute()

const goto = (e: string) => {
	store.setEtap(e)
	router.push('/editor/etap')
}
</script>

<template lang="pug">
.canvas(ref="canvas")
	.etap(@click="goto('Консолидация')") Консолидация
	.etap.more(@click="goto('Согласование')") Согласование
</template>

<style scoped lang="scss">
.canvas {
	background: #fff;
	height: calc(100vh - 150px);
	margin-right: 0.25rem;
	background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAAXNSR0IArs4c6QAAADBJREFUGFclioEJADAMwvSl7f8P1pfMaAsiCcT1inOPQJIlkwy3uT8JbmImh2zANh9STBXvibRbIgAAAABJRU5ErkJggg==)
		repeat;
	border: 1px solid #ccc;
	position: relative;
}
.etap {
	border: 2px solid #333;
	padding: 1rem;
	border-radius: 1rem;
	cursor: pointer;
	position: absolute;
	background: #fff;
	top: 5rem;
	left: 13rem;
	&:hover {
		background: #dedede;
	}
}
.more {
	top: 9rem;
	left: 26rem;
}
</style>
