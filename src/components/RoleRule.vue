<script setup lang="ts">
import { ref, computed } from 'vue'
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

const remove = (e: number) => {
	store.removeCondition(e)
}
</script>

<template lang="pug">
.q-ma-md
	.hd Условия показа форм для {{ store.currentRole.label }}
	q-markup-table(flat)
		thead
			tr
				th.text-left Этап
				th.text-left Форма
				th

		tbody
			tr(v-for="(element, index) in store.currentRole.conditions" :key='element.id' :class='{dis: element.dis}')
				td
					div(v-for="etap in element.etaps") {{ etap }}
				td {{ element.form }}
				td
					q-btn(v-if='!element.dis' flat round dense icon="mdi-trash-can-outline" @click="remove(index)" size='sm') 

	br
	q-btn(flat color="primary" icon='mdi-plus' label="Добавить условие" @click="toggle" size='sm') 

	ConditionDialog(v-model="dialog" :etaps='activeList' @choose='filt')
</template>

<style scoped lang="scss">
.hd {
	font-size: 1.1rem;
	font-weight: 600;
}
.dis {
	background: #ffefcc;
}
</style>
