<script setup lang="ts">
import { ref } from 'vue'
import chooseEtapDialog from '@/components/chooseEtapDialog.vue'
import { useRouter, useRoute } from 'vue-router'
import { useForms } from '@/stores/forms'

const router = useRouter()
const route = useRoute()

const myform = useForms()

const dialog = ref(false)

const toggleDialog = () => {
	dialog.value = !dialog.value
}
const edit = (e: string) => {
	let url = '/' + route.params.id + '/editor/process/' + e
	router.push(url)
}

const goto = (e: string) => {
	let url = '/' + route.params.id + '/editor/process/' + e
	router.push(url)
}
const calcCondition = (e: string) => {
	let row = myform.conditionList.filter((item: Condition) => {
		return item.form == e
	})
	return row
}
</script>

<template lang="pug">
.bl
	h5 Формы
	q-list(separator)
		q-expansion-item(v-for='form in myform.formList' :key='form.id' )
			template(v-slot:header)
				q-item-section(avatar)
					q-icon(name='mdi-list-box-outline')
				q-item-section()
					q-item-label {{ form.name }}
				q-item-section(side)
					.row.q-gutter-x-sm
						q-btn(flat round icon='mdi-pencil-outline' color='primary' dense size='sm' @click.stop='goto(form.label)') 
						q-btn(flat round icon='mdi-content-duplicate' color='primary' dense size='sm' @click.stop='') 
						q-btn(flat round icon='mdi-trash-can-outline' color='primary' dense size='sm' @click.stop='') 
			q-card
				q-card-section
					.grd
						.hd Условия показа формы:
						q-markup-table(flat)
							thead
								tr
									th.text-left Этап
									th.text-left Роль
							tbody
								tr(v-for="item in calcCondition(form.name)" :key='item.id')
									td {{ item.etap }}
									td {{ item.role }}

	br
	q-btn(unelevated color="primary" label="Создать форму" @click="toggleDialog") 
chooseEtapDialog(v-model="dialog")
</template>

<style scoped lang="scss">
:deep(.q-expansion-item--expanded .q-expansion-item__container) {
	border: 1px solid $primary;
	margin-bottom: 1rem;
}
.hd {
	font-size: 1rem;
	font-weight: 600;
}
.grd {
	display: grid;
	grid-template-columns: auto 1fr;
	column-gap: 4rem;
}
th {
	font-weight: 600;
	background: #eee;
	padding: 0.3rem 1rem;
}
.q-table thead tr,
.q-table tbody td {
	height: initial;
}
td span {
	margin-right: 1rem;
}
</style>
