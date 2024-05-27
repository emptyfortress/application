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

const emit = defineEmits(['active', 'inactive'])

const expand = (e: number) => {
	if (active.value == e) {
		active.value = 0
		full.value = false
		emit('inactive')
	} else {
		full.value = true
		active.value = e
		emit('active')
	}
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
// just comment to new build
// just comment to new build
</script>

<template lang="pug">
.grido(ref="grid" :class="{full : full}")
	.item(@click="expand(1)" :class="{active : active == 1}")
		.in
			.txt Роли
	.item(@click="expand(2)" :class="{active : active == 2}")
		.in
			.txt  Процессы
	.item(@click="expand(3)" :class="{active : active == 3}")
		.in
			.txt Карточки
	.item(@click="expand(4)" :class="{active : active == 4}")
		.in
			.txt Реестры
</template>

<style scoped lang="scss">
.grido {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: 200px 100px;
	gap: 1rem;
	.item {
		cursor: pointer;
		background-color: white;
		padding: 1rem;
		&:hover {
			border: 1px solid #ccc;
			box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
		}
	}
	&.full {
		grid-template-rows: 1fr 100px;
		.active {
			grid-column: 1/-1;
			grid-row: 1/2;
			height: calc(100vh - 350px);
		}
	}
}

.txt {
	text-align: center;
	text-transform: uppercase;
	color: $secondary;
}
</style>
