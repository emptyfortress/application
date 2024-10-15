<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'
import AddFieldDialog from '@/components/AddFieldDialog.vue'
import { useLayoutStore } from '@/stores/layout'

const lstore = useLayoutStore()
const dialog = ref(false)

const dragStart = (type: number) => {
	lstore.setDragType(type)
}

const group = ref('cut')
const options = [
	{ label: 'Обрезать', value: 'cut' },
	{ label: 'Переносить', value: 'move' },
]
const addField = (tmp: Field) => {
	lstore.addField(tmp)
}
</script>

<template lang="pug">
.q-ma-md
	.info Настройте порядок и видимость колонок.
	q-separator.q-my-md
	.no(v-if='lstore.fields.length == 0')
		q-icon.q-mr-sm(name="mdi-alert" color="negative" size="22px")
		|В приложении не заданы поля, которые могут быть показаны, как колонки.
	draggable(v-else
		class="list-group"
		:list="lstore.fields"
		ghost-class="ghost"
		itemKey="id"
		@dragstart="dragStart(2)"
		)

		template(#item="{ element, index }")
			.nod
				.drag
				q-checkbox(v-model="element.visible" :label='element.name' dense)

	br
	q-btn(flat color="primary" label="Добавить поле (колонку)" icon="mdi-plus" @click="dialog = !dialog") 
	q-separator.q-my-md
	.info Порядок отображения строк
	q-option-group(
		:options="options"
		type="radio"
		v-model="group"
		dense
		)

AddFieldDialog(v-model="dialog" @create="addField")
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
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAAXNSR0IArs4c6QAAADNJREFUGFcVycENwDAMw0BywKiz1h5QQQC+jqrQV9mZimLLv9sv532ZmSaxgrvbnDynhQsMkhcgcIQwPgAAAABJRU5ErkJggg==) repeat;
	}
}

.no {
	color: $negative;
}
</style>
