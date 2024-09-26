<script setup lang="ts">
import { ref } from 'vue'
import Step2 from '@/components/Step2.vue'
import StepAttribute from '@/components/StepAttribute.vue'

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
			title="Назовите карточку"
			prefix="1"
			:done="step > 1")

			div Придумайте названия для карточки приложения. Это название позволит отличить документы вашего приложения от других документов.

			q-input(v-model="card" label='Карточка' dense outlined bg-color="white")
			q-stepper-navigation
				q-btn(@click="step = 2" color="primary" label="Далее")

		q-step(
			:name="2"
			title="Определите поля карточки"
			prefix="1"
			:done="step > 2")

			StepAttribute


			// q-input(v-model="author" label='Автор' dense outlined bg-color="white")
			// q-input(v-model="start" label='Дата начала' dense outlined bg-color="white")
			// q-input(v-model="end" label='Дата окончания' dense outlined bg-color="white")
			// q-input(v-model="button" label='Название кнопки старта' dense outlined bg-color="white")

			q-stepper-navigation
				q-btn(@click="step = 3" color="primary" label="Далее")

		q-step(
			:name="3"
			title="Определите участников процесса (роли)"
			prefix="3"
			:done="step > 2")

			Step2
			q-stepper-navigation
				q-btn(@click="step = 4" color="primary" label="Далее")

		q-step(
			:name="4"
			title="Настройте форму с которой будет работать Инициатор"
			prefix="4"
			:done="step > 4")
			
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
