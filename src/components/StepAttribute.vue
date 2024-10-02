<script setup lang="ts">
import { ref } from 'vue'
import { uid } from 'quasar'
import { useLayoutStore } from '@/stores/layout'
import { useStorage } from '@vueuse/core'

const app = useStorage('app', localStorage)
const attributes = ref<any[]>([])
const lstore = useLayoutStore()

const name = ref('')
const type = ref('Строка')

const calcType = (e: string) => {
	switch (e) {
		case 'Строка':
			return 'text'
		case 'Текст':
			return 'textarea'
		case 'Дата':
			return 'date'
		default:
			return 'select'
	}
}

const add = () => {
	let tmp = {
		id: uid(),
		name: name.value,
		type: calcType(type.value),
		visible: true,
		readonly: false,
		selected: false,
		options: ['Иванов', 'Петров', 'Орлов'],
	}
	lstore.addField(tmp)
	name.value = ''
	input.value.focus()
}
const destroy = (e: number) => {
	lstore.fields.splice(e, 1)
}

const options = ['Строка', 'Текст', 'Дата', 'Ссылка на справочник']

const input = ref()
</script>

<template lang="pug">
q-form(@submit='add')
	div Добавьте в <span class='text-bold text-uppercase'>{{app.card}}</span> необходимые поля. Поля нужны для отображения информации, которую заполняют участники процесса. Например: Автор, Срок выполнения, Проверяющий и тд.
	.info Также у полей задается тип: строка, дата, номер, сотрудник

	.no(v-if='lstore.fields.length == 0') Поля не заданы
	q-list.q-mb-md(v-else separator)
		q-item(clickable v-for="(attr, index) in lstore.fields" :key="attr.id")
			q-item-section {{ attr.name }}
			// q-item-section {{ attr.type }}
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
