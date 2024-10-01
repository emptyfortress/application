<script setup lang="ts">
const modelValue = defineModel<boolean>()

const emit = defineEmits(['create'])

const create = (data: any) => {
	emit('create', data.comment)
}
</script>

<template lang="pug">
q-dialog(v-model="modelValue")
	q-card(style="min-width: 400px;")
		q-btn.close(round color="negative" icon="mdi-close" v-close-popup)
		q-card-section
			.text-h6 Опубликовать версию
		q-card-section
			FormKit(type="form" id="newapp" submit-label="Опубликовать" @submit="create")
				FormKit(type="text" autofocus name="comment" label="Комментарий" help="Краткое описание версии" validation="required|length:3")

</template>

<style scoped lang="scss"></style>
