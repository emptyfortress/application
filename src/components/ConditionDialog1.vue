<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
// import { forms } from '@/stores/tree'
import { useStore } from '@/stores/store'

// interface Etap {
// 	id: number
// 	etap: string
// 	selected: boolean
// }

const modelValue = defineModel<boolean>()

const list = reactive([
	{ id: 2, role: 'Инициатор', selected: false },
	// { id: 3, role: 'Рассматривающий', selected: false },
	// { id: 4, role: 'Все остальные', selected: false },
])
const selection = computed(() => {
	return list.filter((item) => item.selected)
})

const list1 = reactive([
	// { id: 2, form: 'Создание', selected: false },
	// { id: 3, form: 'Просмотр', selected: false },
	// { id: 4, form: 'Редактирование', selected: false },
])
const selection1 = computed(() => {
	return list1.filter((item) => item.selected)
})

const store = useStore()

const emit = defineEmits(['add'])
const add = () => {
	let tmp = {
		id: +new Date(),
		role: selection.value[0].role,
		form: selection1.value[0].form,
		dis: false,
	}
	emit('add', tmp)
	modelValue.value = false
	list.map((item: any) => (item.selected = false))
	list1.map((item: any) => (item.selected = false))
}

const select = (e: any) => {
	list.map((item: any) => {
		item.selected = false
	})
	e.selected = true
}
const select1 = (e: any) => {
	list1.map((item: any) => {
		item.selected = false
	})
	e.selected = true
}
</script>

<template lang="pug">
q-dialog(v-model="modelValue")
	q-card(style="min-width: 700px;")
		q-btn.close(round color="negative" icon="mdi-close" v-close-popup)
		q-card-section
			.text-h6 Условие показа
			.hd Выберите роль и назначьте ей форму для показа:

		q-form(@submit="add")
			q-card-section
				.grid
					div
						.text-bold Роли
						q-chip(v-for="chip in list"
							clickable
							:label="chip.role"
							v-model:selected="chip.selected"
							:key="chip.id"
							@click='select(chip)'
							)
					div
						.text-bold Формы
						q-chip(v-for="chip in list1"
							clickable
							:label="chip.form"
							v-model:selected="chip.selected"
							:key="chip.id"
							@click='select1(chip)'
							)

			q-card-actions.q-mx-sm.q-mb-md(align="right")
				q-btn(flat color="primary" label="Отмена" v-close-popup)
				q-btn(unelevated color="primary" label="Сохранить" type="submit")
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
</style>
