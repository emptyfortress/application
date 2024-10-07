<script setup lang="ts">
import { ref } from 'vue'
// import { useForms } from '@/stores/forms'
import PublishDialog from '@/components/PublishDialog.vue'

const versions = defineModel<Version[]>()

// const icon = ref(3)
// const myform = useForms()

const ind = ref(3)

const create = () => {
	let tmp = {
		id: ind.value,
		label: `${ind.value}.0`,
		value: `${ind.value}.0`,
		created: new Date().toLocaleDateString('ru-RU') + ' 00:00',
		published: null,
		author: 'Орлов П.С.',
		current: false,
		comment: '',
	}
	versions.value?.unshift(tmp)
	ind.value += 1
}

const selected = ref(2)

const select = (e: number) => {
	selected.value = e
}
const dialog2 = ref(false)
const tmpVer = ref<Version | null>(null)

const showPublish = (v: Version) => {
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
		tr(v-for="version in versions" :key='version.id' @click='select(version.id)' :class='{selected: selected == version.id}')
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
q-btn(unelevated color="primary" label="Создать версию на основе выбранной" @click="create") 

PublishDialog(v-model="dialog2" @create='publish')
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
