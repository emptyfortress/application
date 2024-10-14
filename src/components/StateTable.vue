<script setup lang="ts">
import { ref } from 'vue'
import { useForms } from '@/stores/forms'
import StatusDialogAdd from '@/components/StatusDialogAdd.vue'

const myform = useForms()
const state = ref('В работе')

const dialog = ref(false)

const add = (data: any) => {
	myform.addStatus(data.status)
}
</script>

<template lang="pug">
.q-mx-md
	.text-bold Чем завершается задача?
	q-markup-table(bordered flat)
		thead
			tr
				th.text-left Начальное состояние
				th.text-left Вариант исхода
				th.text-left Конечное состояние
		tbody
			tr(v-for="item in myform.bt")
				td Начальное
				td
					span.btd {{ item.name }}
						q-popup-edit(v-model="item.name" title="Исход" buttons auto-save v-slot="scope")
							q-input(v-model="scope.value" dense outlined autofocus @keyup.enter="scope.set")
				td
					span.btd.sel {{ state }}
						q-menu
							q-list
								q-item(clickable v-for="item in myform.status" :key="item" @click='state = item' v-close-popup :class="{ selected: item == state }")
									q-item-section {{ item }}

	q-btn.q-mt-sm(flat color="primary" icon='mdi-plus-circle' label="Добавить состояние" @click="dialog = !dialog" size='sm') 

StatusDialogAdd(v-model="dialog")
</template>

<style scoped lang="scss">
.btd {
	color: $primary;
	text-decoration: underline;
	text-align: left;
	cursor: pointer;

	&.sel::after {
		display: inline-block;
		content: '⌄';
		font-size: 1rem;
		margin-left: .5rem;
		transform: translateY(-2px);
		text-decoration: none;
	}
}

th {
	white-space: normal;
}

.selected {
	background: var(--bg-selected);
}
</style>
