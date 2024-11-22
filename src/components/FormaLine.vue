<script setup lang="ts">
import { ref, computed } from 'vue'
import { useForms } from '@/stores/forms'
import { useRoles } from '@/stores/roles'
import { useRouter, useRoute } from 'vue-router'
import StatusDialogAdd from '@/components/StatusDialogAdd.vue'
import { uid } from 'quasar'

const myform = useForms()
const myrole = useRoles()

// const form = ref('')
const route = useRoute()
const router = useRouter()

const dialog = ref(false)

const setForm = (e: string) => {
	update(e)
}

const run = () => {
	myform.newform = true
	myrole.selectRole(null)
	router.push(`/${route.params.id}/editor/process/${calcForm.value}`)
}

const calcForm = computed({
	get() {
		let curr = myform.currentBO?.name
		let item = myform.conditionList.find((item) => item.etap == curr)

		if (item !== undefined) {
			return item.form
		}
		return ''
	},
	set(val) {
		update(val)
	},
})

const calcStatus = computed(() => {
	let curr = myform.currentBO?.name
	let item = myform.conditionList.find((item) => item.etap == curr)
	if (item !== undefined) {
		return item.status
	}
	return ''
})

const update = (val: any) => {
	let curr = myform.currentBO.name
	let item = myform.conditionList.find((item) => item.etap == curr)

	if (item == undefined) {
		let tmp = {
			id: uid(),
			etap: curr,
			form: val,
			status: '<status>',
			newstatus: '',
		}
		myform.addCondition(tmp)
	}

	if (item !== undefined) {
		item.form = val
	}
}
</script>

<template lang="pug">
div Форма:
q-select(v-model="calcForm" dense filled :options="myform.formList" @update:model-value="update" emit-value)
	template(v-slot:after)
		q-btn(flat round icon="mdi-arrow-right-circle-outline" color="primary" @click="run" dense) 
			q-tooltip Редактировать
	template(v-slot:after-options)
		q-separator
		q-item
			q-item-section
				q-btn(flat color="primary" label="Создать форму" icon="mdi-plus-circle" @click="dialog = true" size='sm' v-close-popup) 

div Текущий статус:
div {{ calcStatus }}

StatusDialogAdd(v-model="dialog" type='form' @set="setForm")
</template>

<style scoped lang="scss"></style>
