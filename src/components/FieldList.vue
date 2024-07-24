<script setup lang="ts">
import { ref, reactive } from 'vue'
import draggable from 'vuedraggable'
import AddFieldDialog from '@/components/AddFieldDialog.vue'
import { useLayoutStore } from '@/stores/layout'

const lstore = useLayoutStore()
const dialog = ref(false)

const list1 = ref([
	{
		id: 4,
		type: 'select',
		label: 'Автор',
		name: 'Автор',
		typ: 'Сотрудник',
		readonly: true,
		visible: true,
		options: ['Иванов', 'Петров', 'Орлов'],
		selected: false,
	},
	{
		id: 5,
		type: 'date',
		label: 'Дата создания',
		name: 'Дата создания',
		typ: 'Дата',
		visible: true,
		readonly: true,
		selected: false,
	},
	{
		id: 6,
		type: 'date',
		label: 'Дата изменения',
		name: 'Дата изменения',
		typ: 'Дата',
		visible: true,
		readonly: false,
		selected: false,
	},
	{
		id: 7,
		type: 'text',
		label: 'Название',
		name: 'Название',
		typ: 'Строка',
		visible: true,
		readonly: false,
		selected: false,
	},
	{
		id: 8,
		type: 'textarea',
		label: 'Содержание',
		name: 'Содержание',
		typ: 'Текст',
		visible: true,
		readonly: false,
		selected: false,
	},
])

const dragStart = (type: number) => {
	lstore.setDragType(type)
}

const addField = (tmp: any) => {
	list1.value.push(tmp)
}
</script>

<template lang="pug">
div
	draggable(
		class="list-group"
		:list="list1"
		ghost-class="ghost"
		:group="{ name: 'people', pull: 'clone', put: false }"
		itemKey="id"
		@dragstart="dragStart(2)"
		)

		template(#item="{ element, index }")
			.node
				.name {{ element.name }}

	q-btn.q-mt-md(flat icon="mdi-plus-circle-outline" color="primary" @click="dialog = !dialog" label="Добавить поле") 
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
.close {
	position: absolute;
	top: 0.3rem;
	right: 0.3rem;
}
</style>
