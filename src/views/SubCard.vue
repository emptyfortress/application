<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useStore } from '@/stores/store'
import SubCardPanel from '@/components/SubCardPanel.vue'
import VueDraggableResizable from 'vue-draggable-resizable'

const store = useStore()
const split = ref(70)

const tabs = ref('main')
const razm = reactive([
	{
		id: 1,
		name: 'Форма 1',
		etap: 'Создал заявку',
		selected: true,
	},
	{
		id: 2,
		name: 'Форма 2',
		etap: 'Согласовать заявку',
		selected: false,
	},
	{
		id: 3,
		name: 'Форма 3',
		etap: 'Рассмотреть заявку',
		selected: false,
	},
])
const currentForm = ref('Форма 1')

const select = (item: any) => {
	razm.map((e) => {
		e.selected = false
	})
	item.selected = true
	currentForm.value = item.name
	slide.value = item.id
}
const slide = ref(1)

const add = () => {
	const date = new Date()
	razm.push({
		id: +date,
		name: 'Новая форма',
		etap: store.current.name,
		selected: false,
	})
}
const duble = () => {
	const date = new Date()
	razm.push({
		id: +date,
		name: currentForm.value + '-copy',
		etap: store.current.name,
		selected: false,
	})
}
const remove = () => {
	let idx = razm.findIndex((e: any) => {
		return e.selected == true
	})
	razm.splice(idx, 1)
	currentForm.value = razm[0].name
	razm[0].selected = true
}
const editMode = ref(false)
</script>

<template lang="pug">
q-page
	.top
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
				q-tab(name="main" label="Формы")
				q-tab(name="sec" label="Состояния")

			q-tab-panels.panel(v-model="tabs" animated)
				q-tab-panel(name="main")
					.grid
						div
							.text-overline Доступные формы
							q-list
								q-item(clickable dense v-for="item in razm" :key="item.id" :class="{selected : item.selected}" @click="select(item)")
									q-item-section
										q-item-label {{ item.name }}
									q-item-section.small(side)
										q-item-label {{ item.etap }}
							br
							q-card-actions
								q-btn(unelevated color="primary" label="Создать" @click="add") 
								q-btn(flat color="primary" label="Дублировать" @click="duble") 
						.form
							h5 {{ currentForm }}
							q-carousel(animated v-model="slide" navigation arrows infinite transition-prev="jump-right" transition-next="jump-left" height="400px" width="80%")
								q-carousel-slide(:name="1")
									q-img(src="@/assets/img/form1.png")
								q-carousel-slide(:name="2")
									q-img(src="@/assets/img/form2.png")
								q-carousel-slide(:name="3")
									q-img(src="@/assets/img/form3.png")
							div
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
	box-shadow:
		2px 2px 4px rgba(0, 0, 0, 0.2),
		-1px 0px 4px rgba(0, 0, 0, 0.2);
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
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	// align-items: center;
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
</style>
