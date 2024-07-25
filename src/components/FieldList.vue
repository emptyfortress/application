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
const group = ref([])
const options = [
	{ label: 'Обрезать', value: 'cut' },
	{ label: 'Переносить', value: 'move' },
]
</script>

<template lang="pug">
.q-ma-md
	.info Настройте порядок и видимость колонок.
	q-separator.q-my-md
	draggable(
		class="list-group"
		:list="list1"
		ghost-class="ghost"
		itemKey="id"
		@dragstart="dragStart(2)"
		)

		template(#item="{ element, index }")
			.nod
				.drag
				q-checkbox(v-model="element.visible" :label='element.name' dense)
	q-separator.q-my-md
	.info Порядок отображения строк
	q-option-group(
		:options="options"
		type="radio"
		v-model="group"
		dense
		)

</template>

<style scoped lang="scss">
.nod {
	padding: 5px 1rem 5px 20px;
	background: #fff;
	cursor: pointer;
	position: relative;
	margin-bottom: 1px;
	&:hover {
		background: #efefef;
		// box-shadow:
		// 	1px 1px 5px rgba($color: #000, $alpha: 0.3),
		// 	-1px -1px 5px rgba($color: #000, $alpha: 0.2);
		z-index: 5;
	}
	&.ghost {
		opacity: 0.7;
		// background: #ceeccd;
		background: #d2f1f9;
	}
	.drag {
		position: absolute;
		top: 0;
		left: 0;
		width: 10px;
		height: 100%;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAAXNSR0IArs4c6QAAADNJREFUGFcVycENwDAMw0BywKiz1h5QQQC+jqrQV9mZimLLv9sv532ZmSaxgrvbnDynhQsMkhcgcIQwPgAAAABJRU5ErkJggg==)
			repeat;
	}
}
</style>
