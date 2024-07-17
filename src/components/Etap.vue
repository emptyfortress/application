<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import chooseFormDialog from '@/components/chooseFormDialog.vue'
import draggable from 'vuedraggable'
import { useStore } from '@/stores/store'
import { onClickOutside } from '@vueuse/core'
import { GridItem, GridLayout } from 'vue-ts-responsive-grid-layout'

const router = useRouter()
const route = useRoute()

const dialog1 = ref(false)
const name = ref(route.params.etap)

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
// const one = ref(true)
const one = true
const chips = reactive([
	{ label: 'Задача', selected: true },
	{ label: 'Еще задача', selected: true },
])
const layout = reactive([
	{
		x: 0,
		y: 0,
		w: 6,
		h: 6,
		i: 0,
	},
	// {
	// 	x: 6,
	// 	y: 0,
	// 	w: 6,
	// 	h: 6,
	// 	i: 1,
	// },
])
</script>

<template lang="pug">
.bl
	.zag
		q-btn(flat color="primary" icon="mdi-menu" label="Показать поля" @click="store.toggleDrawer") 
		h5 Форма "{{ name }}"
			q-popup-edit(v-model="name" title="Название формы" auto-save v-slot="scope")
				q-input(v-model="scope.value" dense autofocus counter @keyup.enter="scope.set")
		q-btn(flat color="primary" icon="mdi-form-select" label="Выбрать форму" @click="dialog1 = !dialog1") 

	.use
		span Данная форма используется в задачах:
		q-chip(v-model:selected="one") {{ name }}
		q-chip(v-for="el in chips" clickable v-model:selected="el.selected") {{ el.label}}

	.done
		div
			div Рассмотрите предоженную заявку и примите решение.
			div
				|Срок:  
				span.text-bold 11.04.2024
			div
				|Исполнитель:  
				span.text-bold Орлов П.С.
		q-card-actions.q-pa-none
			q-btn(flat color="primary" label="Делегировать") 
			q-btn(unelevated color="negative" label="Отказать") 
			q-btn(unelevated color="primary" label="Согласовать") 

	.list
		.drop(v-if="list2.length == 0")
			span Перетащите сюда нужное поле

		GridLayout(ref="grid"
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
			:use-css-transforms="true")
	
			GridItem(v-for="( item ) in layout"
				:x="item.x"
				:y="item.y"
				:w="item.w"
				:h="item.h"
				:i="item.i"
				:show-close-button="false"
				:key="item.i")

				.section
					q-icon.close(name="mdi-close" @click="remove(index)" dense)
					q-icon.resize(name="mdi-resize-bottom-right" @click="" dense size="16px") 
	
					// draggable(
						class="list-group"
						:list="list2"
						group="people"
						ghost-class="ghost"
						itemKey="id")

						template(#item="{ element, index }")
							.node1(ref="target" @click="select(element)" :class="{selected: element.selected}")
								FormKit(:type="element.type" :label="element.label" :placeholder="element.typ" :options="element.options")
								.bt
									q-btn(dense flat round @click="element.visible = !element.visible" size="sm") 
										q-icon(name="mdi-eye" v-if="element.visible")
										q-icon(name="mdi-eye-off" v-else)

									q-btn(dense flat round @click="element.readonly = !element.readonly" size="sm") 
										q-icon(name="mdi-pencil-off" v-if="element.readonly")
										q-icon(name="mdi-pencil" v-else)

									q-btn(dense flat round icon="mdi-close" @click="remove(index)" size="sm") 

		q-btn.fab(round color="primary" icon="mdi-plus" @click="store.addWidget" ) 
chooseFormDialog(v-model="dialog1")

</template>

<style scoped lang="scss">
.cl {
	.q-btn {
		display: block;
	}
}
.list {
	border-top: 1px solid #ccc;
	width: 100%;
	padding: 0.5rem;
	background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAAXNSR0IArs4c6QAAADhJREFUGFctjMERADAIwsL+MxZHoYetL8gFBSCJpAFsRwW9LAVPYUEVPvTUfHX9iDMn2h/fFtnVBb6XHglDcS5IAAAAAElFTkSuQmCC)
		repeat;
}
.zag {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: start;
	h5 {
		text-align: center;
	}
}
.q-chip {
	padding: 0 7px;
}
.bl {
	background: #fff;
	min-height: var(--panel-height);
	padding: 1rem;
	margin-right: 0.25rem;
	position: relative;
}
.sec {
	margin-top: 1rem;
}
.list-group {
	max-width: 300px;
}
.node1 {
	// max-width: 300px;
	padding: 0.5rem;
	background: #fff;
	position: relative;
	margin-bottom: 2px;
	.bt {
		position: absolute;
		top: -26px;
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
.use {
	margin: 1rem;
	text-align: center;
}
.q-chip--selected {
	background: $accent;
	color: white;
}
:deep(.q-chip__icon) {
	color: #fff;
}
.done {
	background: #eee;
	padding: 1rem;
	display: flex;
	justify-content: space-between;
	align-items: start;
	// height: 200px;
	// height: var(--panel-height);
}
.section {
	border: 2px solid blue;
	height: 100%;
	width: 100%;
	z-index: 1001;
	position: relative;
	// overflow: hidden;
	// background: #eee;
}
.close {
	position: absolute;
	right: 3px;
	top: 3px;
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
	// z-index: -1;
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
.fab {
	position: absolute;
	bottom: 1rem;
	right: 1rem;
	z-index: 6003;
	transition: 0.3s ease all;
}
</style>
