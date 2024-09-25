<script setup lang="ts">
import { ref } from 'vue'

// const pers = ref(null)
const pers = defineModel()

const options = [
	{ label: 'Инициатор', value: 'Инициатор', color: 'red' },
	{ label: 'Руководитель инициатора', value: 'Руководитель инициатора' },
	{ label: 'Конкретный сотрудник', value: 'Конкретный сотрудник' },
	{ label: 'Руководитель подразделения', value: 'Руководитель подразделения' },
	{ label: 'Старший в группе', value: 'Старший в группе' },
	// { label: 'Поле карточки типа - сотрудник', value: '6' },
	{ label: 'Руководитель персональной роли', value: 'Руководитель персональной роли' },
	{
		label: 'Актуальный заместитель персональной роли',
		value: 'Актуальный заместитель персональной роли',
	},
]
const sotrZam = ref(false)
const sotr = ref('one')
</script>

<template lang="pug">
.grid
	q-option-group(
		:options="options"
		type="radio"
		v-model="pers")

	.desc
		div(v-if='pers == "Инициатор"')
			.des Сотрудник, создавший новый экземляр приложения.
			.sma Роль существует по умолчанию не может быть удалена.
		div(v-if='pers == "Руководитель инициатора"')
			.des Руководитель сотрудника, создавшего новый экземляр приложения.
			.sma Роль существует по умолчанию не может быть удалена.

		div(v-if='pers == "Конкретный сотрудник"')
			q-radio(v-model="sotr" val="one" label='Любой сотрудник из справочника сотрудников')
			q-select(dense filled label="Сотрудник")
				template(v-slot:prepend)
					q-icon(name="mdi-account" color="primary")
			q-checkbox.q-mt-md(v-model="sotrZam" dense label='Включая заместителей')
			q-separator.q-mt-md
			q-radio(v-model="sotr" val="two" label='Сотрудник из поля в приложении')
			q-select(dense filled label="Поле")
				template(v-slot:prepend)
					q-icon(name="mdi-account" color="primary")
			q-checkbox.q-mt-md(v-model="sotrZam" dense label='Включая заместителей')

		div(v-if='pers == "Руководитель подразделения"')
			.des Руководитель любого подразделения из справочника
			q-select(dense filled label="Подразделение")
				template(v-slot:prepend)
					q-icon(name="mdi-office-building" color="primary")
			q-checkbox.q-mt-md(v-model="sotrZam" dense label='Включая заместителей')

		div(v-if='pers == "Старший в группе"')
			.des Старший сотрудник в группе из справочника
			q-select(dense filled label="Группа")
				template(v-slot:prepend)
					q-icon(name="mdi-account-multiple" color="primary")
			q-checkbox.q-mt-md(v-model="sotrZam" dense label='Включая заместителей')

		div(v-if='pers == "Руководитель персональной роли"')
			.des Руководитель выбранной роли
			q-select(dense filled label="Роль")
				template(v-slot:prepend)
					q-icon(name="mdi-guy-fawkes-mask" color="primary")
			q-checkbox.q-mt-md(v-model="sotrZam" dense label='Включая заместителей')
		div(v-if='pers == "Актуальный заместитель персональной роли"') .des Заместитель выбранной роли
			q-select(dense filled label="Роль")
				template(v-slot:prepend)
					q-icon(name="mdi-guy-fawkes-mask" color="primary")
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
