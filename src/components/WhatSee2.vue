<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoles } from '@/stores/roles'
import { useForms } from '@/stores/forms'
import ConditionDialogRow from '@/components/ConditionDialogRow.vue'
import ConditionDialogAdd from '@/components/ConditionDialogAdd.vue'
import { useRouter, useRoute } from 'vue-router'

const myform = useForms()
const myrole = useRoles()
const router = useRouter()
const route = useRoute()

const etapConditionList = computed(() => {
	let tmp = myform.conditionList.filter((item: Condition) => {
		return item.etap == myform.currentEtap
	})
	return tmp
})

const goto = (e: Condition) => {
	if (e.role !== myrole.currentRole) {
		myform.notMain = true
	}
	router.push(`/${route.params.id}/editor/process/${e.form}`)
}

const goto1 = () => {
	myform.newform = true
	let e = myform.currentEtap
	router.push(`/${route.params.id}/editor/process/${e}`)
}

const dialogRow = ref(false)
const dialogAdd = ref(false)

const row = ref<null | Condition>(null)

const toggle2 = () => {
	dialogAdd.value = !dialogAdd.value
}

const toggle1 = (el: any) => {
	console.log(el)
	row.value = el
	dialogRow.value = !dialogRow.value
}

const otherCalc = computed(() => {
	const active = etapConditionList.value.map((item) => item.role)
	const flatActive = active.flat()
	const tmp = flatActive.filter((el) => el == 'Все остальные')
	return tmp.length == 0 ? true : false
})

</script>

<template lang="pug">
.q-mx-md
	.text-bold Что видят пользователи?
	q-markup-table(bordered flat)
		thead
			tr
				th.text-left Роль
				th.text-left Форма
				th

		tbody
			tr(v-if='etapConditionList.length == 0')
				td {{ myrole.currentRole }}
				td
					q-btn(unelevated color="primary" label="Создать форму" @click="goto1" size='sm') 
				td

			tr(v-for="element in etapConditionList" :key='element.id' @click='toggle1(element)')
				td
					div.q-mr-sm(v-if='Array.isArray(element.role)' v-for="(item, ind) in element.role" :key='ind') {{ item }}
					div(v-else) {{ element.role }}
				td
					span.btd(@click='goto(element)') {{ element.form }}
						q-tooltip Редактировать форму
				// TODO: fix type
				td.text-right
					q-btn(flat round color="primary" icon='mdi-trash-can-outline' dense @click.stop="myform.removeCondition(element)" size='sm') 
					q-icon(name="mdi-chevron-right" color="primary" size='sm')
						q-tooltip Назначить условие показа

	.other(v-if='otherCalc') Все остальные роли не имеют доступа к просмотру.

	q-btn.q-mt-md(flat color="primary" icon='mdi-plus-circle' label="Добавить роль/форму" @click="toggle2" size='sm') 


	ConditionDialogRow(v-model="dialogRow" :row='row')
	ConditionDialogAdd(v-model="dialogAdd")

</template>

<style scoped lang="scss">
.btd {
	color: $primary;
	text-decoration: underline;
	text-align: left;
}

.selected {
	background: var(--bg-selected);
}

.down {
	transform: translateY(-2px);
}

tr {
	cursor: pointer;
}

.second {
	border-top: none;
}

.other {
	font-weight: 600;
	font-size: 0.8rem;
}
</style>
