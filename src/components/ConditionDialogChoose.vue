<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useForms } from '@/stores/forms'
import { useRoles } from '@/stores/roles'
import { useFlow } from '@/stores/flow'
import { uid } from 'quasar'
import { onKeyStroke } from '@vueuse/core'
import { templateRef } from '@vueuse/core'

const modelValue = defineModel<boolean>()

const myform = useForms()
const myrole = useRoles()
const myflow = useFlow()

const formsChip = ref(myform.formList)

const rolesChip1 = computed(() => {
	const active = etapConditionList.value.map((item) => item.role)
	const flatActive = active.flat()
	let filtered = myrole.roles.filter(
		(role) => !flatActive.includes(role.name) && flatActive.includes(myrole.currentRole)
	)
	return filtered
})

const etapConditionList = computed(() => {
	return myform.conditionList.filter((item: Condition) => {
		return item.etap == myform.currentEtap
	})
})

// *********************

const selectionRoles = computed(() => {
	return rolesChip1.value.filter((item: Role) => item.selected)
})

const selectionForms = computed(() => {
	return formsChip.value.filter((item: Form) => item.selected)
})

const calcRoles = computed(() => {
	return selectionRoles.value.map((el) => el.name)
})

const add = () => {
	const current = myform.conditionList.find(
		(el: Condition) => el.etap == myform.currentEtap && el.role == myrole.currentRole
	)
	if (current !== undefined) {
		current.form = selectionForms.value[0].name
	} else {
		let tmp = {
			id: uid(),
			etap: myform.currentEtap,
			role: myrole.currentRole,
			form: selectionForms.value[0].name,
		}
		myform.addCondition(tmp)
	}
	modelValue.value = false
}

const selectForm = (e: any) => {
	formsChip.value.map((item: any) => {
		item.selected = false
	})
	e.selected = true
}

watch(modelValue, (val) => {
	if (val) {
		formsChip.value.map((item: any) => (item.selected = false))
	}
})

const ad = ref(false)

const addForm = () => {
	myform.createForm(newForm.value, 'Это сопроводительный текст-описание')
	clear()
}
const newForm = ref('')

const clear = () => {
	ad.value = false
	newForm.value = ''
}

onKeyStroke('Enter', () => {
	if (ad.value == true && newForm.value.length > 2) {
		addForm()
	}
})
onKeyStroke('Escape', () => {
	ad.value = !ad.value
})
</script>

<template lang="pug">
q-dialog(v-model="modelValue" persistent)
	q-card(style="min-width: 600px;")
		q-btn.close(round color="negative" icon="mdi-close" v-close-popup)
		q-card-section
			.text-h6 Выбрать форму из доступных

		q-form(@submit="add")
			q-card-section
				q-chip(v-for="chip in formsChip"
					clickable
					:label="chip.name"
					v-model:selected="chip.selected"
					:key="chip.id"
					@click='selectForm(chip)'
					)

			br
			q-card-actions.q-mx-sm.q-mb-md(align="right")
				.rel
					q-btn(flat icon="mdi-plus-circle" color="primary" label="Добавить форму" @click="ad = true") 
					q-input.newname(v-if='ad' autofocus v-model="newForm" dense outlined bg-color="white")
						template(v-slot:append)
							q-btn(flat round icon="mdi-close" @click="clear" dense size='11px') 
							q-btn(flat round icon="mdi-check" @click="addForm" dense size='11px') 
				q-space
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
