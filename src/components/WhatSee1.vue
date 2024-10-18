<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoles } from '@/stores/roles'
import { useForms } from '@/stores/forms'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

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

const goto2 = (e: string) => {
	// myform.toggleZay()
	// myform.setZayForm(e)
	router.push(`/${route.params.id}/editor/process/${e}`)
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

		tbody
			tr.cursor-pointer
				td {{ myrole.currentRole }}
				td
					.btd(@click='goto2(calcFormName)') {{ calcFormName }}

			tr.cursor-pointer
				td Все остальные
				td Нет доступа
</template>

<style scoped lang="scss">
.btd {
	color: $primary;
	text-decoration: underline;
}
</style>
