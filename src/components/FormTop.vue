<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import chooseDialog from '@/components/chooseDialog.vue'

const route = useRoute()
const name = ref(route.params.etap)

const chips = reactive([
	{ label: 'Задача', selected: true },
	{ label: 'Еще задача', selected: true },
])

const dialog = ref(false)
</script>

<template lang="pug">
.zag
	h5 Форма "{{ name }}"
		q-popup-edit(v-model="name" title="Название формы" auto-save v-slot="scope")
			q-input(v-model="scope.value" dense autofocus counter @keyup.enter="scope.set")
	q-btn(flat color="primary" icon="mdi-content-duplicate" label="Выбрать форму" @click="dialog = !dialog") 

.use
	span Данная форма используется в задачах:
	q-chip(selected) {{ name }}
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

chooseDialog(v-model="dialog")
</template>

<style scoped lang="scss">
.zag {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: start;
	h5 {
		text-align: center;
		border-bottom: 1px dotted $primary;
	}
}
.q-chip {
	padding: 0 7px;
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
</style>
