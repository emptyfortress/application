<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useLayoutStore } from '@/stores/layout'
import FieldList from '@/components/FieldList.vue'

const lstore = useLayoutStore()

const dragStart = (type: number) => {
	lstore.setDragType(type)
}
</script>

<template lang="pug">
q-list.q-mt-md
	q-expansion-item(label="Шаблоны" expand-separator header-class="bold")
		.node(:draggable="true" @dragstart="dragStart(1)") Две колонки
		.node(:draggable="true" @dragstart="dragStart(1)") Шапка и две колонки
		.node(:draggable="true" @dragstart="dragStart(1)") Одна колонка на всю ширину


	q-expansion-item(label="Блоки" expand-separator header-class="bold")
		.node(:draggable="true" @dragstart="dragStart(1)") Простая секция
		.node(:draggable="true" @dragstart="dragStart(1)") Секция на всю ширину
		.node(:draggable="true" @dragstart="dragStart(1)") Секция в 1/2 ширины
		.node(:draggable="true" @dragstart="dragStart(1)") Секция в 1/3 ширины


	q-expansion-item(label="Доступные поля" expand-separator header-class="bold")
		FieldList


// AddFieldDialog(v-model="dialog" @create="addField")
</template>

<style scoped lang="scss">
.node {
	padding: 5px 1rem;
	background: #fff;
	cursor: pointer;

	// display: grid;
	// grid-template-columns: 1fr 1fr 0.5fr;
	&:hover {
		background: #eee;
	}

	&.ghost {
		opacity: 0.7;
		background: #ceeccd;
	}
}

:deep(.bold .q-item__label) {
	font-weight: 600;
	color: $primary;
}
</style>
