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
	modelValue.value = false
}

const emit = defineEmits(['create'])

const create = (data: any) => {
	data.id = +new Date()
	data.text = data.name
	data.type = 1
	emit('create', data)
	close()
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
			FormKit(type="form" id="newapp" submit-label="Создать" @submit="create")
				FormKit(type="text" name="name" label="Название" help="Назовите ваше приложение" validation="required|length:3")
				FormKit(type="textarea" name="descr" label="Описание" help="Что будет делать ваше приложение?")

</template>

<style scoped lang="scss"></style>
