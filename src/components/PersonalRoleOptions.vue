<script setup lang="ts">
import { ref } from 'vue'

const pers = ref(null)

const options = [
	{ label: 'Инициатор', value: '1', color: 'red' },
	{ label: 'Руководитель инициатора', value: '2' },
	{ label: 'Конкретный сотрудник', value: '3' },
	{ label: 'Руководитель подразделения', value: '4' },
	{ label: 'Старший в группе', value: '5' },
	{ label: 'Поле карточки типа - сотрудник', value: '6' },
	{ label: 'Руководитель персональной роли', value: '7' },
	{ label: 'Актуальный заместитель персональной роли', value: '8' },
]
</script>

<template lang="pug">
.grid
	q-option-group(
		:options="options"
		type="radio"
		v-model="pers")
	.desc
		div(v-if='pers == 1')
			.des Сотрудник, создавший новый экземляр приложения.
			.sma Роль существует по умолчанию не может быть удалена.
		div(v-if='pers == 2')
			.des Руководитель сотрудника, создавшего новый экземляр приложения.
			.sma Роль существует по умолчанию не может быть удалена.
		div(v-if='pers == 3')
			.des Любой сотрудник из справочника сотрудников
			q-select(dense filled label="Сотрудник")
				template(v-slot:prepend)
					q-icon(name="mdi-account" color="primary")
		div(v-if='pers == 4')
			.des Руководитель любого подразделения из справочника
			q-select(dense filled label="Подразделение")
				template(v-slot:prepend)
					q-icon(name="mdi-office-building" color="primary")
		div(v-if='pers == 5')
			.des Старший сотрудник в группе из справочника
			q-select(dense filled label="Группа")
				template(v-slot:prepend)
					q-icon(name="mdi-account-multiple" color="primary")
		div(v-if='pers == 6')
			.des Что здесь, непонятно.
		div(v-if='pers == 7')
			.des Руководитель выбранной роли
			q-select(dense filled label="Роль")
				template(v-slot:prepend)
					q-icon(name="mdi-guy-fawkes-mask" color="primary")
		div(v-if='pers == 8')
			.des Заместитель выбранной роли
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
