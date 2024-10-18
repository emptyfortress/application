<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from '@/stores/store'
import { useRouter } from 'vue-router'
import { useData } from '@/stores/alldata'
import VersionTable from '@/components/VersionTable.vue'

const props = defineProps({
	id: {
		type: String,
		required: true,
	},
})

const store = useStore()
const router = useRouter()
const mydata = useData()

const goto = () => {
	mydata.setAssist(false)
	router.push(`/${props.id}/editor/process`)
}
const ass = () => {
	mydata.setAssist(true)
	router.push('/assistent')
}
const versions = ref<Version[]>([
	{
		id: 2,
		label: '2.0',
		value: '2.0',
		created: '13.11.2023 15:13',
		published: null,
		author: 'Орлов П.С.',
		comment: '',
		current: true,
	},
	{
		id: 1,
		label: '1.0',
		value: '1.0',
		created: '28.09.2023 09:23',
		published: '18.10.2023 17:11',
		author: 'Орлов П.С.',
		comment: 'Доработки формы создания',
		current: false,
	},
	{
		id: 0,
		label: '0.0',
		value: '0.0',
		created: '20.06.2023 12:03',
		published: '23.06.2023 20:11',
		author: 'Орлов П.С.',
		comment: 'Стартовая версия',
		current: false,
	},
])

const tab = ref('current')
const curVersion = ref('2.0')

const version = computed(() => {
	let v = versions.value.filter((item) => item.value == curVersion.value)[0]
	return v
})
</script>

<template lang="pug">
.q-ml-md


	template(v-if="store.currentNode")
		.grid
			div
				h6
					span.edit {{ store.currentNode.data.text }}
					q-popup-edit(v-model="store.currentNode.data.text" buttons title="Название приложения" auto-save v-slot="scope")
						q-input(v-model="scope.value" dense autofocus counter @keyup.enter="scope.set")

				.text-subtitle1(v-if='store.currentNode.data.type == 1')
					span.edit(v-if='store.currentNode.data.descr') {{ store.currentNode.data.descr }}
					span.edit(v-else) Описание приложения
					q-popup-edit(v-model="store.currentNode.data.descr" buttons title="Описание приложения" auto-save v-slot="scope")
						q-input(v-model="scope.value" dense autofocus counter @keyup.enter="scope.set")

			div(v-if="store.currentNode.data.type == 1")
				q-select(v-model="curVersion" dense :options="versions" label='version' emit-value)
					template(v-slot:prepend)
						q-icon(name="mdi-source-branch" color="primary")
					template(v-slot:option="scope")
						q-item(v-bind="scope.itemProps")
							q-item-section(avatar)
								q-icon(v-if='scope.opt.published' name="mdi-web-check")
								q-icon(v-else name="mdi-pencil-outline")
							q-item-section
								q-item-label {{ scope.opt.label }}
								q-item-label(v-if='scope.opt.published' caption) опубликовано

		br
		q-tabs(v-model="tab" dense align="left" active-color="primary" indicator-color="primary")
			q-tab(name="current" :label="`Версия ${curVersion}`")
			q-tab(name="manage" label="Управление версиями")

		q-tab-panels(v-model="tab")
			q-tab-panel(name="current")
				template(v-if="store.currentNode.data.type == 1")
					.grid1
						.text-bold Создано:
						div {{ version.created }}
						.text-bold Автор:
						div {{ version.author }}
						template(v-if='version.published')
							.text-bold Опубликовано:
							div {{ version.published }}
							.text-bold Комментарий:
							div {{ version.comment }}
						template(v-else)
							.rd Версия не опубликована

					q-card-actions.q-mt-xl
						template(v-if='!version.published')
							q-btn(v-if='mydata.begin == 0' unelevated  icon="mdi-school" label="Ассистент" color="primary" @click="ass") 
							q-btn(v-else unelevated  icon="mdi-pencil" label="Настройки" color="primary" @click="goto") 
						template(v-else)
							q-btn(unelevated  icon="mdi-eye" label="Просмотр" color="primary" @click="goto") 

			q-tab-panel(name="manage")
				VersionTable(v-model:versions="versions")

</template>

<style scoped lang="scss">
.big {
	font-size: 1.2rem;
	color: $primary;
	cursor: pointer;
}

.text-overline {
	line-height: 1;
}

.grid {
	display: grid;
	grid-template-columns: 1fr 200px;
	align-items: center;
	column-gap: 1rem;
	row-gap: 0.5rem;
}

.grid1 {
	margin-top: 1rem;
	display: grid;
	grid-template-columns: auto 1fr;
	column-gap: 1rem;
}

.edit {
	border-bottom: 1px dotted $primary;
}

.q-tab-panels {
	background: transparent;
}

.rd {
	grid-column: 1 / -1;
	color: $negative;
	font-weight: 600;
}
</style>
