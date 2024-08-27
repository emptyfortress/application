<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoles } from '@/stores/roles'
import { useForms } from '@/stores/forms'
import { useStorage } from '@vueuse/core'
import draggable from 'vuedraggable'
import ConditionDialogRow from '@/components/ConditionDialogRow.vue'
import ConditionDialogAdd from '@/components/ConditionDialogAdd.vue'
import ConditionDialogOther from '@/components/ConditionDialogOther.vue'
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

const goto = (e: Condition) => {
	myform.zay = false
	if (e.role !== myrole.currentRole) {
		myform.notMain = true
	}
	router.push(`/${route.params.id}/editor/process/${e.form}`)
}

const goto1 = () => {
	myform.zay = false
	myform.newform = true
	let e = myform.currentEtap
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

const row = ref<null | Condition>(null)

const toggle2 = () => {
	dialogAdd.value = !dialogAdd.value
}
const toggleSecond = () => {
	row.value = {
		id: 'fuck',
		etap: myform.currentEtap,
		role: myrole.currentRole,
		form: '',
	}
	dialogRow.value = !dialogRow.value
}
const el = ref()
const toggle1 = (el: any) => {
	row.value = el
	dialogRow.value = !dialogRow.value
}

const dialogOther = ref(false)

const toggle3 = () => {
	dialogOther.value = !dialogOther.value
}

const addedFirst = computed(() => {
	// return myform.formList.length > 0 ? false : true

	let tmp = etapConditionList.value.find((item) => {
		return item.role == myrole.currentRole
	})
	return tmp == undefined ? true : false
})

const noset = ref<null | string>(null)

const set = (e: any) => {
	noset.value = e
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
			tr(v-if='etapConditionList.length == 0' @click='toggleSecond')
				td {{ myrole.currentRole}}
				td
					q-btn(flat color="primary" label="Создать" @click.stop="goto1" size='sm') 
					// q-btn(v-if='myform.formList.length == 0' flat color="primary" label="Создать" @click.stop="goto1" size='sm') 
				td

			tr(v-else v-for="element in etapConditionList" :key='element.id' @click='toggle1(element)')
				td {{ element.role }}
				td
					span.btd(@click='goto(element)') {{ element.form }}
				td.text-right
					q-btn(v-if='element.role !== myrole.currentRole' flat round color="primary" icon='mdi-trash-can-outline' dense @click.stop="myform.removeCondition(element)" size='sm') 

			tr(@click='toggle3')
				td Все остальные
				td
					span(v-if='noset == null') Нет доступа
					span.btd(v-else @click='goto(noset)') {{ noset }}
				td

	q-btn.q-ma-md(unelevated color="primary" label="Добавить" @click="toggle2" size='sm') 

	ConditionDialogRow(v-model="dialogRow" :row='row')
	ConditionDialogAdd(v-model="dialogAdd")
	ConditionDialogOther(v-model="dialogOther" @set='set')

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
</style>
