<script setup lang="ts">
// import { computed, ref, } from 'vue'
import { useForms } from '@/stores/forms'
import { uid } from 'quasar'

const props = defineProps({
	type: {
		type: String,
		default: 'status'
	}
})

const modelValue = defineModel<boolean>()

const myform = useForms()

const emit = defineEmits(['set'])

const add = (data: any) => {
	myform.addStatus(data.status)
	emit('set', data.status)
	modelValue.value = false
}

const add1 = (data: any) => {
	let row = {
		id: uid(),
		label: data.form,
		value: data.form,
		desc: 'Это описание формы',
		selected: false,
		type: 1,
		layout: [
			{
				x: 1,
				y: 0,
				w: 10,
				h: 5,
				i: 0,
				selected: false,
				fieldList: []
			},
		]
	}
	myform.createForm(row)
	emit('set', data.form)
	modelValue.value = false
}
</script>

<template lang="pug">
q-dialog(v-model="modelValue")
	q-card(style="min-width: 400px;")
		q-btn.close(round color="negative" icon="mdi-close" v-close-popup)
		q-card-section
			.text-h6(v-if='props.type == "status"') Добавить статус
			.text-h6(v-else) Создать форму

		q-card-section(v-if='props.type == "status"')
			FormKit(type="form" id="newstate" submit-label="Добавить" @submit="add")
				FormKit(type="text" autofocus name="status" label="Статус" help="Назовите новый статус" validation="required|length:3")

		q-card-section(v-else)
			FormKit(type="form" id="newform" submit-label=" создать" @submit="add1")
				FormKit(type="text" autofocus name="form" label="Форма" help="Назовите форму" validation="required|length:3")

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
