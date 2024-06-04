<script setup lang="ts">
import EditFormComp from '@/components/EditFormComp.vue'
</script>

<template lang="pug">
.panel
	EditFormComp
</template>

<style scoped lang="scss">
.panel {
	box-sizing: border-box;
	margin: 0 6px 6px 6px;
	background: #fff;
	height: calc(100vh - 202px);
	padding: 1rem;
	box-shadow: var(--panel-shadow);
}
</style>
