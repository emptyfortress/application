<script setup lang="ts">
import { ref } from 'vue'
import { useForms } from '@/stores/forms'
import { useStorage } from '@vueuse/core'

const app = useStorage('app', localStorage)
const myform = useForms()

const destroy = (e: number) => {
	myform.status.splice(e, 1)
}
const status = ref('')

const add = () => {
	myform.addStatus(status.value)
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
div
	div Ваша <span class="text-bold">{{ app.card }}</span> может находиться в различных состояниях, например: подготовка, рассмотрение, согласование, архив и тп.

	q-form(@submit='add')
		.no(v-if='myform.status.length == 0') Cостояния не заданы
		q-list.q-mb-md(v-else separator)
			q-item(clickable v-for="(item, index) in myform.status" :key="item")
				q-item-section {{ item }}
				q-item-section(side)
					q-btn(flat round icon="mdi-trash-can-outline" color="primary" @click='destroy(index)') 

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
</style>
