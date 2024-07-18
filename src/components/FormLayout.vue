<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import draggable from 'vuedraggable'
import { useStore } from '@/stores/store'
import { onClickOutside, useKeyModifier } from '@vueuse/core'
import { GridItem, GridLayout } from 'vue-ts-responsive-grid-layout'

const list2 = ref([
	{
		id: 1,
		type: 'select',
		typ: 'Сотрудник',
		label: 'Автор',
		name: 'Автор',
		visible: true,
		readonly: true,
		selected: false,
		options: ['Иванов', 'Петров', 'Орлов'],
	},
	{
		id: 2,
		type: 'date',
		typ: 'Дата',
		label: 'Дата создания',
		name: 'Дата создания',
		visible: true,
		readonly: true,
		selected: false,
	},
])
const list3 = ref([
	{
		id: 0,
		label: 'Поле 1',
		name: 'Поле 1',
		type: 'text',
		typ: 'Placeholder',
		visible: true,
		readonly: false,
		selected: false,
	},
	{
		id: 1,
		type: 'select',
		typ: 'Сотрудник',
		label: 'Автор',
		name: 'Автор',
		visible: true,
		readonly: true,
		options: ['Иванов', 'Петров', 'Орлов'],
		selected: false,
	},
	{
		id: 2,
		type: 'date',
		typ: 'Дата',
		label: 'Дата создания',
		name: 'Дата создания',
		visible: true,
		readonly: true,
		selected: false,
	},
	{
		id: 3,
		label: 'Поле 2',
		name: 'Поле 2',
		type: 'text',
		typ: 'Placeholder',
		visible: true,
		readonly: false,
		selected: false,
	},
])

const remove = (e: number) => {
	list2.value.splice(e, 1)
}

const remove1 = (e: number) => {
	console.log(e)
	let temp = [...document.getElementsByClassName('vue-grid-item')]
	temp.forEach((el) => el.classList.add('move'))
	layout.splice(e, 1)
}

const store = useStore()
watch(
	() => store.formSelected,
	() => {
		if (store.formSelected == true) {
			list2.value = [...list3.value]
			store.unselectForm()
			store.setField(null)
		}
	}
)
const select = (e: Field) => {
	list2.value.map((item: Field) => {
		item.selected = false
	})
	e.selected = !e.selected
	store.setField(e)
}
const target = ref(null)

onClickOutside(target, (event) =>
	list2.value.map((item) => {
		item.selected = false
		store.setField(null)
	})
)
const layout = reactive([
	{
		x: 0,
		y: 0,
		w: 6,
		h: 6,
		i: 0,
	},
	{
		x: 6,
		y: 0,
		w: 6,
		h: 6,
		i: 1,
	},
])
const isDraggable = useKeyModifier('Alt', { initial: false })

const over = ref(false)

const onDragOver = () => {
	over.value = true
}
const onDrop = () => {
	layout.push({
		x: 0,
		y: 6,
		w: 5,
		h: 6,
		i: 4,
	})
}
</script>

<template lang="pug">
.list(
	@dragover.prevent
	@dragenter.prevent
	@dragenter="onDragOver"
	@drop="onDrop"
	:class="{over : over}"
	)

	GridLayout(
		:layout.sync="layout"
		:col-num="12"
		:row-height="30"
		:is-draggable="true"
		:is-resizable="true"
		:is-bounded="true"
		:is-mirrored="false"
		:vertical-compact="true"
		:margin="[5, 5]"
		:show-close-button="false"
		:use-css-transforms="false"
		)

		GridItem(v-for="( item ) in layout"
			:x="item.x"
			:y="item.y"
			:w="item.w"
			:h="item.h"
			:i="item.i"
			:show-close-button="false"
			:key="item.i")

			.sect
				q-icon.close(name="mdi-close-box" @click="remove1(item.i)" dense)
				q-icon.resize(name="mdi-resize-bottom-right" @click="" dense size="16px") 

				.drop(v-if="list2.length == 0")
					span Перетащите сюда нужное поле из библиотеки справа.

				draggable(
					class="list-group"
					:list="list2"
					group="people"
					ghost-class="ghost"
					itemKey="id")

					template(#item="{ element, index }")
						.node1(ref="target" @click="select(element)" :class="{selected: element.selected}")
							FormKit(:type="element.type" :label="element.label" :placeholder="element.typ" :options="element.options")
							.bt
								q-btn(dense flat @click="element.visible = !element.visible" size="sm") 
									q-icon(name="mdi-eye" v-if="element.visible")
									q-icon(name="mdi-eye-off" v-else)

								q-btn(dense flat @click="element.readonly = !element.readonly" size="sm") 
									q-icon(name="mdi-pencil-off" v-if="element.readonly")
									q-icon(name="mdi-pencil" v-else)

								q-btn(dense flat icon="mdi-close" @click="remove(index)" size="sm") 
</template>

<style scoped lang="scss">
.list {
	border-top: 1px solid #ccc;
	width: 100%;
	padding: 0.5rem;
	background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAAXNSR0IArs4c6QAAADhJREFUGFctjMERADAIwsL+MxZHoYetL8gFBSCJpAFsRwW9LAVPYUEVPvTUfHX9iDMn2h/fFtnVBb6XHglDcS5IAAAAAElFTkSuQmCC)
		repeat;
	&.over {
		background: #ccc;
	}
}
.sec {
	margin-top: 1rem;
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
.op {
	opacity: 0.2;
}
.sect {
	border: 1px solid blue;
	height: 100%;
	width: 100%;
	z-index: 1001;
	position: relative;
	overflow: hidden;
}
.close {
	position: absolute;
	right: 0;
	top: 0;
	cursor: pointer;
}
:deep(.vue-grid-item) {
	touch-action: none;
	position: relative;
}
.resize {
	position: absolute;
	right: 3px;
	bottom: 3px;
	cursor: pointer;
}
:deep(.vue-grid-item.vue-grid-placeholder) {
	background: green !important;
	opacity: 0.2;
}
:deep(.vue-draggable-dragging) {
	z-index: 1000;
	box-shadow: 3px 3px 17px rgba(0, 0, 0, 0.4);
}
.move {
	transition: 0.2s ease all;
}
:deep(.vue-grid-item) {
	touch-action: none;
	position: relative;
}
// .fab {
// 	position: absolute;
// 	bottom: 1rem;
// 	right: 1rem;
// 	z-index: 6003;
// 	transition: 0.3s ease all;
// }
// .fab1 {
// 	position: absolute;
// 	bottom: 1rem;
// 	left: 1rem;
// 	z-index: 6003;
// 	transition: 0.3s ease all;
// }
.vue-grid-layout {
	min-height: calc(100vh - 360px);
}
.drop {
	margin: 1rem;
	text-align: center;
}
</style>
