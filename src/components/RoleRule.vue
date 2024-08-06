<script setup lang="ts">
import { ref, computed } from 'vue'
import draggable from 'vuedraggable'
import { useStore } from '@/stores/store'
import ConditionDialog from '@/components/ConditionDialog.vue'

const store = useStore()

const list = ref([
	{ id: 0, etap: 'Создал заявку', selected: true },
	{ id: 1, etap: 'Согласовать заявку', selected: true },
	{ id: 2, etap: 'Исправить заявку', selected: false },
	{ id: 3, etap: 'Рассмотреть заявку', selected: false },
	{ id: 4, etap: 'Обработать отказ', selected: false },
	{ id: 5, etap: 'Исполнить заявку', selected: false },
	{ id: 6, etap: 'Принять результаты', selected: false },
	{ id: 7, etap: 'Заявка отменена', selected: false },
	{ id: 8, etap: 'Заявка выполнена', selected: false },
])

const activeList = computed(() => {
	return list.value.filter((item: any) => !item.selected)
})

const dialog = ref()
const toggle = () => {
	dialog.value = !dialog.value
}
const filt = (e: any) => {
	list.value = [...e]
}
</script>

<template lang="pug">
.q-ma-md
	div Условия показа формы для {{ store.currentRole.label }}
	q-markup-table(flat)
		thead
			tr
				th.text-left Этап
				th.text-left Форма

		draggable(v-model="store.currentRole.conditions" tag="tbody" item-key="name")
			template(#item="{ element, index }")
				tr
					td
						div(v-for="etap in element.etaps") {{ etap }}
					td {{ element.form }}

	br
	q-btn(flat color="primary" icon='mdi-plus' label="Добавить условие" @click="toggle" size='sm') 

	ConditionDialog(v-model="dialog" :etaps='activeList' @choose='filt')
</template>

<style scoped lang="scss"></style>
