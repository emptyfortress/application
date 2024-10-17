<script setup lang="ts">
import { ref, computed } from 'vue'
import draggable from 'vuedraggable'
import AddFieldDialog from '@/components/AddFieldDialog.vue'
import { useLayoutStore } from '@/stores/layout'
import { useStorage } from '@vueuse/core'

const app = useStorage('app', localStorage)
const lstore = useLayoutStore()

const dialog = ref(false)

const addField = (tmp: Field) => {
	lstore.addField(tmp)
}
const dragStart = (type: number) => {
	lstore.setDragType(type)
}
const expanded = ref([true, true])

const calcLabel = computed(() => {
	return 'Доступные поля ' + app.value.card
})
const status = ref([
	{ name: 'Состояние', id: 0 },
])
</script>

<template lang="pug">
q-list.q-mt-md
	q-expansion-item(label="Шаблоны" header-class="bold" v-model="expanded[0]")
		.node(:draggable="true" @dragstart="dragStart(2)") Две колонки
		.node(:draggable="true" @dragstart="dragStart(3)") Шапка и две колонки
		.node(:draggable="true" @dragstart="dragStart(1)") Простой блок

	q-expansion-item.q-mt-lg(:label="calcLabel" expand-separator header-class="bold" v-model="expanded[1]")
		draggable(
			class="list-group"
			:list="status"
			ghost-class="ghost"
			:group="{ name: 'people', pull: 'clone', put: false }"
			itemKey="id"
			@dragstart="dragStart(5)"
			)
			template(#item="{ element, index }")
				.node
					.name {{ element.name }}

		draggable(
			class="list-group"
			:list="lstore.fields"
			ghost-class="ghost"
			:group="{ name: 'people', pull: 'clone', put: false }"
			itemKey="id"
			@dragstart="dragStart(5)"
			)

			template(#item="{ element, index }")
				.node
					.name {{ element.name }}

		q-btn.q-ma-md(unelevated icon="mdi-plus-circle-outline" color="primary" @click="dialog = !dialog" label="Добавить поле") 


AddFieldDialog(v-model="dialog" @create="addField")
</template>

<style scoped lang="scss">
.sid {
	padding: 1rem;
}

.zg {
	font-weight: 600;
}

.hh {
	font-size: 0.8rem;
	border-bottom: 1px solid #ccc;
}

.node {
	padding: 5px 1rem;
	background: #fff;
	cursor: pointer;

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

.blo {
	width: 100%;
	// width: 200px;
	height: 100%;
	background: #ccc;
}

:deep(.bold .q-item__label) {
	font-weight: 600;
	color: $primary;
}
</style>
