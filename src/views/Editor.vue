<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/stores/store'

const store = useStore()
const route = useRoute()
const split = ref(80)
</script>

<template lang="pug">
q-page(padding)
	h6
		span {{ store.app.title }}
		span &nbsp;—&nbsp; {{ store.editor }}
		span(v-if="store.etap") &nbsp;—&nbsp; {{ store.etap }}

	q-splitter.split(v-model="split")
		template(v-slot:before)
			router-view
		template(v-slot:after)
			div fuck

</template>

<style scoped lang="scss">
.split {
	// width: 100%;
	height: calc(100vh - 150px);
}
.q-card {
	height: 100%;
	padding: 1rem;
}
</style>
