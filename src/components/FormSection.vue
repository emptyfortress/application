<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import draggable from 'vuedraggable'
import { useForms } from '@/stores/forms'

import { onClickOutside } from '@vueuse/core'

const props = defineProps<{
	list: Field[]
}>()

const myform = useForms()

const select = (e: Field) => {
	props.list.map((item: Field) => {
		item.selected = false
	})
	e.selected = !e.selected
}
const remove = (e: number) => {
	props.list.splice(e, 1)
}
const type = computed(() => {
	if (!!myform.currentBO && myform.currentBO.$type == 'bpmn:StartEvent') {
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
.val {
	color: $primary;
	border-bottom: 1px dotted $primary;
	cursor: pointer;
}
.list-group:empty {
	padding: 1rem;
	padding-bottom: 100px;
	text-align: center;
	&::before {
		content: 'Перетащите сюда нужное поле из библиотеки справа.';
		color: #bbb;
		font-size: 0.85rem;
		font-style: italic;
	}
}
</style>
