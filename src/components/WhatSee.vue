<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoles } from '@/stores/roles'
import { useForms } from '@/stores/forms'
import { useStorage } from '@vueuse/core'
import draggable from 'vuedraggable'
import ConditionDialog1 from '@/components/ConditionDialog1.vue'
import ConditionDialog2 from '@/components/ConditionDialog2.vue'
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

const dialog1 = ref(false)
const dialog2 = ref(false)

const toggle1 = () => {
	dialog1.value = !dialog1.value
}
const toggle2 = () => {
	dialog2.value = !dialog2.value
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

		tbody(v-if='etapConditionList.length == 0')
			tr(@click='toggle2')
				td {{ myrole.currentRole}}
				td
				td

		template(v-else)
			draggable(v-model="etapConditionList" tag="tbody" item-key="id")
				template(#item="{ element }")
					tr(scope='row' @click='toggle2')
						td {{ element.role }}
						td.btd {{ element.form }}
						td.text-right
							q-btn(flat round color="primary" icon='mdi-trash-can-outline' dense @click.stop="myform.removeCondition(element)" size='sm') 

	q-markup-table.second(bordered flat)
		tbody
			tr
				td Все остальные
				td(colspan="2") Нет доступа

	q-btn.q-ma-md(v-if='myrole.roles.length > 0' unelevated color="primary" label="Добавить" @click="toggle1" size='sm') 

	ConditionDialog1(v-model="dialog1")
	ConditionDialog2(v-model="dialog2")

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
