<script setup lang="ts">
import { useStore } from '@/stores/store'
const store = useStore()

const forms = [
	{ id: 0, label: 'Создал заявку' },
	{ id: 1, label: 'Согласовать заявку' },
	{ id: 2, label: 'Исправить заявку' },
	{ id: 3, label: 'Рассмотреть заявку' },
	{ id: 4, label: 'Обработать отказ' },
	{ id: 5, label: 'Исполнить заявку' },
	{ id: 6, label: 'Принять результаты' },
	{ id: 7, label: 'Заявка отменена' },
	{ id: 8, label: 'Заявка выполнена' },
]
</script>

<template lang="pug">
.bl
	q-list(separator)
		q-item(v-for="form in forms" :key="form.id" @click="")
			q-item-section(avatar)
				q-icon(name="mdi-list-box-outline")
			q-item-section форма "{{ form.label }}"
			q-item-section
				.row.items-center.q-gutter-x-sm
					q-icon(name="mdi-shuffle-variant" size="sm")
					span Этап "{{ form.label }}"
			q-item-section(side)
				q-btn(flat round dense icon="mdi-trash-can-outline" @click="" size="sm") 

	br
	q-btn(unelevated color="primary" label="Создать форму" @click="") 

</template>

<style scoped lang="scss">
.bl {
	background: #fff;
	height: var(--panel-height);
	padding: 1rem;
	margin-right: 0.25rem;
}
// .q-btn {
// 	display: inline-flex;
// }
</style>
