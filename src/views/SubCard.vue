<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/stores/store'
import SubCardPanel from '@/components/SubCardPanel.vue'

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
</template>

<style scoped lang="scss">
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
