<script setup lang="ts">
import { ref, reactive } from 'vue'
import { GridItem, GridLayout } from 'vue-ts-responsive-grid-layout'
import { useLayoutStore } from '@/stores/layout'
import FormSection from '@/components/FormSection.vue'

const lstore = useLayoutStore()

const remove = (e: number) => {
	let temp = [...document.getElementsByClassName('vue-grid-item')]
	temp.forEach((el) => el.classList.add('move'))
	lstore.removeSection(e)
}

const over = ref(false)

const onDragEnter = () => {
	over.value = true
}
const onDragLeave = () => {
	over.value = false
}
const onDrop = () => {
	lstore.addSection()
	over.value = false
}
</script>

<template lang="pug">
.list(
	@dragover.prevent
	@dragleave.prevent="onDragLeave"
	@dragenter.prevent="onDragEnter"
	@drop="onDrop"
	:class="{over : over}"
	)

	GridLayout(
		:layout.sync="lstore.layout"
		:col-num="12"
		:row-height="30"
		:is-draggable="true"
		:is-resizable="true"
		:is-bounded="true"
		:is-mirrored="false"
		:vertical-compact="true"
		:margin="[5, 5]"
		:show-close-button="false"
		:use-css-transforms="false"
		)

		GridItem(v-for="( item, index ) in lstore.layout"
			:x="item.x"
			:y="item.y"
			:w="item.w"
			:h="item.h"
			:i="item.i"
			:show-close-button="false"
			:key="item.i")


			.sect
				q-icon.close(name="mdi-close-box" @click="remove(index)" dense)
				q-icon.resize(name="mdi-resize-bottom-right" @click="" dense size="16p") 

				FormSection
</template>

<style scoped lang="scss">
.list {
	border-top: 1px solid #ccc;
	width: 100%;
	padding: 0.5rem;
	background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAAXNSR0IArs4c6QAAADhJREFUGFctjMERADAIwsL+MxZHoYetL8gFBSCJpAFsRwW9LAVPYUEVPvTUfHX9iDMn2h/fFtnVBb6XHglDcS5IAAAAAElFTkSuQmCC)
		repeat;
	&.over {
		background: #ccc;
	}
}
:deep(.vue-grid-item) {
	touch-action: none;
	position: relative;
}
:deep(.vue-grid-item.vue-grid-placeholder) {
	background: green !important;
	opacity: 0.2;
}
:deep(.vue-draggable-dragging) {
	z-index: 1000;
	box-shadow: 3px 3px 17px rgba(0, 0, 0, 0.4);
}
.move {
	transition: 0.2s ease all;
}
:deep(.vue-grid-item) {
	touch-action: none;
	position: relative;
}
.vue-grid-layout {
	min-height: calc(100vh - 360px);
}
.sect {
	border: 1px solid blue;
	height: 100%;
	width: 100%;
	z-index: 1001;
	position: relative;
	overflow: hidden;
}
.close {
	position: absolute;
	right: 0;
	top: 0;
	cursor: pointer;
}
.resize {
	position: absolute;
	right: 3px;
	bottom: 3px;
	cursor: pointer;
}
</style>
