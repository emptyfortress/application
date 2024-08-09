<script setup lang="ts">
import { ref } from 'vue'
import { computed } from 'vue'
import VueDraggableResizable from 'vue-draggable-resizable'
import { useStorage } from '@vueuse/core'
import FormTopEmulate from '@/components/FormTopEmulate.vue'

const props = defineProps({
	page: {
		type: String,
		required: true,
	},
})
const app = useStorage('app', localStorage)

const pic = computed(() => {
	return `/form${props.page}.png`
})
const role = ref('Инициатор')
const options = ['Инициатор', 'Руководитель', 'Все остальные']
</script>

<template lang="pug">
q-page

	.preview
		.center
			div этап: Создание
			div
			div роль:
			q-select(v-model="role" dense fulled :options='options')
		FormTopEmulate
		q-img(:src='pic')

	Teleport(to="body")
		vue-draggable-resizable.fuck(:x="100" :y="-300" :w="250" :h="150" :active="false" :z="2000" :handles='["br"]' drag-handle='.bar')
			q-card
				.bar Навигация
				q-img(src='@/assets/img/preview.png')
</template>

<style scoped lang="scss">
.preview {
	width: 600px;
	// background: #fff;
	margin: 1rem auto;
	height: 400px;
}
.bar {
	height: 26px;
	background: #dedede;
	text-align: center;
	font-size: 0.9rem;
	line-height: 26px;
}
.fuck {
	border: 1px solid #aaa;
}
.tool {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.center {
	display: flex;
	gap: 1rem;
	align-items: center;
}
</style>
