<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
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
	active.value = e
}
const grid = ref()

onMounted(() => {
	wrapGrid(grid.value)
})
</script>

<template lang="pug">
q-page(padding)
	.blockgrid(ref="grid" :class="{full : full}")
		.bl.role(@click="expand(1)" :class="{active : active == 1}")
		.bl.proc(@click="expand(2)" :class="{active : active == 2}")
		.bl.card(@click="expand(3)" :class="{active : active == 3}")
		.bl.list(@click="expand(4)" :class="{active : active == 4}")
</template>

<style scoped lang="scss">
.blockgrid {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: 200px 100px;
	column-gap: 0.5rem;
	row-gap: 0.5rem;
	&.full {
		grid-template-rows: 1fr 100px;
		.active {
			grid-column: 1/-1;
			grid-row: 1/2;
			height: 500px;
		}
	}
}
.bl {
	border-radius: 0.5rem;
	cursor: pointer;
	height: 150px;
	background: #fff;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	&:hover {
		border: 1px solid #ccc;
		box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
	}
}
</style>
