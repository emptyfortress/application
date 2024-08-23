<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useStore } from '@/stores/store'
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

const rolesChip = computed(() => {
	return myrole.roles.filter((item) => item.name !== myrole.currentRole)
})

const etapConditionList = computed(() => {
	return myform.conditionList.filter((item: Condition) => {
		return item.etap == myform.currentEtap
	})
})

const rolesChip1 = computed(() => {
	let active = etapConditionList.value.map((item) => item.role)
	let filtered = myrole.roles.filter((role) => !active.includes(role.name))
	return filtered
})
const formsChip = ref(myform.formList)

// reset chip selection
watch(modelValue, (val) => {
	if (val) {
		rolesChip.value.map((item: any) => (item.selected = false))
		formsChip.value.map((item: any) => (item.selected = false))
	}
})

const ad = ref(false)
const ad1 = ref(false)

const addForm = () => {
	myform.createForm(newForm.value)
	clear()
}
const addRole = () => {
	let tmp = {
		id: uid(),
		name: newRole.value,
		selected: false,
	}
	myrole.addRole(tmp)
	clear()
}
const newForm = ref('')
const newRole = ref('')

const clear = () => {
	ad.value = false
	ad1.value = false
	newForm.value = ''
	newRole.value = ''
}

onKeyStroke('Enter', () => {
	if (ad.value == true && newForm.value.length > 2) {
		addForm()
	}
	if (ad1.value == true && newRole.value.length > 2) {
		addRole()
	}
})
onKeyStroke('Escape', () => {
	ad1.value = !ad1.value
})
onKeyStroke('Shift', () => {
	ad.value = !ad.value
})
</script>

<template lang="pug">
q-dialog(v-model="modelValue" persistent)
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
						q-chip(v-for="chip in rolesChip1"
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

			br
			q-card-actions.q-mx-sm.q-mb-md(align="right")
				.rel1
					q-btn(flat icon="mdi-plus-circle" color="primary" label="Добавить роль" @click="ad1 = true") 
					q-input.newname(v-if='ad1' autofocus v-model="newRole" dense outlined bg-color="white")
						template(v-slot:append)
							q-btn(flat round icon="mdi-close" @click="clear" dense size='11px') 
							q-btn(flat round icon="mdi-check" @click="addRole" dense size='11px') 
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
