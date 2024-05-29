<script setup lang="ts">
import { useStore } from '@/stores/store'
import VueDraggableResizable from 'vue-draggable-resizable'

const store = useStore()
</script>

<template lang="pug">
q-page(padding)
	div {{ store.page }}
	h4 Реестры

	vue-draggable-resizable(:x="0" :y="0" :w="200" :h="150" :active="false")
		p Hello! I'm a minimap.
</template>

<style lang="scss"></style>
