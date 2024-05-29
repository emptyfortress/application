<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/stores/store'
import { useRouter, useRoute } from 'vue-router'

const store = useStore()
const tabs = ref('main')

const router = useRouter()
const route = useRoute()

const goto = () => {
	store.setPage(route.params.id)
	router.push('/subcard')
}
</script>

<template lang="pug">
q-tabs(v-model="tabs" dense active-color="primary" align="left")
	q-tab(name="main" label="Свойства")
	q-tab(name="sec" label="Дополнительно")


.panel
	q-tab-panels(v-model="tabs" animated)
		q-tab-panel(name="main")
			template(v-if="store.current == null")
				div Выберите объект на панели слева
			pre {{ store.current}}
			.view(v-if="store.current?.type == 'bpmn:Task'" @click="goto")
				div Что увидит пользователь?
				br
				.field
				.field
				.field
				q-btn.q-ml-md(unelevated color="primary" label="Отмена" size="xs") 

			.view(v-if="store.current?.type == 'bpmn:Task'")
				div Что пользователь сможет сделать?
					.big ?

		q-tab-panel(name="sec") sec
</template>

<style scoped lang="scss">
.q-tabs {
	margin: 0 6px;
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
:deep(.q-tab-panels) {
	background: transparent;
	padding: 1rem;
}
.view {
	background: #dedede;
	margin: 0.5rem;
	padding: 0.5rem;
	min-height: 200px;
	cursor: pointer;
}
.field {
	height: 24px;
	width: 100px;
	background: #fff;
	margin-bottom: 3px;
	margin-left: 1rem;
}
</style>
