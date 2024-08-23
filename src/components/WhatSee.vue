<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoles } from '@/stores/roles'
import { useForms } from '@/stores/forms'
import { useStorage } from '@vueuse/core'
import draggable from 'vuedraggable'
import ConditionDialogRow from '@/components/ConditionDialogRow.vue'
import ConditionDialogAdd from '@/components/ConditionDialogAdd.vue'
import { useRouter, useRoute } from 'vue-router'
import { useFlow } from '@/stores/flow'
const store = useFlow()

const myform = useForms()
const myrole = useRoles()
const myflow = useFlow()
const app = useStorage('app', localStorage)
const router = useRouter()
const route = useRoute()

const etapConditionList = computed(() => {
	return myform.conditionList.filter((item: Condition) => {
		return item.etap == myform.currentEtap
	})
})

// const goto = (e: string) => {
// 	router.push(`/${route.params.id}/editor/process/${e}`)
// }

const goto1 = (e: string) => {
	myform.newform = true
	router.push(`/${route.params.id}/editor/process/${e}`)
}

// const goto2 = (e: string) => {
// 	myform.toggleZay()
// 	myform.setZayForm(e)
// 	router.push(`/${route.params.id}/editor/process/${e}`)
// }

const dialogRow = ref(false)
const dialogAdd = ref(false)

const toggle0 = () => {
	row.value = null
	dialogRow.value = !dialogRow.value
}

const formselected = ref('')
const row = ref(null)

const toggle2 = () => {
	dialogAdd.value = !dialogAdd.value
}
const el = ref()
const toggle1 = (el: any) => {
	row.value = el
	dialogRow.value = !dialogRow.value
}
</script>

<template lang="pug">
.q-mx-md
	.text-bold Что видит пользователь?
	q-markup-table(bordered flat)
		thead
			tr
				th.text-left Роль
				th.text-left Форма
				th

		tbody
			tr(v-if='etapConditionList.length == 0' @click='toggle0')
				td {{ myrole.currentRole}}
				td
				td

			template(v-else)
				tr(v-for="element in etapConditionList" :key='element.id' @click='toggle1(element)')
					td {{ element.role }}
					td.btd {{ element.form }}
					td.text-right
						q-btn(v-if='element.role !== myrole.currentRole' flat round color="primary" icon='mdi-trash-can-outline' dense @click.stop="myform.removeCondition(element)" size='sm') 

	q-markup-table.second(bordered flat)
		tbody
			tr(@click='toggle3')
				td Все остальные
				td(colspan="2") Нет доступа

	q-btn.q-ma-md(v-if='myrole.roles.length > 0' unelevated color="primary" label="Добавить" @click="toggle2" size='sm') 

	ConditionDialogRow(v-model="dialogRow" :row='row')
	ConditionDialogAdd(v-model="dialogAdd")

</template>

<style scoped lang="scss">
.btd {
	color: $primary;
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
</style>
