<script setup lang="ts">
import { ref } from 'vue'
import StepRole1 from '@/components/StepRole1.vue'
import StepRole2 from '@/components/StepRole2.vue'
import StepAttribute from '@/components/StepAttribute.vue'
import { useRouter, useRoute } from 'vue-router'
import { useStorage } from '@vueuse/core'
import { useData } from '@/stores/alldata'
import { useRoles } from '@/stores/roles'

const router = useRouter()
const route = useRoute()

const step = ref(1)
const butt = ref('Введите название')
const card = ref('')

const app = useStorage('app', localStorage)

const myrole = useRoles()

const goto = () => {
	myrole.addRole({
		id: 'one',
		name: 'Кадровик',
		selected: false,
	})
	let url = `/${app.value.text}/editor/process`
	router.push(url)
}
const mydata = useData()
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
			title="Работа начинается с того, что Инициатор создаст карточку"
			prefix="1"
			:done="step > 1")

			// div Придумайте названия для карточки приложения (желательно одним словом). Это название позволит отличить документы вашего приложения от других документов.

			q-input(v-model="card" label='Карточка' dense outlined bg-color="white")
			q-stepper-navigation
				q-btn(@click="step = 2" color="primary" label="Далее")

		q-step(
			:name="2"
			title="Определите участников процесса (роли)"
			prefix="2"
			:done="step > 2")
			StepRole1
			q-stepper-navigation
				q-btn(@click="step = 5" color="primary" label="Далее")

		q-step(
			:name="3"
			title="Определите поля приложения"
			prefix="3"
			:done="step > 3")
			StepAttribute
			q-stepper-navigation
				q-btn(@click="step = 3" color="primary" label="Далее")

		q-step(
			:name="4"
			title="Назовите кнопку старта"
			prefix="3"
			:done="step > 3")
			// div Придумайте названия для кнопки, с которой будет стартовать ваше приложение.
			div Когда все поля будут заполнены, для передачи следующему участнику процесса Инициатор нажмет кнопку. Дайте ей название.
			q-input.q-my-md(v-model="mydata.button" label='Кнопка' dense outlined bg-color="white")
			q-btn(unelevated color="secondary" :label="butt") 
			q-stepper-navigation
				q-btn(@click="step = 4" color="primary" label="Далее")

		q-step(
			:name="5"
			title="Определите наблюдателей процесса (роли)"
			prefix="5"
			:done="step > 5")
			StepRole2
			q-stepper-navigation
				q-btn(@click="step = 6" color="primary" label="Далее")
			
		q-step(
			:name="6"
			title="Завершение"
			prefix="6"
			:done="step > 6")
			div Поздравляем, вы завершили первичную настройку, сейчаc вы будете направлены на страницу приложения, где можете продолжить настройку.

			q-stepper-navigation
				q-btn(@click="goto" color="primary" label="Завершить")
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
.sma {
	font-size: 0.8rem;
	font-style: italic;
}
</style>
