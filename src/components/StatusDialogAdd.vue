<script setup lang="ts">
// import { ref, } from 'vue'
import { useForms } from '@/stores/forms'

const modelValue = defineModel<boolean>()

const myform = useForms()

const emit = defineEmits(['set'])

const add = (data: any) => {
	myform.addStatus(data.status)
	emit('set', data.status)
	modelValue.value = false
}

</script>

<template lang="pug">
q-dialog(v-model="modelValue")
	q-card(style="min-width: 400px;")
		q-btn.close(round color="negative" icon="mdi-close" v-close-popup)
		q-card-section
			.text-h6 Добавить состояние

		q-card-section
			FormKit(type="form" id="newstate" submit-label="Добавить" @submit="add")
				FormKit(type="text" autofocus name="status" label="Состояние" help="Назовите новое состояние" validation="required|length:3")

</template>

<style scoped lang="scss">
.q-chip--selected {
	background: $primary;
	color: white;
}

:deep(.q-chip__icon) {
	color: white;
}

.grid {
	display: grid;
	grid-template-columns: 1.5fr 2fr;
	column-gap: 1rem;
}

.newname {
	// width: 200px;
	position: absolute;
	top: 0;
	left: 0;
}

.rel1 {
	z-index: 10;
	position: relative;
}
</style>
