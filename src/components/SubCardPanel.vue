<script setup lang="ts">
import { ref } from 'vue'

const tabs = ref('main')
</script>

<template lang="pug">
q-tabs(v-model="tabs" dense active-color="primary" align="left")
	q-tab(name="main" label="Свойства")
	q-tab(name="sec" label="Дополнительно")

.panel
	q-tab-panels(v-model="tabs" animated)
		q-tab-panel(name="main")
			div Что здесь

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
</style>
