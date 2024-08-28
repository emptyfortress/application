<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import draggable from 'vuedraggable'
import { useForms } from '@/stores/forms'
import { useStore } from '@/stores/store'

import { onClickOutside } from '@vueuse/core'

const props = defineProps<{
	list: Field[]
}>()

const myform = useForms()
// const list2 = ref<Field[]>(props.list)
// const list2 = ref<Field[]>([])
// const list3 = ref([
// 	{
// 		id: 0,
// 		label: 'Поле 1',
// 		name: 'Поле 1',
// 		type: 'text',
// 		typ: 'Placeholder',
// 		visible: true,
// 		readonly: false,
// 		selected: false,
// 	},
// 	{
// 		id: 1,
// 		type: 'select',
// 		typ: 'Сотрудник',
// 		label: 'Автор',
// 		name: 'Автор',
// 		visible: true,
// 		readonly: true,
// 		options: ['Иванов', 'Петров', 'Орлов'],
// 		selected: false,
// 	},
// 	{
// 		id: 2,
// 		type: 'date',
// 		typ: 'Дата',
// 		label: 'Дата создания',
// 		name: 'Дата создания',
// 		visible: true,
// 		readonly: true,
// 		selected: false,
// 	},
// 	{
// 		id: 3,
// 		label: 'Поле 2',
// 		name: 'Поле 2',
// 		type: 'text',
// 		typ: 'Placeholder',
// 		visible: true,
// 		readonly: false,
// 		selected: false,
// 	},
// ])

const store = useStore()

// watch(
// 	() => store.formSelected,
// 	() => {
// 		if (store.formSelected == true) {
// 			list2.value = [...list3.value]
// 			store.unselectForm()
// 			store.setField(null)
// 		}
// 	}
// )

// watch(
// 	() => store.currentBlock,
// 	() => {
// 		if (store.currentBlock == null) {
// 			list2.value.map((item: Field) => {
// 				item.selected = false
// 			})
// 			store.setField(null)
// 		}
// 	}
// )

const select = (e: Field) => {
	props.list.map((item: Field) => {
		item.selected = false
	})
	e.selected = !e.selected
	store.setField(e)
}
const remove = (e: number) => {
	props.list.splice(e, 1)
}
const type = computed(() => {
	if (myform.currentBO.$type == 'bpmn:StartEvent') {
		return true
	}
	return false
})

const unselect = () => {
	props.list.map((item: Field) => {
		item.selected = false
	})
}
const node = ref()
onClickOutside(node, (event) => unselect())
</script>

<template lang="pug">
.drophere(v-if="props.list.length == 0")
	div Перетащите сюда нужное поле из библиотеки справа.

draggable(
	class="list-group"
	:list="props.list"
	group="people"
	ghost-class="ghost"
	itemKey="id")

	template(#item="{ element, index }")
		.node1(ref='node' @click="select(element)" :class="{selected: element.selected}")
			FormKit(v-if='type' :type="element.type" :label="element.label" :placeholder="element.typ" :options="element.options")
			.row.items-center.q-gutter-x-lg(v-else)
				label {{ element.label }}:
				.val {{ element.typ }}

			.bt
				q-btn(dense flat icon="mdi-close" @click="remove(index)" size="sm") 
</template>

<style scoped lang="scss">
.all {
	height: 100%;
}
.node1 {
	padding: 0.5rem;
	background: #fff;
	position: relative;
	margin-bottom: 2px;
	.bt {
		position: absolute;
		top: 0;
		right: 0;
		background: #ffaa5b;
		display: none;
	}
	&.ghost {
		opacity: 0.5;
		background: #c8ebfb;
	}
	&:hover,
	&.selected {
		outline: 2px solid #ffaa5b;
		.bt {
			display: block;
		}
	}
}
.close {
	position: absolute;
	right: 0;
	top: 0;
	cursor: pointer;
}
.resize {
	position: absolute;
	right: 3px;
	bottom: 3px;
	cursor: pointer;
}
.drophere {
	margin: 1rem;
	text-align: center;
	color: #bbb;
}
.val {
	color: $primary;
	border-bottom: 1px dotted $primary;
	cursor: pointer;
}
</style>
