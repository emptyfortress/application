<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoles } from '@/stores/roles'
import { useForms } from '@/stores/forms'

const myrole = useRoles()
const myform = useForms()

const calcFormName = computed(() => {
	switch (myform.currentBO.name) {
		case 'Создал Заявку':
			return 'Создание'
		case 'Принять результаты':
			return 'Архив'
		default:
			return 'Просмотр'
	}
})
const zayList = ['Создание', 'Просмотр', 'Архив']
</script>

<template lang="pug">
.q-mx-md
	.text-bold Что видит пользователь?
	q-markup-table(bordered flat)
		thead
			tr
				th.text-left Роль
				th.text-left Форма

		tbody
			tr.cursor-pointer
				td {{ myrole.currentRole }}
				td.btd {{ calcFormName }}

			tr.cursor-pointer
				td Все остальные
				td Нет доступа
</template>

<style scoped lang="scss">
.btd {
	color: $primary;
	// text-decoration: underline;
}
</style>
