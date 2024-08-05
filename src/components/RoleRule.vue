<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'
import { useStore } from '@/stores/store'

const store = useStore()

const list = ref([
	{ id: 0, etap: 'Создал заявку', form: 'Форма 1', selected: false },
	{ id: 1, etap: 'Согласовать заявку', form: 'Форма 2', selected: false },
	{ id: 2, etap: 'Исправить заявку', form: 'Форма 3', selected: false },
	{ id: 3, etap: 'Рассмотреть заявку', form: 'Форма 4', selected: false },
	{ id: 4, etap: 'Обработать отказ', form: 'Форма 5', selected: false },
	{ id: 5, etap: 'Исполнить заявку', form: 'Форма 6', selected: false },
	{ id: 6, etap: 'Принять результаты', form: 'Форма 7', selected: false },
	{ id: 7, etap: 'Заявка отменена', form: 'Форма 8', selected: false },
	{ id: 8, etap: 'Заявка выполнена', form: 'Форма 9', selected: false },
])
const test = ref([false, false, false, false, false, false, false, false, false])
const test1 = ref([false, false, false, false, false, false, false, false, false])
</script>

<template lang="pug">
.q-ma-md
	div Условия показа формы для <b>{{ store.currentRole.label }}</b>
	q-markup-table(flat)
		thead
			tr
				th.text-left Этап
				th.text-left Форма
		draggable(v-model="list" tag="tbody" item-key="name")
			template(#item="{ element, index }")
				tr
					td(scope="row")
						q-checkbox(v-model="test[index]" :label="element.etap" dense)
					td
						q-checkbox(v-model="test1[index]" :label="element.form" dense)
</template>

<style scoped lang="scss"></style>
