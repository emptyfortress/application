<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PropertyPanel from '@/components/PropertyPanel.vue'
import VueDraggableResizable from 'vue-draggable-resizable'
import { useForms } from '@/stores/forms'
import { gsap } from 'gsap'
import { useStore } from '@/stores/store'

const route = useRoute()
const router = useRouter()
const split = ref(70)
const myform = useForms()
const store = useStore()

onMounted(() => {
	gsap.from('.fuck', {
		delay: 0.5,
		x: -600,
		opacity: 0,
		ease: 'expo.out',
	})
})

const calcNav = computed(() => {
	if (route.name == 'Этап') return '/preview.png'
	if (route.name !== 'Процесс') return '/empty.png'
	if (store.currentNode && store.currentNode.data.text == 'Заявка') {
		switch (myform.currentBO?.name) {
			case 'Создал Заявку':
				return '/nav1.png'
			case 'Согласовать заявку':
				return '/nav2.png'
			case 'Исправить заявку':
				return '/nav3.png'
			case 'Рассмотреть заявку':
				return '/nav4.png'
			case 'Обработать отказ':
				return '/nav5.png'
			case 'Исполнить заявку':
				return '/nav6.png'
			case 'Принять результаты':
				return '/nav7.png'
			default:
				return '/nav0.png'
		}
	} else return '/preview.png'
})
</script>

<template lang="pug">
q-page
	q-splitter.split(v-model="split" :limits="[10, 100]")
		template(v-slot:before)
			router-view
		template(v-slot:after)
			PropertyPanel

	Teleport(to="body")
		vue-draggable-resizable.fuck(:x="100" :y="-300" :w="250" :h="150" :active="false" :z="2000" :handles='["br"]' drag-handle='.bar')
			q-card
				.bar Навигация
				q-img(:src='calcNav')
			
</template>

<style scoped lang="scss">
.split {
	height: var(--panel-height);
}
.q-page {
	padding-right: 1rem;
}
.q-card {
	height: 100%;
	overflow: hidden;
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
</style>
