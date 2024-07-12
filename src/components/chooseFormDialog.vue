<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { etaps } from '@/stores/tree'
import { useStore } from '@/stores/store'

const modelValue = defineModel<boolean>()

const close = () => {
	modelValue.value = false
}

const emit = defineEmits(['choose'])

const chips = reactive(etaps)

const select = (e: any) => {
	chips.map((item: any) => {
		item.selected = false
	})
	e.selected = true
}
const reset = () => {
	chips.map((item: any) => {
		item.selected = false
	})
}
const selected = computed(() => {
	return chips.filter((item: any) => item.selected == true)
})
const store = useStore()

const loadForm = () => {
	store.selectForm()
	close()
	reset()
}
</script>

<template lang="pug">
q-dialog(v-model="modelValue")
	q-card(style="min-width: 400px;")
		q-btn.close(round color="negative" icon="mdi-close" v-close-popup)
		q-card-section
			.text-h6 Выбрать форму для этапа

		q-form(@submit="loadForm")
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
				q-btn(unelevated color="primary" label="Выбрать" type="submit" :disable="selected.length == 0")
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
