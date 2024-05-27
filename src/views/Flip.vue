<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { wrapGrid } from 'animate-css-grid'

const big = ref(false)

const toggle = () => {
	big.value = !big.value
}
const full = ref(false)

const action = () => {
	full.value = !full.value
}
const grid = ref()

onMounted(() => {
	wrapGrid(grid.value)
})
</script>

<template lang="pug">
q-page(padding)
	.grid(ref="grid" :class="{full : full}")
		.role
			q-btn(unelevated color="primary" label="Отмена" @click="action") 
		.proc
			span process
		.list
			span process
		.card
			span process
		.card
			span process
</template>

<style scoped lang="scss">
.grid {
	// width: 50%;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr;
	height: 400px;
	// justify-items: start;
	// align-items: stretch;
	column-gap: 0.5rem;
	row-gap: 0.5rem;
	// transition: 0.3s ease all;
	div {
		// height: 100px;
		background: #ccc;
		overflow: hidden;
	}
	&.full {
		// gap: 3rem;
		width: 100%;
		grid-template-columns: 1fr 50px;
		grid-template-rows: 1fr 0.1fr;
		span {
			display: none;
		}
		.text {
			display: block;
		}
	}
	.text {
		display: none;
	}
	// &:has(.role:hover) {
	// 	width: 100%;
	// 	grid-template-columns: 7fr 1fr;
	// 	grid-template-rows: 4fr 1fr;
	// }
	// &:has(.proc:hover) {
	// 	width: 100%;
	// 	grid-template-columns: 1fr 7fr;
	// 	grid-template-rows: 4fr 1fr;
	// }
	// &:has(.list:hover) {
	// 	width: 100%;
	// 	grid-template-columns: 7fr 1fr;
	// 	grid-template-rows: 1fr 4fr;
	// }
}
</style>
