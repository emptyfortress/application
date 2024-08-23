<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useForms } from '@/stores/forms'
import { useRoles } from '@/stores/roles'
import { useFlow } from '@/stores/flow'
import { uid } from 'quasar'
import { onKeyStroke } from '@vueuse/core'
import { templateRef } from '@vueuse/core'

interface Props {
	id: string
	etap: string
	role: string
	form: string
}
const props = defineProps<{
	row: Props | null
}>()

const modelValue = defineModel<boolean>()

const myform = useForms()
const myrole = useRoles()
const myflow = useFlow()

const formsChip = ref(myform.formList)

// watch(modelValue, (val) => {
// 	if (val && props.formselected) {
// 		let tmp = formsChip.value.find((item) => {
// 			item.form == props.formselected
// 		})
// 		if (!!tmp) {
// 			tmp.selected = true
// 		}
// 	}
// })

const selection1 = computed(() => {
	return formsChip.value.filter((item: Form) => item.selected)
})
const select1 = (e: any) => {
	formsChip.value.map((item: any) => {
		item.selected = false
	})
	e.selected = true
}

const save = () => {
	if (!!props.row) {
		props.row.form = selection1.value[0].name
	} else {
		console.log('add')
		myform.conditionList.push({
			id: uid(),
			etap: myform.currentEtap,
			role: myrole.currentRole,
			form: selection1.value[0].name,
		})
	}
	modelValue.value = false
}

const ad = ref(false)

const addForm = () => {
	myform.createForm(newForm.value)
	clear()
}
const newForm = ref('')

const clear = () => {
	ad.value = false
	newForm.value = ''
}

const input = ref()
onKeyStroke('Enter', (e) => {
	if (ad.value == true && newForm.value.length > 2) {
		addForm()
	} else {
		e.preventDefault()
		ad.value = true
	}
})
</script>

<template lang="pug">
q-dialog(v-model="modelValue" persistent)
	q-card(style="min-width: 700px;")
		q-btn.close(round color="negative" icon="mdi-close" v-close-popup)
		q-card-section
			.text-h6 Условие показа
			.hd Назначьте форму показа для выбранной роли:

		q-form(@submit="save")
			q-card-section
				.grid
					div
						.text-bold Роли
						q-chip(
							:label="myrole.currentRole"
							selected
							)
					div
						.text-bold Формы
						q-chip(v-for="chip in formsChip"
							clickable
							:label="chip.name"
							:key="chip.id"
							v-model:selected='chip.selected'
							@click='select1(chip)'
							)

			br
			q-card-actions.q-mx-sm.q-mb-md(align="right")
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
</style>
