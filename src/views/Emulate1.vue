<script setup lang="ts">
import { ref, reactive } from 'vue'
import { computed } from 'vue'
import VueDraggableResizable from 'vue-draggable-resizable'
import FormTopEmulate from '@/components/FormTopEmulate.vue'
import { useRouter, useRoute } from 'vue-router'
import { useForms } from '@/stores/forms'
import FormEmulate1 from '@/components/FormEmulate1.vue'
import FormEmulate2 from '@/components/FormEmulate2.vue'

const router = useRouter()
const route = useRoute()
const myform = useForms()

const role = ref('Инициатор')
const options = ref([role.value, 'Все остальные'])

const etap = ref(myform.currentBO.name)

const next = (e: string, r: string) => {
	etap.value = e
	role.value = r
	options.value = [r, 'Все остальные']
}

const calcImg = computed(() => {
	switch (route.params.page) {
		case '1': // Согласовать
			return '/nav2.png'
		case '2': // Исправить заявку
			return '/nav3.png'
		case '3': // Рассмотреть заявку
			return '/nav4.png'
		case '4': // Исполнить заявку
			return '/nav6.png'
		case '5': // Принять результаты
			return '/nav7.png'
		case '6': // Обработать отказ
			return '/nav5.png'

		case '7': //  заявка отменена
			return '/cancel.png'
		case '8': //  заявка выполнена
			return '/done.png'

		default:
			return '/empty.png'
	}
})
</script>

<template lang="pug">
q-page

	.preview
		.center
			div
				|этап:
				span.text-bold.q-ml-md {{ etap }}
			div
			div роль:
			q-select(v-model="role" dense fulled :options='options')

		template(v-if='route.params.pag == 1')
			FormTopEmulate(@setEtap='next')
			FormEmulate1

		// template(v-if='route.params.page == 1')
		// 	FormTopEmulate(v-if='role == "Руководитель"' @setEtap='next')
		// 	FormEmulate1
		//
		// template(v-if='route.params.page == 2')
		// 	FormTopEmulate(v-if='role == "Инициатор"' @setEtap='next')
		// 	FormEmulate1
		//
		// template(v-if='route.params.page == 3')
		// 	FormTopEmulate(v-if='role == "Рассматривающий"' @setEtap='next')
		// 	FormEmulate1
		//
		// template(v-if='route.params.page == 4')
		// 	FormTopEmulate(v-if='role == "Исполнитель"' @setEtap='next')
		// 	FormEmulate1
		//
		// template(v-if='route.params.page == 5')
		// 	FormTopEmulate(v-if='role == "Инициатор"' @setEtap='next')
		// 	FormEmulate1
		//
		// template(v-if='route.params.page == 6')
		// 	FormTopEmulate(v-if='role == "Инициатор"' @setEtap='next')
		// 	FormEmulate1
		//
		// template(v-if='route.params.page == 7')
		// 	h5 Заяка отменена
		// 	br
		// 	FormEmulate2
		//
		// template(v-if='route.params.page == 8')
		// 	h5 Заявка выполнена
		// 	br
		// 	FormEmulate2

	Teleport(to="body")
		vue-draggable-resizable.fuck(:x="100" :y="-500" :w="350" :h="270" :active="false" :z="2000" :handles='["br"]' drag-handle='.bar')
			q-card
				.bar Навигация
				q-img(:src='calcImg')
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
