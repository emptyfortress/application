<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/stores/store'
import SubCardPanel from '@/components/SubCardPanel.vue'
import VueDraggableResizable from 'vue-draggable-resizable'

const store = useStore()
const split = ref(70)

const tabs = ref('main')
</script>

<template lang="pug">
q-page
	.top
		q-btn(flat round dense icon="mdi-arrow-left-circle-outline" color="primary" @click="$router.back()" size="lg") 
		div
			div {{ store.page }}
			h5 {{ store.current?.name }}

	q-splitter(v-model="split")
		template(v-slot:before)
			q-tabs(v-model="tabs" dense active-color="primary" align="left")
				q-tab(name="main" label="Разметки")
				q-tab(name="sec" label="Состояния ?")

			.panel
				.grid
					div
						q-list
							q-item(clickable)
								q-item-section Разметка 1
							q-item(clickable)
								q-item-section Разметка 2
							q-item(clickable)
								q-item-section Разметка 3
						q-btn(unelevated color="primary" label="Создать") 
					.form
						div Форма


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
	top: 50%;
	left: 50%;
}
.top {
	display: grid;
	grid-template-columns: auto 1fr;
	justify-items: start;
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
	padding: 1rem;
}
.form {
	width: 100%;
	height: calc(100vh - 240px);
	background: #eee;
}
</style>
