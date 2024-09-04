<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const emit = defineEmits(['setEtap'])

const setEtap = (e: string, r: string) => {
	emit('setEtap', e, r)
}
</script>

<template lang="pug">
.all
	.done
		div
			div(v-if='route.params.page == 1') Согласуйте заявку.
			div(v-if='route.params.page == 2') Исправьте заявку по замечаниям.
			div(v-if='route.params.page == 3') Рассмотрите заявку и примите решение
			div(v-if='route.params.page == 4') Исполните заявку
			div(v-if='route.params.page == 5') Примите результаты исполнения заявки
			div(v-if='route.params.page == 6') Обработайте отказ
			div
				|Срок:  
				span.text-bold 11.04.2024
			div
				|Исполнитель:  
				span.text-bold Орлов П.С.
		q-card-actions.q-pa-none(align='right' v-if='route.params.page == 1')
			q-btn(unelevated color="negative" label="Не согласовать" to='/emulate/2' @click='setEtap("Исправить заявку", "Инициатор")') 
			q-btn(unelevated color="primary" label="Согласовать" to='/emulate/3' @click='setEtap("Рассмотреть заявку", "Рассматривающий")')

		q-card-actions.q-pa-none(align='right' v-if='route.params.page == 2')
			q-btn(unelevated color="primary" label="На согласование" to='/emulate/1' @click='setEtap("Согласовать заявку", "Руководитель")')

		q-card-actions.q-pa-none(align='right' v-if='route.params.page == 3')
			q-btn(unelevated color="negative" label="Отказать в исполнении" to='/emulate/6' @click='setEtap("Обработать отказ", "Инициатор")') 
			q-btn(unelevated color="primary" label="Согласовать исполнение" to='/emulate/4' @click='setEtap("Исполнить заявку", "Исполнитель")') 

		q-card-actions.q-pa-none(align='right' v-if='route.params.page == 4')
			q-btn(unelevated color="primary" label="Исполнить" to='/emulate/5' @click='setEtap("Принять результаты", "Инициатор")' ) 

		q-card-actions.q-pa-none(align='right' v-if='route.params.page == 5')
			q-btn(unelevated color="primary" label="Подтвердить" to='/emulate/8' @click='setEtap("Заявка выполнена", "Все роли")' ) 

		q-card-actions.q-pa-none(align='right' v-if='route.params.page == 6')
			q-btn(unelevated color="primary" label="На согласование" to='/emulate/1' @click='setEtap("Согласовать заявку", "Руководитель")' ) 
			q-btn(unelevated color="primary" label="Отменить заявку" to='/emulate/7' @click='setEtap("Заявка отменена", "Все роли")' ) 

</template>

<style scoped lang="scss">
.all {
	container-type: inline-size;
}
.done {
	background: #eee;
	padding: 1rem;
	margin: 0.5rem auto 0;
	display: grid;
	grid-template-columns: 1fr;
	// justify-items: start;
	column-gap: 1rem;
	align-items: start;
	.q-card__actions {
		margin-top: 1rem;
	}
}

@container (min-width: 780px) {
	.done {
		grid-template-columns: 1fr auto;
	}
}
</style>
