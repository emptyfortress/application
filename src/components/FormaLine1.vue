<script setup lang="ts">
import { ref, computed } from 'vue'
import { useForms } from '@/stores/forms'
import { useRoles } from '@/stores/roles'
import { useRouter, useRoute } from 'vue-router'
import StatusDialogAdd from '@/components/StatusDialogAdd.vue'
import { uid } from 'quasar'

const myform = useForms()
const myrole = useRoles()

const route = useRoute()
const router = useRouter()

const dialog = ref(false)

const setForm = (e: Form) => {
	myrole.selectedRole!.form = e
}

const run = () => {
	myform.newform = true
	router.push(`/${route.params.id}/editor/process/${myrole.selectedRole?.form?.label}`)
}
</script>

<template lang="pug">
div Форма:
q-select(v-if='!!myrole.selectedRole' v-model="myrole.selectedRole.form" dense filled :options="myform.formList" emit-value)
	template(v-slot:after)
		q-btn(flat round icon="mdi-arrow-right-circle-outline" color="primary" @click="run" dense) 
			q-tooltip Редактировать
	template(v-slot:after-options)
		q-separator
		q-item
			q-item-section
				q-btn(flat color="primary" label="Создать форму" icon="mdi-plus-circle" @click="dialog = true" size='sm' v-close-popup) 

div Текущий статус:
div {status}

StatusDialogAdd(v-model="dialog" type='form' @set="setForm")
</template>

<style scoped lang="scss"></style>
