<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { forms } from '@/stores/tree'
import { useStore } from '@/stores/store'

interface Etap {
	id: number
	etap: string
	selected: boolean
}

const modelValue = defineModel<boolean>()

const list = ref([
	// { id: 0, etap: 'Создал заявку', selected: true },
	// { id: 1, etap: 'Согласовать заявку', selected: true },
	{ id: 2, etap: 'Исправить заявку', selected: false },
	{ id: 3, etap: 'Рассмотреть заявку', selected: false },
	{ id: 4, etap: 'Обработать отказ', selected: false },
	{ id: 5, etap: 'Исполнить заявку', selected: false },
	{ id: 6, etap: 'Принять результаты', selected: false },
	{ id: 7, etap: 'Заявка отменена', selected: false },
	{ id: 8, etap: 'Заявка выполнена', selected: false },
])

const store = useStore()

const add = () => {
	let tmp = {
		id: +new Date(),
		etaps: selection.value.etaps,
		form: selection.value.form,
		dis: false,
	}
	store.addConditionRole(tmp)
	modelValue.value = false
	list.value = list.value.filter((item: Etap) => !item.selected)
	chips1.map((item) => (item.selected = false))
}

const chips1 = reactive(forms)

const form = ref(false)
const select = (e: any) => {
	chips1.map((item: any) => {
		item.selected = false
	})
	e.selected = true
}

const selection = computed(() => {
	let et = list.value.filter((a: Etap) => a.selected).map((e: Etap) => e.etap)
	let fo = chips1.filter((item: any) => item.selected).map((e: any) => e.label)
	return {
		etaps: et,
		form: fo[0],
	}
})
const selAll = () => {
	list.value.map((item) => (item.selected = true))
}
</script>

<template lang="pug">
q-dialog(v-model="modelValue")
	q-card(style="min-width: 900px;")
		q-btn.close(round color="negative" icon="mdi-close" v-close-popup)
		q-card-section
			.text-h6 Добавить условия показа
			.hd Выберите этап(ы) и назначьте им форму для показа:

		q-form(@submit="add")
			q-card-section
				.grid
					div
						.text-bold Этапы
						q-chip(v-if='list.length' clickable label='Все оставшиеся' @click='selAll')
						br
						q-chip(v-for="chip in list"
							clickable
							:label="chip.etap"
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

			// div {{activeList}}
			q-card-actions.q-mx-sm.q-mb-md(align="right")
				q-btn(flat color="primary" label="Отмена" v-close-popup)
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
