<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { requests } from '@/stores/tree'
import { useStore } from '@/stores/store'
import { useForms } from '@/stores/forms'

const props = defineProps({
	kind: {
		type: String,
		required: true,
		default: 'form',
	},
})
const modelValue = defineModel<boolean>()

const close = () => {
	modelValue.value = false
}

const emit = defineEmits(['choose'])

const req = ref(requests)

const myform = useForms()

const allForms = computed(() => {
	return myform.formList.map((item, index) => ({
		id: index,
		label: item.form,
		selected: false,
	}))
})
const temp = ref([...allForms.value])

const chips = computed(() => {
	switch (props.kind) {
		case 'form':
			return temp.value
		case 'request':
			return req.value
		case 'view':
			return req.value
		default:
			return temp.value
	}
})

const select = (e: any) => {
	chips.value.map((item: any) => {
		item.selected = false
	})
	e.selected = true
}
const reset = () => {
	chips.value.map((item: any) => {
		item.selected = false
	})
}
// const selected = computed(() => {
// 	return chips.value.filter((item: any) => item.selected == true)
// })
const store = useStore()

const loadForm = () => {
	store.selectForm()
	close()
	reset()
}

const name = computed(() => {
	switch (props.kind) {
		case 'form':
			return 'форму'
		case 'request':
			return 'запрос'
		case 'view':
			return 'представление'
		default:
			return 'форму'
	}
})
const copy = ref(true)
</script>

<template lang="pug">
q-dialog(v-model="modelValue")
	q-card(style="min-width: 400px;")
		q-btn.close(round color="negative" icon="mdi-close" v-close-popup)
		q-card-section
			.text-h6 Выбрать {{ name }} из доступных

		q-form(@submit="loadForm" )
			q-card-section
				q-chip(v-for="chip in chips"
					clickable
					:label="chip.label"
					v-model:selected="chip.selected"
					:key="chip.id"
					@click="select(chip)"
					)

			q-card-actions.q-mx-sm.q-mb-md(align="right")
				q-btn(flat color="primary" label="Отмена" @click="close")
				q-space
				q-btn(flat color="primary" label="Сбросить" @click="reset")
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
