<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { etaps } from '@/stores/tree'
// import { uid } from 'quasar'

const modelValue = defineModel<boolean>()

// const name = ref('')
// const type = ref('Строка')

const close = () => {
	// name.value = ''
	// type.value = ''
	modelValue.value = false
}

const emit = defineEmits(['choose'])

// const create = () => {
// 	let tmp = {
// 		id: uid(),
// 		name: name.value,
// 		type: type.value,
// 	}
// 	emit('create', tmp)
// 	name.value = ''
// 	type.value = ''
// 	modelValue.value = false
// }
// const options = ['Строка', 'Сотрудник', 'Текст', 'Кнопка', 'Кнопка действий']
const chips = reactive(etaps)
</script>

<template lang="pug">
q-dialog(v-model="modelValue")
	q-card(style="min-width: 400px;")
		q-btn.close(round color="negative" icon="mdi-close" v-close-popup)
		q-card-section
			.text-h6 Выбрать этап(ы)

		q-form(@submit="close")
			q-card-section
				q-chip(v-for="chip in chips"
					clickable
					:label="chip.label"
					v-model:selected="chip.selected"
					:key="chip.id"
					)
				// label Метка
				// q-input(v-model="label" filled autofocus)
				// br
				// label Название
				// q-input(v-model="name" filled autofocus)
				// br
				// label.q-mt-sm Тип
				// q-select(v-model="type" filled :options="options")

			q-card-actions.q-mx-sm.q-mb-md(align="right")
				q-btn(flat color="primary" label="Отмена" @click="close")
				q-btn(unelevated color="primary" label="Выбрать" type="submit")
</template>

<style scoped lang="scss">
.q-chip--selected {
	background: $primary;
	color: white;
}
:deep(.q-chip__icon) {
	color: white;
}
</style>
