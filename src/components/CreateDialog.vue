<script setup lang="ts">
import { ref } from 'vue'
import { uid } from 'quasar'

const props = defineProps({
	mode: {
		type: String,
		default: 'app',
	},
})
const icon = ref(3)
const modelValue = defineModel<boolean>()

const name = ref('')
const descr = ref('')

const close = () => {
	name.value = ''
	descr.value = ''
	modelValue.value = false
}

const emit = defineEmits(['create'])

const create = () => {
	let tmp = {
		id: uid(),
		title: name.value,
		descr: descr.value,
		author: 'Орлов П.С.',
		created: '2024-05-15',
		icon: icon.value + 1,
	}
	emit('create', tmp)
	name.value = ''
	descr.value = ''
	icon.value += 1
	modelValue.value = false
}
</script>

<template lang="pug">
q-dialog(v-model="modelValue")
	q-card(style="min-width: 400px;")
		q-btn.close(round color="negative" icon="mdi-close" v-close-popup)
		q-card-section
			.text-h6(v-if="props.mode == 'app'") Новое приложение
			.text-h6(v-if="props.mode == 'scene'") Создать сценарий 
			.text-h6(v-if="props.mode == 'role'") Создать роль 

		q-card-section
			label Название
			q-input(v-model="name" filled autofocus)
			br
			label.q-mt-sm Описание
			q-input(v-model="descr" filled)

		q-card-actions.q-mx-sm.q-mb-md(align="right")
			q-btn(flat color="primary" label="Отмена" @click="close")
			q-btn(unelevated color="primary" label="Создать" @click="create" :disable="!name.length")
</template>

<style scoped lang="scss">
.q-input {
	font-size: 1.2rem;
}
</style>
