<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/stores/store'

const store = useStore()
const tabs = ref('main')
</script>

<template lang="pug">
q-tabs(v-model="tabs" dense active-color="primary" align="left")
	q-tab(name="main" label="Роль")
	q-tab(name="sec" label="Правила выбора")

.panel
	q-tab-panels(v-model="tabs" animated)
		q-tab-panel(name="main")
			template(v-if="store.current == null")
				div Выберите объект на панели слева
			pre {{ store.current}}
		q-tab-panel(name="sec") sec
		q-tab-panel(name="tri") tri
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
	box-shadow: var(--panel-shadow);
}
:deep(.q-tab-panels) {
	background: transparent;
	padding: 1rem;
}
</style>
