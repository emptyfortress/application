<script setup lang="ts">
import { useForms } from '@/stores/forms'

const myform = useForms()
</script>

<template lang="pug">
.list
	template(v-if='myform.zayform == "Создание"')
		FormKit(type="text" autofocus name="name" label="Автор" value='Сидоров А.Г.' help="Автор заявки" validation="required|length:3")
		FormKit(type="text" autofocus name="name" label="Исполнитель" validation="required|length:3")
		FormKit(type="textarea" name="descr" label="Описание" help="Что требуется?")
	template(v-if='myform.zayform == "Просмотр"')
		.grid
			label Автор:
			div
				span.val Сидоров А.Г.
			label Исполнитель:
			div
				span.val Орлов П.А.
			label Описание:
			div
				span.val Это описание заявки, достаточно длинное, чтобы поместиться в тексареа.
	template(v-if='myform.zayform == "Архив"')
		.grid
			label Автор:
			div Сидоров А.Г.
			label Исполнитель:
			div Орлов П.А.
			label Описание:
			div Это описание заявки, достаточно длинное, чтобы поместиться в тексареа.

</template>

<style scoped lang="scss">
.list {
	border-top: 1px solid #ccc;
	padding: 0.5rem;
	background: #f5f5f4;
	min-height: 400px;
}
:deep(.formkit-input) {
	background: #fff;
}
.grid {
	display: grid;
	grid-template-columns: auto 1fr;
	column-gap: 1rem;
	row-gap: 0.5rem;
}
.val {
	color: $primary;
	border-bottom: 1px dotted blue;
}
</style>
