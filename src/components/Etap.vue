<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AddFieldDialog from '@/components/AddFieldDialog.vue'
import chooseFormDialog from '@/components/chooseFormDialog.vue'
import draggable from 'vuedraggable'

const router = useRouter()
const route = useRoute()

const dialog = ref(false)
const dialog1 = ref(false)
const name = ref(route.params.etap)

const list1 = ref([
	{ type: 'Сотрудник', label: 'Автор', name: 'Автор', id: 1 },
	{ type: 'Дата', label: 'Дата создания', name: 'Дата создания', id: 2 },
	{ type: 'Дата', label: 'Дата изменения', name: 'Дата изменения', id: 3 },
	{ type: 'Строка', label: 'Название', name: 'Название', id: 4 },
	{ type: 'Текст', label: 'Содержание', name: 'Содержание', id: 5 },
	{ type: '???', label: 'Результат исполнения', name: 'Результат исполнения', id: 6 },
])
const list2 = ref([
	{ type: 'Сотрудник', label: 'Автор', name: 'Автор', id: 1 },
	{ type: 'Дата', label: 'Дата создания', name: 'Дата создания', id: 2 },
])
const addField = (tmp: any) => {
	list1.value.push(tmp)
}
const remove = (e: number) => {
	list2.value.splice(e, 1)
}
</script>

<template lang="pug">
.bl
	.zag
		div
			h5 Форма "{{ name }}"
				q-popup-edit(v-model="name" title="Название формы" auto-save v-slot="scope")
					q-input(v-model="scope.value" dense autofocus counter @keyup.enter="scope.set")
		q-btn(flat color="primary" icon="mdi-form-select" label="Выбрать форму из доступных" @click="dialog1 = !dialog1") 

	.grid
		.list
			.drop(v-if="list2.length == 0")
				span Перетащите сюда нужное поле
			draggable(
				class="list-group"
				:list="list2"
				group="people"
				ghost-class="ghost"
				itemKey="id")

				template(#item="{ element, index }")
					.node1
						q-input(dense filled v-model="element.name")
						q-btn(dense flat round icon="mdi-close" @click="remove(index)" size="sm") 

		.side
			.zg Список доступных полей:

			draggable(
				class="list-group"
				:list="list1"
				ghost-class="ghost"
				:group="{ name: 'people', pull: 'clone', put: false }"
				itemKey="id")

				template(#header)
					.node
						.text-bold Название
						.text-bold Метка
						.text-bold Тип поля

				template(#item="{ element, index }")
					.node
						.name {{ element.name }}
						.name {{ element.label }}
						.type {{ element.type }}

			q-btn.q-mt-md(flat icon="mdi-plus-circle-outline" color="primary" @click="dialog = !dialog" label="Добавить поле") 

AddFieldDialog(v-model="dialog" @create="addField")
chooseFormDialog(v-model="dialog1")
</template>

<style scoped lang="scss">
.list {
	min-height: 100px;
	width: 100%;
}
.zag {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.zg {
	// font-weight: 600;
	margin-left: 1rem;
	margin-bottom: 0.5rem;
}
.bl {
	background: #fff;
	height: var(--panel-height);
	padding: 1rem;
	margin-right: 0.5rem;
	position: relative;
}
.grid {
	margin-top: 1rem;
	display: grid;
	grid-template-columns: 1fr 1fr;
	// justify-items: start;
	// align-items: stretch;
	column-gap: 3rem;
	row-gap: 0.5rem;
}
.node {
	padding: 5px 1rem;
	background: #fff;
	cursor: move;
	display: grid;
	grid-template-columns: 1fr 1fr 0.5fr;
	&.ghost {
		opacity: 0.5;
		background: #c8ebfb;
	}
}
.node1 {
	padding: 0.5rem;
	background: #fff;
	display: grid;
	grid-template-columns: 1fr auto;
	align-items: center;
	&.ghost {
		opacity: 0.5;
		background: #c8ebfb;
	}
}
</style>
