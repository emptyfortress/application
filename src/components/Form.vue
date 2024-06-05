<script setup lang="ts">
import EditFormComp from '@/components/EditFormComp.vue'
import VueDraggableResizable from 'vue-draggable-resizable'
</script>

<template lang="pug">
.panel
	EditFormComp

	Teleport(to="body")
		vue-draggable-resizable.drag(:x="0" :y="0" :w="200" :h="150" :active="false" :z="2005")
			q-img(src="@/assets/img/map.png")
</template>

<style scoped lang="scss">
.panel {
	box-sizing: border-box;
	// margin: 0 6px 6px 6px;
	background: #fff;
	height: var(--height);
	padding: 1rem;
	box-shadow: var(--panel-shadow);
}
.drag {
	padding: 0.5rem;
	background: #fff;
	box-shadow: 3px 3px 6px 0px rgba(0, 0, 0, 0.2);
	position: absolute;
	top: 70%;
	left: 80%;
}
</style>
