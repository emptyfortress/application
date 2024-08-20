<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { useStore } from '@/stores/store'
import { useForms } from '@/stores/forms'
import { useRoles } from '@/stores/roles'
import { useFlow } from '@/stores/flow'
import { uid } from 'quasar'

const modelValue = defineModel<boolean>()

const myform = useForms()
const myrole = useRoles()
const myflow = useFlow()

const selection = computed(() => {
	return rolesChip.value.filter((item: Role) => item.selected)
})

const selection1 = computed(() => {
	return formsChip.value.filter((item: Form) => item.selected)
})

const store = useStore()

const add = () => {
	let tmp = {
		id: uid(),
		etap: myform.currentBO.name,
		role: selection.value[0].name,
		form: selection1.value[0].name,
	}
	myform.addCondition(tmp)
	modelValue.value = false
}

const select = (e: Role) => {
	rolesChip.value.map((item) => (item.selected = false))
	e.selected = !e.selected
}
const select1 = (e: any) => {
	formsChip.value.map((item: any) => {
		item.selected = false
	})
	e.selected = true
}
const uniqForm = computed(() => {
	let list = myform.formList.map((item: Form) => ({
		id: item.id,
		name: item.name,
		selected: item.selected,
	}))
	return [...new Set(list)]
})

// const unusedRoles = computed(() => {
// 	let cond = myform.conditionList
// 		.filter((ro: Condition) => )
// 		.map((el: Condition) => el.role)
// 	return cond
// })

const rolesChip = ref([...myrole.rolesN])
const formsChip = ref([...uniqForm.value])

// reset chip selection
watch(modelValue, (val) => {
	if (val == false) {
		rolesChip.value.map((item: any) => (item.selected = false))
		formsChip.value.map((item: any) => (item.selected = false))
	}
})
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
						q-chip(v-for="chip in rolesChip"
							clickable
							:label="chip.name"
							v-model:selected="chip.selected"
							:key="chip.id"
							@click='select(chip)'
							)
					div
						.text-bold Формы
						q-chip(v-for="chip in formsChip"
							clickable
							:label="chip.name"
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
