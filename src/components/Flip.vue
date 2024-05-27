<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { wrapGrid } from 'animate-css-grid'
import ExpandCard from '@/components/ExpandCard.vue'

const big = ref(false)

const toggle = () => {
	big.value = !big.value
}
const full = ref(false)

const active = ref(0)

const expand = (e: number) => {
	full.value = !full.value
	if (active.value == e) {
		active.value = 0
	} else active.value = e
}
const grid = ref()

const start = ref(true)
const end = ref(false)

const hideStart = () => {
	start.value = false
}
const showEnd = () => {
	end.value = true
}

onMounted(() => {
	wrapGrid(grid.value, {
		onStart: () => {
			hideStart()
		},
		onEnd: () => {
			showEnd()
		},
	})
})
</script>

<template lang="pug">
.grido(ref="grid" :class="{full : full}")
	.item(@click="expand(1)" :class="{active : active == 1}")
		.rel
			.txt fuck you
	.item(@click="expand(2)" :class="{active : active == 2}")
		div
			ExpandCard
	.item(@click="expand(3)" :class="{active : active == 3}")
		div
			ExpandCard
	.item(@click="expand(4)" :class="{active : active == 4}")
		div
			ExpandCard
</template>

<style scoped lang="scss">
.grido {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: 200px 100px;
	gap: 1rem;
	// grid-gap: 1rem;
	// height: 800px;
	.item {
		cursor: pointer;
		background-color: white;
		padding: 1rem;
		height: 100%;
		// &:hover {
		// 	border: 1px solid #ccc;
		// 	box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
		// }
	}
	&.full {
		grid-template-rows: 1fr 100px;
		.active {
			grid-column: 1/-1;
			grid-row: 1/2;
			height: calc(100vh - 300px);
		}
	}
}

// .txt {
// 	position: absolute;
// 	top: 1rem;
// 	left: 1rem;
// }
</style>
