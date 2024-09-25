<script setup lang="ts">
import { ref } from 'vue'

const pers = defineModel()

const options = [
	{ label: 'Все пользователи', value: 10, color: 'red' },
	{ label: 'Группа', value: 11 },
	{ label: 'Сотрудники подразделения, отдела', value: 12 },
	{ label: 'Сотрудник и все его заместители', value: 13 },
	// { label: 'Поле карточки типа - группа или подразделение', value: '14' },
]
const sotrZam = ref(false)
const otdel = ref('one')
</script>

<template lang="pug">
.grid
	q-option-group(
		:options="options"
		type="radio"
		v-model="pers")
	.desc
		div(v-if='pers == 10')
			.des Все пользователи приложения.
			.sma Роль существует по умолчанию не может быть удалена.
		div(v-if='pers == 11')
			.des Группа из справочника сотрудников
				q-select(dense filled label="Группа")
					template(v-slot:prepend)
						q-icon(name="mdi-account-multiple" color="primary")
		div(v-if='pers == 12')
			q-radio(v-model="otdel" val="one" label='Все сотрудники подразделения или отдела')
			q-select(dense filled label="Отдел")
				template(v-slot:prepend)
					q-icon(name="mdi-office-building" color="primary")
			q-checkbox.q-mt-md(v-model="sotrZam" dense label='Включая заместителей')
			q-separator.q-mt-md
			q-radio(v-model="otdel" val="two" label='Сотрудники из поля в приложении')
			q-select(dense filled label="Поле")
				template(v-slot:prepend)
					q-icon(name="mdi-account" color="primary")
			q-checkbox.q-mt-md(v-model="sotrZam" dense label='Включая заместителей')

		div(v-if='pers == 13')
			.des Сотрудник из справочника и все его замы
			q-select(dense filled label="Сотрудник")
				template(v-slot:prepend)
					q-icon(name="mdi-account" color="primary")
		div(v-if='pers == 14')
			.des Что здесь, непонятно.
</template>

<style scoped lang="scss">
.grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	justify-items: start;
	align-items: start;
	column-gap: 2rem;
}
.desc {
	border-left: 1px solid #ccc;
	height: 100%;
	padding-left: 1rem;
}
.des {
	font-weight: 600;
	margin-bottom: 1rem;
}
.sma {
	font-size: 0.8rem;
}
</style>
