<script setup lang="ts">
import { ref } from 'vue'
import Step2 from '@/components/Step2.vue'

const step = ref(1)
</script>

<template lang="pug">
q-page
	q-stepper(
		flat
		v-model="step"
		vertical
		color="primary"
		header-nav
		animated)

		q-step(
			:name="1"
			title="Заполните атрибуты"
			prefix="1"
			:done="step > 1")

			div Сначала вам необходимо заполнить следующие атрибуты:
			q-input(v-model="author" label='Автор' dense outlined bg-color="white")
			q-input(v-model="start" label='Дата начала' dense outlined bg-color="white")
			q-input(v-model="end" label='Дата окончания' dense outlined bg-color="white")
			q-input(v-model="button" label='Название кнопки старта' dense outlined bg-color="white")

			q-stepper-navigation
				q-btn(@click="step = 2" color="primary" label="Далее")

		q-step(
			:name="2"
			title="Определите участников процесса (роли)"
			prefix="2"
			:done="step > 2")

			Step2

		q-step(
			:name="3"
			title="Определите участников процесса (роли)"
			prefix="2"
			:done="step > 2")
			
</template>

<style scoped lang="scss">
.q-stepper {
	background: initial;
	// width: 1200px;
}
// .q-list {
// 	margin-bottom: 1rem;
// 	max-width: 800px;
// }
.q-input {
	width: 300px;
	margin-bottom: 3px;
}
</style>
