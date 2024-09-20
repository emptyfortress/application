<script setup lang="ts">
import { useForms } from '@/stores/forms'

const modelValue = defineModel()

const myform = useForms()
</script>

<template lang="pug">
.all
	.done
		div(v-if='myform.currentBO.name !== "Создал Заявку"')
			span.btd {{ modelValue }}
				q-popup-edit(v-model="modelValue" title="Сопроводительный текст" buttons auto-save v-slot="scope")
					q-input(v-model="scope.value" type='textarea' outlined dense autofocus counter @keyup.enter.stop)
			div
				|Срок:  
				span.text-bold 11.04.2024
			div
				|Исполнитель:  
				span.text-bold Орлов П.С.
		q-card-actions.q-pa-none
			q-btn(v-for="bt in myform.bt" unelevated color="primary" :label="bt.name") 

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
	justify-items: start;
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
.btd {
	color: $primary;
	border-bottom: 1px dotted $primary;
	text-align: left;
	cursor: pointer;
}
</style>
