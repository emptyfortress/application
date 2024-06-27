<script setup lang="ts">
import { useStore } from '@/stores/store'
const store = useStore()
</script>

<template lang="pug">
.grid
	.bl.center
		div
			div(v-for="n in 5") Форма {{ n }}
	.bl.right Свойства
</template>

<style scoped lang="scss">
.grid {
	display: grid;
	grid-template-columns: 1fr 300px;
	align-items: start;
	column-gap: 1rem;
	row-gap: 0.5rem;
}
.bl {
	background: #fff;
	height: calc(100vh - 175px);
	padding: 1rem;
}
.center {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
