<script setup lang="ts">
import { ref } from 'vue'
// import { useForms } from '@/stores/forms'
import PublishDialog from '@/components/PublishDialog.vue'
import type { QTableProps } from 'quasar';

const versions = defineModel<any>('versions')

const ind = ref(3)

const create = (e: string) => {
	let tmp = {
		id: ind.value,
		label: `${ind.value}.0`,
		value: `${ind.value}.0`,
		created: new Date().toLocaleDateString('ru-RU') + ' 00:00',
		published: null,
		author: 'Орлов П.С.',
		current: false,
		comment: e,
	}
	versions.value?.unshift(tmp)
	ind.value += 1
	dialog2.value = false
}

const selected = ref([])

const dialog2 = ref(false)

const tmpVer = ref<Version>({
	id: 0,
	label: '',
	value: '',
	created: new Date().toLocaleDateString('ru-RU') + ' 00:00',
	published: null,
	author: 'Орлов П.С.',
	current: false,
	comment: '',
})

const showPublish = (v: Version) => {
	newVersion.value = false
	tmpVer.value = v
	dialog2.value = true
}

const publish = (e: string) => {
	dialog2.value = false
	tmpVer.value!.published = new Date().toLocaleDateString('ru-RU')
	tmpVer.value!.comment = e
}
const destroy = (e: Version) => {
	versions.value = versions.value?.filter((v: Version) => v.id != e.id)
}

const newVersion = ref(false)
const create0 = (() => {
	newVersion.value = true
	dialog2.value = true
})
const columns: QTableProps['columns'] = [
	// {
	// 	name: 'icon',
	// 	required: true,
	// 	label: '',
	// 	align: 'left',
	// 	field: 'icon',
	// 	format: (val: string) => val,
	// 	sortable: false
	// },
	{
		name: 'version',
		required: true,
		label: 'Версия',
		align: 'center',
		field: 'value',
		format: (val: string) => val,
		sortable: true
	},
	{
		name: 'created',
		required: true,
		label: 'Дата создания',
		align: 'left',
		field: 'created',
		format: (val: string) => val,
		sortable: true
	},
	{
		name: 'published',
		required: true,
		label: 'Дата публикации',
		align: 'left',
		field: 'published',
		format: (val: string) => val,
		sortable: true
	},
	{
		name: 'author',
		required: true,
		label: 'Автор',
		align: 'left',
		field: 'author',
		format: (val: string) => val,
		sortable: true
	},
	{
		name: 'comment',
		required: true,
		label: 'Комментарий',
		align: 'left',
		field: 'comment',
		format: (val: string) => val,
		sortable: true
	},
	{
		name: 'action',
		required: true,
		label: '',
		align: 'left',
		field: 'action',
		format: (val: string) => val,
		sortable: true
	},
]
</script>

<template lang="pug">
q-table(flat
	:columns="columns"
	:rows="versions"
	row-key="id"
	color="primary"
	selection="single"
	v-model:selected="selected"
	hide-bottom)

	template(v-slot:body-selection="scope")
		q-td.sma
			q-checkbox(dense v-model="scope.selected")

	template(v-slot:body-cell-version="props")
		q-td.version
			q-icon(v-if='props.row.published' name="mdi-web-check" color="primary" size="18px")
				q-tooltip Опубликовано
			q-icon(v-else name="mdi-pencil-outline" color="primary" size="18px")
				q-tooltip Редактируется
			span.q-ml-sm {{ props.row.value }}

	template(v-slot:body-cell-published="props")
		q-td
			span(v-if='props.row.published') {{ props.row.published }}
			q-btn(v-else unelevated color="primary" label="Опубликовать" @click.stop="showPublish(props.row)" size='sm') 

	template(v-slot:body-cell-action="props")
		q-td
			q-btn(v-if='!props.row.published' flat round icon="mdi-trash-can-outline" color="negative" @click.stop="destroy(props.row)" size='sm') 

q-card-actions.q-mx-md.q-mb-md
q-btn(unelevated color="primary" label="Создать версию на основе выбранной" @click="create0" :disable="selected?.length == 0") 

PublishDialog(v-model="dialog2" @publish='publish' @create="create" :newversion="newVersion" v-model:comment="tmpVer.comment")
</template>

<style scoped lang="scss">
:deep(.q-table tr.selected) {
	background: var(--bg-selected);
}

th {
	text-align: left;
}

.sma {
	padding: 6px;
	width: 20px;
	height: 20px;
}

.version {
	.q-icon {
		transform: translateY(-2px);
	}
}
</style>
