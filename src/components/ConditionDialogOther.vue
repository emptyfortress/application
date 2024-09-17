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

const selection1 = computed(() => {
	return formsChip.value.filter((item: Form) => item.selected)
})
const select1 = (e: any) => {
	formsChip.value.map((item: any) => {
		item.selected = false
	})
	e.selected = true
	nodostup.value = false
}
const select = () => {
	formsChip.value.map((item: any) => {
		item.selected = false
	})
}

const emit = defineEmits(['set'])

const save = () => {
	if (nodostup.value == true) {
		emit('set', null)
		modelValue.value = false
	} else {
		emit('set', selection1.value[0].name)
		modelValue.value = false
	}
}

const ad = ref(false)
const ad1 = ref(false)

const addRole = () => {
	let tmp = {
		id: uid(),
		name: newRole.value,
		selected: false,
	}
	myrole.addRole(tmp)
	clear()
}
const addForm = () => {
	myform.createForm(newForm.value, 'Это сопроводительный текст-описание')
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

const input = ref()

onKeyStroke('Enter', () => {
	if (ad.value == true && newForm.value.length > 2) {
		addForm()
	}
	if (ad1.value == true && newRole.value.length > 2) {
		addRole()
	}
})

const nodostup = ref(true)
const allSel = ref(false)

const etapConditionList = computed(() => {
	return myform.conditionList.filter((item: Condition) => {
		return item.etap == myform.currentEtap
	})
})

const rolesChip1 = computed(() => {
	const active = etapConditionList.value.map((item) => item.role)
	const flatActive = active.flat()
	let filtered = myrole.roles.filter(
		(role) => !flatActive.includes(role.name) && flatActive.includes(myrole.currentRole)
	)
	return filtered
})
</script>

<template lang="pug">
q-dialog(v-model="modelValue" persistent)
	q-card(style="min-width: 700px;")
		q-btn.close(round color="negative" icon="mdi-close" v-close-popup)
		q-card-section
			.text-h6 Условие показа
			.hd Назначьте форму показа для всех остальных ролей:
			.text-bold() Все остальные роли не имеют доступа к просмотру.

		q-form(@submit="save")
			q-card-section
				.grid
					div
						.text-bold Роли
						q-chip(
							label="Все остальные"
							v-model:selected='allSel'
							clickable
							)
						q-chip(v-for="chip in rolesChip1"
							clickable
							:label="chip.name"
							v-model:selected="chip.selected"
							:key="chip.id"
							)
					div
						.text-bold Формы
						// q-chip.neg(
							label='Нет доступа'
							v-model:selected='nodostup'
							@click='select' 
							)
						q-chip(v-for="chip in formsChip"
							clickable
							:label="chip.name"
							:key="chip.id"
							v-model:selected='chip.selected'
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
					q-input.newname(ref='input' v-if='ad' autofocus v-model="newForm" dense outlined bg-color="white")
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
.neg.q-chip--selected {
	background: $negative;
}
</style>
