<script setup lang="ts">
import { ref } from 'vue'
import { useForms } from '@/stores/forms'
// import { useStorage } from '@vueuse/core'

// const app = useStorage('app', localStorage)
const myform = useForms()

const destroy = (e: number) => {
	myform.status.splice(e, 1)
}
const status = ref('')

const input = ref()
const add = () => {
	myform.addStatus(status.value)
	status.value = ''
	input.value.focus()
}

const emit = defineEmits(['next'])

const nexxt = () => {
	if (status.value !== '') {
		add()
	}

	emit('next')
}
</script>

<template lang="pug">
div Процесс может находиться в различных состояниях, например: подготовка, рассмотрение, согласование, архив и тп.

q-markup-table(flat bordered style="width: 500px;")
	thead
		tr
			th.text-left Состояние
			th.text-rigth

	tbody
		tr(v-if='myform.status.length == 0')
			td
				.no Поля не заданы.

		tr(v-else v-for="(item, index) in myform.status" :key="item")
			td
				span {{ item }}
			td.text-right
				q-btn(v-if='index !== 0' flat round icon="mdi-close" color="primary" @click='destroy(index)' size='sm') 

q-form(@submit='add')
	.row.items-center.q-gutter-x-sm
		q-input(ref='input' autofocus v-model="status" type="text" label='Состояние' dense outlined bg-color="white")
		q-btn(flat color="primary" label="Добавить" type='submit') 

q-stepper-navigation
	q-btn(@click="nexxt" color="primary" label="Далее")
</template>

<style scoped lang="scss">
.q-list {
	margin-bottom: 1rem;
	max-width: 600px;
}

.q-input {
	width: 300px;
}

.no {
	color: $negative;
}

.q-markup-table {
	margin-top: 1rem;
	margin-bottom: 1rem;
}

.q-table thead tr {
	height: 28px;
}
</style>
