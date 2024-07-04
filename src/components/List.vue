<script setup lang="ts">
import { useStore } from '@/stores/store'
const store = useStore()
</script>

<template lang="pug">
.bl.center
	div Тут списки
			
</template>

<style scoped lang="scss">
.bl {
	background: #fff;
	height: var(--panel-height);
	padding: 1rem;
	margin-right: 0.5rem;
}
.center {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
