<script setup lang="ts">
import { ref, watch } from 'vue'
import { useForms } from '@/stores/forms'
import { useRouter, useRoute } from 'vue-router'
import StatusDialogAdd from '@/components/StatusDialogAdd.vue'

const myform = useForms()

const form = ref('')
const route = useRoute()
const router = useRouter()

const dialog = ref(false)

const setForm = ((e: string) => {
	form.value = e
})

const update = (() => {
	myform.currentBO.form = form.value 
	console.log('update')
})

const run = (() => {
	myform.newform = true
	router.push(`/${route.params.id}/editor/process/${form.value}`)
})

</script>

<template lang="pug">
div Форма:
// q-select(v-model="form" dense filled :options="myform.formList")
q-select(v-model="form" dense filled :options="myform.formList" @update:model-value="update")
	template(v-slot:after)
		q-btn(flat round icon="mdi-arrow-right-circle-outline" color="primary" @click="run" dense) 
			q-tooltip Редактировать
	template(v-slot:after-options)
		q-separator
		q-item
			q-item-section
				q-btn(flat color="primary" label="Создать форму" icon="mdi-plus-circle" @click="dialog = true" size='sm' v-close-popup) 

StatusDialogAdd(v-model="dialog" type='form' @set="setForm")
</template>

<style scoped lang="scss"></style>
