<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoles } from '@/stores/roles'
import { useForms } from '@/stores/forms'
import { useStorage } from '@vueuse/core'
// import draggable from 'vuedraggable'
import ConditionDialogRow from '@/components/ConditionDialogRow.vue'
import ConditionDialogAdd from '@/components/ConditionDialogAdd.vue'
import { useRouter, useRoute } from 'vue-router'
import { useFlow } from '@/stores/flow'
const store = useFlow()

const myform = useForms()
const myrole = useRoles()
// const myflow = useFlow()
// const app = useStorage('app', localStorage)
const router = useRouter()
const route = useRoute()

const etapConditionList = computed(() => {
	let tmp = myform.conditionList.filter((item: Condition) => {
		return item.etap == myform.currentEtap
	})
	return tmp
})

// const showAddCond = computed(() => {
// 	let tmp = myform.conditionList.filter((item: Condition) => {
// 		return item.etap == myform.currentEtap
// 	})
// 	return tmp.length > 0 ? true : false
// })

const goto = (e: Condition) => {
	myform.zay = false
	if (e.role !== myrole.currentRole) {
		myform.notMain = true
	}
	router.push(`/${route.params.id}/editor/process/${e.form}`)
	// if (e.role[0] !== myrole.currentRole) {
	// 	myform.notMain = true
	// }
	// router.push(`/${route.params.id}/editor/process/${e.form}`)
}

const goto1 = () => {
	myform.zay = false
	myform.newform = true
	let e = myform.currentEtap
	router.push(`/${route.params.id}/editor/process/${e}`)
}

const dialogRow = ref(false)
const dialogAdd = ref(false)

// const toggle0 = () => {
// 	row.value = null
// 	dialogRow.value = !dialogRow.value
// }

const row = ref<null | Condition>(null)

const toggle2 = () => {
	dialogAdd.value = !dialogAdd.value
}

// const toggleSecond = () => {
// 	row.value = {
// 		id: 'fuck',
// 		etap: myform.currentEtap,
// 		role: myrole.currentRole,
// 		form: '',
// 	}
// 	dialogRow.value = !dialogRow.value
// }

// const el = ref()

const toggle1 = (el: any) => {
	console.log(el)
	row.value = el
	dialogRow.value = !dialogRow.value
}

// const dialogOther = ref(false)

// const toggle3 = () => {
// 	dialogOther.value = !dialogOther.value
// }

// const addedFirst = computed(() => {
// 	// return myform.formList.length > 0 ? false : true
// 	let tmp = etapConditionList.value.find((item) => {
// 		return item.role == myrole.currentRole
// 	})
// 	return tmp == undefined ? true : false
// })

const noset = ref<null | string>(null)

// const set = (e: any) => {
// 	noset.value = e
// }

const otherCalc = computed(() => {
	const active = etapConditionList.value.map((item) => item.role)
	const flatActive = active.flat()
	const tmp = flatActive.filter((el) => el == 'Все остальные')
	return tmp.length == 0 ? true : false
})

// const calcIni = computed(() => {
// 	const active = etapConditionList.value.map((item) => item.role)
// 	const flatActive = active.flat()
// 	const tmp = flatActive.filter((el) => el == myrole.currentRole)
// 	return tmp.length == 0 ? true : false
// })

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
			// tr(v-if='myform.conditionList.length == 0')
			tr(v-if='etapConditionList.length == 0')
				td {{ myrole.currentRole }}
				td
					q-btn(unelevated color="primary" label="Создать форму" @click="goto1" size='sm') 
					// q-btn(unelevated color="primary" label="Создать" @click="toggle2" size='sm') 
				td

			tr(v-for="element in etapConditionList" :key='element.id' @click='toggle1(element)')
				td
					div.q-mr-sm(v-if='Array.isArray(element.role)' v-for="(item, ind) in element.role" :key='ind') {{ item }}
					div(v-else) {{ element.role }}
				td
					span.btd(@click='goto(element)') {{ element.form }}
						q-tooltip Редактировать форму
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
