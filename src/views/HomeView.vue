<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CreateDialog from '@/components/CreateDialog.vue'

const router = useRouter()
const columns = [
	{
		name: 'name',
		required: true,
		label: 'Название',
		align: 'left',
		field: 'name',
		sortable: true,
	},
	{
		name: 'version',
		required: true,
		label: 'Версия',
		align: 'left',
		field: 'version',
		sortable: true,
	},
	{
		name: 'descr',
		required: true,
		label: 'Описание',
		align: 'left',
		field: 'descr',
		sortable: true,
	},
	{
		name: 'author',
		required: true,
		label: 'Автор',
		align: 'left',
		field: 'author',
		sortable: true,
	},
	{
		name: 'created',
		required: true,
		label: 'Создано',
		align: 'left',
		field: 'created',
		sortable: true,
	},
]
const rows = ref([
	{
		id: 0,
		name: 'Служебная записка',
		version: '0.1.5',
		descr: 'Здесь описание приложения',
		author: 'Орлов П.С.',
		created: '2023-10-14',
	},
])

const tree = [
	{
		label: '0.1.5',
		children: [
			{
				label: '0.1.4',
			},
			{
				label: '0.1.3',
			},
		],
	},
	{
		label: '0.0.1',
	},
	{
		label: 'alfa',
	},
]

const goto = (evt: Event, row: any, index: number) => {
	router.push(`/split/${row.name}`)
	// router.push(`/app/${row.name}`)
}

const dialog = ref(false)

const action = () => {
	dialog.value = !dialog.value
}
const create = (e: any) => {
	rows.value.push(e)
}
const selected = ref('0.1.5')
</script>

<template lang="pug">
q-page(padding)
	h4 Мои приложения ({{rows.length}})
	q-table.q-mt-sm(flat
		:rows="rows"
		:columns="columns"
		row-key="name"
		@row-click="goto"
		hide-bottom)

		template(v-slot:body-cell-version="props")
			q-td(:props="props")
				q-badge(color="positive" @click.stop="") {{props.value}}
					q-menu
						q-tree(:nodes="tree"
							v-model:selected="selected"
							dense
							node-key="label"
							default-expand-all)

	.q-gutter-x-lg
		q-btn.q-mt-sm(flat icon="mdi-plus-circle" color="primary" label="Создать" @click="action") 

	CreateDialog(v-model="dialog" @create="create")
</template>

<style scoped lang="scss">
:deep(.q-table th) {
	background: $primary;
	color: white;
}
.q-tree {
	margin: 1rem;
}
:deep(.q-tree__node--selected) {
	background: $secondary;
	color: white;
}
:deep(.q-tree__node--selected .q-tree__node-header-content) {
	color: white;
}
</style>
