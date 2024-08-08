<script setup lang="ts"></script>

<template lang="pug">
.all
	.done
		div
			div Рассмотрите заявку и примите решение.
			div
				|Срок:  
				span.text-bold 11.04.2024
			div
				|Исполнитель:  
				span.text-bold Орлов П.С.
		q-card-actions.q-pa-none
			q-btn(flat color="primary" label="Делегировать") 
			q-btn(unelevated color="negative" label="Отказать" to='/emulate/2') 
			q-btn(unelevated color="primary" label="Согласовать" to='/emulate/3') 

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
</style>
