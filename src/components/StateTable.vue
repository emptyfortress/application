<script setup lang="ts">
import { ref } from 'vue'
import { useForms } from '@/stores/forms'
import StatusDialogAdd from '@/components/StatusDialogAdd.vue'

const myform = useForms()
const finish = ref(['Подготовка'])

const dialog = ref(false)

const start = ref<number>()

const setState = ((e: string) => {
	finish.value[start.value!] = e
})

const add = ((n: number) => {
	start.value = n
	dialog.value = !dialog.value
})
</script>

<template lang="pug">
.q-mx-md
	q-markup-table(bordered flat)
		thead
			tr
				th.text-left Вариант завершения
				th.text-left Статус
		tbody
			tr(v-for="(item, index) in myform.bt")
				td
					span.btd {{ item.name }}
						q-popup-edit(v-model="item.name" auto-save v-slot="scope")
							q-input(v-model="scope.value" dense filled autofocus @keyup.enter="scope.set")
				td
					q-select(v-model="finish[index]" dense filled :options="myform.status")
						template(v-slot:after-options)
							q-separator
							q-item
								q-item-section
									q-btn(flat color="primary" label="Добавить статус" icon="mdi-plus-circle" @click="add(index)" size='sm' v-close-popup) 

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
}
</style>
