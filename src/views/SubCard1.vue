<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useStore } from '@/stores/store'
import SubCardPanel from '@/components/SubCardPanel.vue'
import VueDraggableResizable from 'vue-draggable-resizable'
import SvgIcon from '@/components/SvgIcon.vue'
import AddFieldDialog from '@/components/AddFieldDialog.vue'
import { uid } from 'quasar'
import draggable from 'vuedraggable'

interface Field {
	id: string
	name: string
	type: string
}

const store = useStore()
const split = ref(70)

const tabs = ref('main')
const fields: Field[] = reactive([])
const fields1: Field[] = reactive([
	// 	{
	// 		id: 'laksj',
	// 		name: 'fuck',
	// 		type: 'test',
	// 	},
])

const select = (item: any) => {
	razm.map((e) => {
		e.selected = false
	})
	item.selected = true
	slide.value = item.id
}
const slide = ref(1)
const frm = ref()

onMounted(() => {
	store.setFormName(store.startFormName)
})

const dialog = ref(false)
const add = () => {
	dialog.value = !dialog.value
}
const create = (e: Field) => {
	fields.push(e)
}
const remove = () => {
	// let idx = razm.findIndex((e: any) => {
	// 	return e.selected == true
	// })
	// razm.splice(idx, 1)
	// // currentForm.value = razm[0].name
	// razm[0].selected = true
}
const editMode = ref(false)
const prev = computed(() => {
	return '/split/' + store.page
})
const drag = ref(false)
const log = () => {
	console.log(111)
}
</script>

<template lang="pug">
q-page
	q-breadcrumbs
		template(v-slot:separator)
			q-icon(name="mdi-arrow-right" color="primary")

		q-breadcrumbs-el(:to="prev" icon="mdi-arrow-left-circle-outline" label="Назад")


		q-breadcrumbs-el(to="/subcard1")
			SvgIcon(name="process")
			q-item-label {{ store.page }}
			q-menu
				.size
					q-img(src="@/assets/img/map.png")
				

	// .top
		q-btn(flat round dense icon="mdi-arrow-left-circle-outline" color="primary" @click="$router.back()" size="lg") 
		div
			div {{ store.page }}
			h5 {{ store.current?.name }}
		.q-gutter-x-xs
			q-btn(flat color="primary" label="Отмена") 
			q-btn(unelevated color="primary" label="Сохранить изменения") 
	

	q-splitter(v-model="split")
		template(v-slot:before)
			q-tabs.q-px-sm(v-model="tabs" dense active-color="primary" align="left")
				q-tab(name="main" label="Форма")
				q-tab(name="sec" label="Состояния")

			q-tab-panels.panel(v-model="tabs" animated)
				q-tab-panel(name="main")
					.grid
						div
							.field Список доступных полей
							q-list.q-mt-md
								draggable(
									:list="fields"
									:group="{ name: 'people', pull: 'clone', put: false }"
									@change="log"
									item-key="id"
									)
									template( #item="{element}" )
										q-item(clickable dense) {{element.name}}

							.empty(v-if="!fields.length") Ничего нет

								// q-item(clickable dense v-for="item in fields" :key="item.id" :class="{selected : item.selected}" @click="select(item)")
									q-item-section
										q-item-label {{ item.name }}
									q-item-section.small(side)
										q-item-label {{ item.type }}

							br
							q-btn(flat color="primary" icon="mdi-plus-circle" label="Создать" @click="add") 
						.form
							.zg
								span {{ store.formName}}
									q-popup-edit(v-model="store.formName" v-slot="scope")
										q-input(ref="frm" v-model="scope.value" dense autofocus @focus="frm.select()" @keyup.enter="scope.set")

							.list
								draggable(
									:list="fields1"
									group="people"
									@change="log"
									item-key="id"
									)
									template( #item="{element}" )
										q-item(clickable) {{element.name}}

								
							// div
								template(v-if="editMode")
									q-btn(flat color="primary" label="Сохранить" @click="editMode = false" ) 
									q-btn(flat color="negative" label="Удалить" @click="remove") 
								template(v-else)
									q-btn(flat color="primary" label="Редактировать" @click="editMode = true" ) 
				q-tab-panel(name="sec")
					.q-pa-lg Здесь состояния ?


		template(v-slot:after)
			SubCardPanel
	Teleport(to="body")
		vue-draggable-resizable.drag(:x="0" :y="0" :w="200" :h="150" :active="false" :z="2005")
			q-img(src="@/assets/img/map.png")

	AddFieldDialog(v-model="dialog" @create="create")

</template>

<style scoped lang="scss">
.drag {
	padding: 0.5rem;
	background: #fff;
	box-shadow: 3px 3px 6px 0px rgba(0, 0, 0, 0.2);
	position: absolute;
	top: 70%;
	left: 80%;
}
.top {
	display: grid;
	grid-template-columns: auto 1fr auto;
	justify-items: space-between;
	align-items: center;
	column-gap: 1rem;
}
.q-splitter {
	margin-top: 1rem;
	height: calc(100vh - 160px);
}
.panel {
	box-sizing: border-box;
	margin: 0 6px 6px 6px;
	background: #fff;
	height: calc(100vh - 202px);
	padding: 1rem;
	box-shadow: var(--panel-shadow);
}
.grid {
	display: grid;
	grid-template-columns: auto 1fr;
	justify-items: start;
	align-items: start;
	column-gap: 3rem;
}
.form {
	width: 100%;
	height: calc(100vh - 240px);
	background: #eee;
	padding: 1rem;
	// display: flex;
	// flex-direction: column;
	// justify-content: space-between;
	.zg {
		font-size: 1.2rem;
		span {
			border-bottom: dotted 1px $primary;
		}
	}
}
.selected {
	background: #d3e8ff;
}
:deep(.q-tab-panel) {
	padding: 0;
	background: transparent;
}
.small {
	font-size: 0.8rem;
	white-space: nowrap;
}
:deep(.q-carousel) {
	background: transparent;
}
.q-breadcrumbs {
	font-size: 1.1rem;
	.q-item__label {
		margin-left: 0.5rem;
	}
}
svg.icon.item {
	width: 1.4rem;
}
.size {
	// height: 200px;
	width: 400px;
}
.list {
	margin-top: 1rem;
	min-height: 150px;
}
</style>
