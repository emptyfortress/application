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

const name = ref('Мое приложение')
const descr = ref('')

const close = () => {
	modelValue.value = false
}

const emit = defineEmits(['create'])

const create = (data: any) => {
	data.id = +new Date()
	data.text = data.name
	data.type = 1
	data.version = '0.0.0'
	emit('create', data)
	close()
}
const card = ref(true)
</script>

<template lang="pug">
q-dialog(v-model="modelValue")
	q-card(style="min-width: 400px;")
		q-btn.close(round color="negative" icon="mdi-close" v-close-popup)
		q-card-section
			.text-h6(v-if="props.mode == 'app'") Новое приложение
			.text-h6(v-if="props.mode == 'role'") Создать роль 
			.text-h6(v-if="props.mode == 'list'") Создать список

		q-card-section
			FormKit(type="form" id="newapp" submit-label="Создать" @submit="create")
				FormKit(v-if='props.mode == "app"'  type="text" autofocus name="name" label="Название" value='Мое приложение' help="Назовите ваше приложение" validation="required|length:3")
				FormKit(v-if='props.mode == "app"' type="textarea" name="descr" label="Описание" help="Что будет делать ваше приложение?")

				FormKit(v-if='props.mode == "list"' type="text" autofocus name="name" label="Название" validation="required|length:3")
				FormKit(v-if='props.mode == "list"' type="textarea" name="descr" label="Описание")

</template>

<style scoped lang="scss"></style>
