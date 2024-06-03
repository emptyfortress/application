<script setup lang="ts">
import { ref } from 'vue'
import { uid } from 'quasar'

const modelValue = defineModel<boolean>()

const name = ref('')
const type = ref('Строка')

const close = () => {
	name.value = ''
	type.value = ''
	modelValue.value = false
}

const emit = defineEmits(['create'])

const create = () => {
	let tmp = {
		id: uid(),
		name: name.value,
		type: type.value,
	}
	emit('create', tmp)
	name.value = ''
	type.value = ''
	modelValue.value = false
}
const options = ['Строка', 'Сотрудник', 'Текст', 'Кнопка', 'Кнопка действий']
</script>

<template lang="pug">
q-dialog(v-model="modelValue")
	q-card(style="min-width: 400px;")
		q-btn.close(round color="negative" icon="mdi-close" v-close-popup)
		q-card-section
			.text-h6 Добавить поле

		q-form(@submit="create")
			q-card-section
				label Название
				q-input(v-model="name" filled autofocus)
				br
				label.q-mt-sm Тип
				q-select(v-model="type" filled :options="options")

			q-card-actions.q-mx-sm.q-mb-md(align="right")
				q-btn(flat color="primary" label="Отмена" @click="close")
				q-btn(unelevated color="primary" label="Добавить" type="submit" :disable="!name.length")
</template>

<style scoped lang="scss"></style>
