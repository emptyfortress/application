<script setup lang="ts">
import { computed, ref } from 'vue'
import { useForms } from '@/stores/forms'
import StatusDialogAdd from '@/components/StatusDialogAdd.vue'
import { uid } from 'quasar'

const myform = useForms()
// const finish = ref(['Подготовка'])

const dialog = ref(false)

const start = ref<number>()

const setState = ((e: string) => {
	update(e)
})

const add = ((n: number) => {
	start.value = n
	dialog.value = !dialog.value
})

const calcStatus = computed({
	get() {
		let curr = myform.currentBO?.id
		let item = myform.conditionList.find((item) => item.etap == curr)
		if (item !== undefined) {
			return item.newstatus
		}
		return ''
	},
	set(val) {
		update(val)
	}
})

const update = ((val: any) => {
	let curr = myform.currentBO.id
	let item = myform.conditionList.find((item) => item.etap == curr)

	if (item == undefined) {
		let tmp = {
			id: uid(),
			etap: curr,
			form: val,
			status: 'Подготовка',
			newstatus: 'Подготовка'

		}
		myform.addCondition(tmp)
	}

	if (item !== undefined) {
		item.newstatus = val
	}
})
</script>

<template lang="pug">
.q-mx-md
	q-markup-table(bordered flat)
		thead
			tr
				th.text-left Вариант завершения
				th.text-left Статус по завершению
		tbody
			tr(v-if='myform.bt.length > 0' v-for="(item, index) in myform.bt")
				td
					span.btd {{ item.name }}
						q-popup-edit(v-model="item.name" auto-save v-slot="scope")
							q-input(v-model="scope.value" dense filled autofocus @keyup.enter="scope.set")
				td
					q-select(v-model="calcStatus" dense filled :options="myform.status" @update:model-value="update")
						template(v-slot:after-options)
							q-separator
							q-item
								q-item-section
									q-btn(flat color="primary" label="Добавить статус" icon="mdi-plus-circle" @click="add(index)" size='sm' v-close-popup) 
			tr(v-else)
				td.red(colspan='2') Не задано

StatusDialogAdd(v-model="dialog" @set="setState" type='status')
</template>

<style scoped lang="scss">
.btd {
	color: $primary;
	text-decoration: underline;
	text-align: left;
	cursor: pointer;
}

th {
	white-space: normal;
}

.selected {
	background: var(--bg-selected);
}

.q-table thead tr {
	height: 22px;
}

.q-table td {
	font-size: .9rem;

	&.red {
		color: darkred;
	}
}
</style>
