<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { useStore } from '@/stores/store'
import { useForms } from '@/stores/forms'

const modelValue = defineModel<boolean>()

const myform = useForms()

const selection = computed(() => {
	return myform.roles.filter((item) => item.selected)
})

const selection1 = computed(() => {
	return myform.formList.filter((item) => item.selected)
})

const store = useStore()

const add = () => {
	let tmp = {
		etap: myform.currentBO.name,
		role: selection.value[0].name,
		form: selection1.value[0].form,
	}
	myform.addToFormList(tmp)
	modelValue.value = false
	myform.roles.map((item: any) => (item.selected = false))
	myform.formList.map((item: any) => (item.selected = false))
}

const select = (e: any) => {
	myform.roles.map((item: any) => {
		item.selected = false
	})
	e.selected = true
}
const select1 = (e: any) => {
	myform.formList.map((item: any) => {
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
						q-chip(v-for="chip in myform.roles"
							clickable
							:label="chip.name"
							v-model:selected="chip.selected"
							:key="chip.id"
							@click='select(chip)'
							)
						// div {{ temp }}
					div
						.text-bold Формы
						q-chip(v-for="chip in myform.formList"
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
