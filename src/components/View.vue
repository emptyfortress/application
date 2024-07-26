<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLayoutStore } from '@/stores/layout'
import chooseDialog from '@/components/chooseDialog.vue'

const props = defineProps({
	req: {
		type: String,
		required: true,
	},
})

const lstore = useLayoutStore()

const col = computed(() => {
	return lstore.fieldsVisible.length
})

const dialog = ref(false)
</script>

<template lang="pug">
.bl
	.zag
		h5 Настройка представления "{{ props.req }}"
			q-popup-edit(v-model="props.req" title="Название представления" auto-save v-slot="scope")
				q-input(v-model="scope.value" dense autofocus counter @keyup.enter="scope.set")

		q-btn(flat color="primary" icon="mdi-content-duplicate" label="Выбрать представление" @click="dialog = !dialog") 

	br
	ul.list-group
		li(v-for="item in lstore.fieldsVisible" :key='item.id')
			.list-group-item() {{ item.name }}
			.data -- data --
			.data -- data --
			.data -- data --
			.data -- data --

chooseDialog(v-model="dialog" kind='view')
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
.zagg {
	font-size: 1.4rem;
}
.edit {
	border-bottom: 1px dotted $primary;
}
ul:empty:after {
	display: block;
	content: 'Пусто. Настройте колонки, включив их видимость в панели свойств.';
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
.data {
	padding: 0.7rem 1rem;
}
.list-group-item {
	padding: 0.7rem 1rem;
	line-height: 1.2;
	position: relative;
	border: 1px solid #e0e0e0;
	min-width: 127px;
}
ul,
li {
	margin: 0;
	padding: 0;
	list-style: none;
}
</style>
