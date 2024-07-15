<script setup lang="ts">
import { ref } from 'vue'

const modelValue = defineModel<boolean>()

const name = ref('')
const label = ref('')
const typ = ref('Строка')

const close = () => {
	name.value = ''
	typ.value = ''
	modelValue.value = false
}

const emit = defineEmits(['create'])

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
const create = () => {
	let tmp = {
		id: +new Date(),
		name: name.value,
		label: label.value,
		type: calcType(typ.value),
		typ: typ.value,
		visible: true,
		readonly: false,
		selected: false,
		options: ['Иванов', 'Петров', 'Орлов'],
	}
	emit('create', tmp)
	name.value = ''
	label.value = ''
	typ.value = ''
	modelValue.value = false
}
const options = ['Строка', 'Текст', 'Сотрудник', 'Дата']
</script>

<template lang="pug">
q-dialog(v-model="modelValue")
	q-card(style="min-width: 400px;")
		q-btn.close(round color="negative" icon="mdi-close" v-close-popup)
		q-card-section
			.text-h6 Добавить поле

		q-form(@submit="create")
			q-card-section
				label Метка
				q-input(v-model="label" filled autofocus)
				br
				label Название
				q-input(v-model="name" filled autofocus)
				br
				label.q-mt-sm Тип
				q-select(v-model="typ" filled :options="options")

			q-card-actions.q-mx-sm.q-mb-md(align="right")
				q-btn(flat color="primary" label="Отмена" @click="close")
				q-btn(unelevated color="primary" label="Добавить" type="submit" :disable="!name.length")
</template>

<style scoped lang="scss"></style>
