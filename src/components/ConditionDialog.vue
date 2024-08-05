<script setup lang="ts">
import { ref, reactive } from 'vue'
import { etaps, forms } from '@/stores/tree'

const modelValue = defineModel<boolean>()

const close = () => {
	// name.value = ''
	// type.value = ''
	modelValue.value = false
}

const emit = defineEmits(['choose'])
const chips = reactive(etaps)
const chips1 = reactive(forms)
const form = ref(false)
const select = (e: any) => {
	chips1.map((item: any) => {
		item.selected = false
	})
	e.selected = true
}
</script>

<template lang="pug">
q-dialog(v-model="modelValue")
	q-card(style="min-width: 900px;")
		q-btn.close(round color="negative" icon="mdi-close" v-close-popup)
		q-card-section
			.text-h6 Добавить условия показа
			.hd Выберите этап(ы) и назначьте им форму для показа:

		q-form(@submit="close")
			q-card-section
				.grid
					div
						.text-bold Этапы
						q-chip(v-for="chip in chips"
							clickable
							:label="chip.label"
							v-model:selected="chip.selected"
							:key="chip.id"
							)
					div
						.text-bold Формы
						q-chip(v-for="chip in chips1"
							clickable
							v-model:selected="chip.selected"
							:key="chip.id"
							@click='select(chip)'
							) Форма {{ chip.label }}

			q-card-actions.q-mx-sm.q-mb-md(align="right")
				q-btn(flat color="primary" label="Отмена" @click="close")
				q-btn(unelevated color="primary" label="Добавить условие" type="submit")
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
	// justify-items: start;
	// align-items: stretch;
	column-gap: 1rem;
}
</style>
