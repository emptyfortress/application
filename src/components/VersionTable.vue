<script setup lang="ts">
import { ref } from 'vue'
// import { useForms } from '@/stores/forms'
import PublishDialog from '@/components/PublishDialog.vue'

const versions = defineModel<Version[]>()

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

const selected = ref(2)

const select = (e: number) => {
	selected.value = e
}
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
	versions.value = versions.value?.filter((v) => v.id != e.id)
}

const newVersion = ref(false)
const create0 = (() => {
	newVersion.value = true
	dialog2.value = true
})
</script>

<template lang="pug">
q-markup-table(flat)
	thead
		tr
			th
			th Версия
			th Дата создания
			th Дата публикации
			th Автор
			th Комментарий
			th
	tbody
		tr(v-for="version in versions" :key='version.id' @click='select(version.id)' :class='{ selected: selected == version.id }')
			td.sma
				q-icon(v-if='version.published' name="mdi-web-check" color="primary" size="18px")
					q-tooltip Опубликовано
				q-icon(v-else name="mdi-pencil-outline" color="primary" size="18px")
					q-tooltip Редактируется
			td {{ version.label }}
			td {{ version.created }}
			td
				span(v-if='version.published') {{ version.published }}
				q-btn(v-else unelevated color="primary" label="Опубликовать" @click.stop="showPublish(version)" size='sm') 
			td {{ version.author }}
			td {{ version.comment }}
			td
				q-btn(v-if='!version.published' flat round icon="mdi-trash-can-outline" color="negative" @click.stop="destroy(version)" size='sm') 

q-card-actions.q-mx-md.q-mb-md
q-btn(unelevated color="primary" label="Создать версию на основе выбранной" @click="create0" ) 

PublishDialog(v-model="dialog2" @publish='publish' @create="create" :newversion="newVersion" v-model:comment="tmpVer.comment")
</template>

<style scoped lang="scss">
.selected {
	background: var(--bg-selected);
}

th {
	text-align: left;
}

.sma {
	padding: 8px;
	min-width: 20px;
}
</style>
