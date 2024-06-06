<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CreateDialog from '@/components/CreateDialog.vue'
import { useStore } from '@/stores/store'

const store = useStore()
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
	router.push(`/${row.name}`)
	store.setApp(row)
}

const dialog = ref(false)

const action = () => {
	dialog.value = !dialog.value
}
const create = (e: App) => {
	store.addAppToList(e)
}
const selected = ref('0.1.5')
</script>

<template lang="pug">
q-page(padding)
	.container
		h4 Мои приложения ({{store.appList.length}})
		q-table.q-mt-sm(flat
			:rows="store.appList"
			:columns="columns"
			row-key="id"
			@row-click="goto"
			hide-bottom)

			template(v-slot:body-cell-version="props")
				q-td(:props="props")
					q-badge(v-if="props.value" color="positive" @click.stop="") {{props.value}}
						q-menu
							q-tree(:nodes="tree"
								v-model:selected="selected"
								dense
								node-key="label"
								default-expand-all)
					div(v-else) 0.0.0

		.q-gutter-x-lg
			q-btn.q-mt-sm(flat icon="mdi-plus-circle" color="primary" label="Создать" @click="action") 

	CreateDialog(v-model="dialog" @create="create")
</template>

<style scoped lang="scss">
.container {
	max-width: 1200px;
	margin: 0 auto;
}
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
