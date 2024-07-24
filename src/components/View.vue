<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'

const list = ref<ColNode[]>([
	{
		id: 0,
		name: 'fuck',
	},
])

const remove = (el: any) => {
	list.value.splice(el, 1)
}
</script>

<template lang="pug">
.bl
	.zagg Настройка представления
	draggable(:list='list'
		item-key="id"
		tag="ul"
		class="list-group"
		ghost-class="ghost"
		group="people"
		)

		template(#item="{ element, index }")
			li.list-group-item {{ element.name }}
				q-btn.close(flat round icon="mdi-close" @click="remove(index)" size="xs" dense) 
</template>

<style scoped lang="scss">
.zagg {
	font-size: 1.4rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
ul:empty:after {
	display: block;
	content: 'Пусто. Настройте колонки, перетащив их из списка справа.';
	width: 100%;
	text-align: center;
	color: rgba(0, 0, 0, 0.5);
	height: 75px;
	line-height: 75px;
	border-radius: 4px;
	font-size: 0.9rem;
	background: #eeecec;
}
.list-group {
	// box-sizing: border-box;
	display: grid;
	grid-template-columns: repeat(v-bind(col), 1fr);
	border: 1px solid #e0e0e0;
	// border-bottom: none;
	// background: rgba(0, 0, 0, 0.07);
	background: white;
	padding: 1px;
	gap: 2px;
}
.list-group-item {
	// font-size: v-bind(headsize);
	// background: v-bind('view.head.bgColor');
	cursor: move;
	// color: v-bind('view.head.fontColor');
	padding: 0.7rem 1rem;
	line-height: 1.2;
	position: relative;
	// text-align: v-bind('view.head.align');
	// font-weight: v-bind('view.head.weight');
	// font-style: v-bind('view.head.style');
	border: 1px solid #e0e0e0;
	min-width: 127px;
	.close {
		position: absolute;
		top: 1px;
		right: 1px;
		visibility: hidden;
	}
	&:hover .close {
		visibility: visible;
	}
}
ul,
li {
	margin: 0;
	padding: 0;
	list-style: none;
}
.ghost {
	padding: 0.5rem 1rem;
	// height: 75px;
	opacity: 0.5;
	background: #ccc;
}
</style>
