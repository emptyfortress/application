<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/stores/store'
import SubCardPanel from '@/components/SubCardPanel.vue'

const store = useStore()
const split = ref(70)
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
</style>
