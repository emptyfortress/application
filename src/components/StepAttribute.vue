<script setup lang="ts">
import { ref } from 'vue'
import { uid } from 'quasar'

const attributes = ref<any[]>([])
const name = ref('')
const type = ref('')

const add = () => {
	if (name.value.length > 0) {
		attributes.value.push({
			id: uid(),
			name: name.value,
			type: type.value,
		})
		name.value = ''
		input.value.focus()
	}
}
const destroy = (e: number) => {
	attributes.value.splice(e, 1)
}
const options = [
	'Строка',
	'Текст',
	'Дата/время',
	'Ссылка на справочник',
	'Выбор из списка',
	'Чек-бокс',
]
const input = ref()
</script>

<template lang="pug">
q-form(@submit='add')
	div Добавьте в ваше приложение необходимые поля. Поля - это переменные. Поля нужны для отображения информации, которую заполняют участники процесса. Например: Автор, Срок выполнения, Проверяющий и тд.
	.info Также у полей задается тип: строка, дата, номер, сотрудник

	.no(v-if='attributes.length == 0') Поля не заданы
	q-list.q-mb-md(v-else separator)
		q-item(clickable v-for="(attr, index) in attributes" :key="attr.id")
			q-item-section {{ attr.name }}
			q-item-section {{ attr.type }}
			q-item-section(side)
				q-btn(flat round icon="mdi-trash-can-outline" color="primary" @click='destroy(index)') 

	.row.items-center.q-gutter-x-sm
		q-input(ref='input' autofocus v-model="name" label='Название поля' dense outlined bg-color="white")
		q-select(v-model="type" label='Тип поля' dense outlined bg-color="white" :options='options')
		q-btn(flat color="primary" label="Добавить" type='submit') 
</template>

<style scoped lang="scss">
.q-list {
	margin-bottom: 1rem;
	max-width: 800px;
}
.info {
	margin-top: 1rem;
	margin-bottom: 1rem;
	background: #a5d9ff;
	padding: 3px 1rem;
	display: inline-block;
}
.q-select,
.q-input {
	width: 200px;
}
.no {
	color: $negative;
	margin-bottom: 1rem;
}
</style>
