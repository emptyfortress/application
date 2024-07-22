<script setup lang="ts">
import { ref, watch } from 'vue'
import draggable from 'vuedraggable'
import { onClickOutside } from '@vueuse/core'
import { useStore } from '@/stores/store'

const list2 = ref<Field[]>([])
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

const target = ref(null)

onClickOutside(target, (event) =>
	list2.value.map((item) => {
		item.selected = false
		store.setField(null)
	})
)

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
const remove = (e: number) => {
	list2.value.splice(e, 1)
}
</script>

<template lang="pug">
.drophere(v-if="list2.length == 0")
	div Переместите секцию, зажав Alt.
	div Перетащите сюда нужное поле из библиотеки справа.

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
}
</style>
