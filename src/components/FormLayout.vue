<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { GridItem, GridLayout } from 'vue-ts-responsive-grid-layout'
import FormSection from '@/components/FormSection.vue'
import { useStore } from '@/stores/store'
import { useLayoutStore } from '@/stores/layout'

const store = useStore()
const lstore = useLayoutStore()

const remove = (e: number) => {
	let list = document.getElementsByClassName('vue-grid-item')
	let temp = Array.from(list)
	temp.forEach((el) => el.classList.add('move'))
	lstore.removeSection(e)
}

const green = ref(false)
const red = ref(false)

const onDragEnter = () => {
	if (lstore.dragType == 1) {
		green.value = true
	}
	if (lstore.dragType == 2) {
		red.value = true
	}
}
const onDragLeave = () => {
	green.value = false
	red.value = false
}
const onDrop = () => {
	if (lstore.dragType == 1) {
		lstore.addSection()
	}
	green.value = false
	red.value = false
	lstore.setDragType(0)
}
const calcClass = computed(() => {
	if (green.value == true) return 'green'
	if (red.value == true) return 'red'
})

const select = (e: any) => {
	lstore.unselectBlock()
	e.selected = !e.selected
	store.setCurrentBlock(e)
}

const unselect = () => {
	lstore.unselectBlock()
	store.setCurrentBlock(null)
}
const height = computed(() => {
	return lstore.mode == 'phone' ? 'calc(100vh - 340px)' : 'calc(100vh - 285px)'
})
</script>

<template lang="pug">
GridLayout.list(
	:layout.sync="lstore.layout"
	:col-num="12"
	:row-height="30"
	:is-draggable='lstore.move'
	:is-resizable="true"
	:is-bounded="true"
	:is-mirrored="false"
	:vertical-compact="true"
	:margin="[5, 5]"
	:show-close-button="false"
	:use-css-transforms="false"
	@dragover.prevent
	@dragenter.prevent="onDragEnter"
	@dragleave="onDragLeave"
	@drop="onDrop"
	:class="calcClass"
	@click='unselect'
	)

	GridItem(v-for="( item, index ) in lstore.layout"
		:x="item.x"
		:y="item.y"
		:w="item.w"
		:h="item.h"
		:i="item.i"
		:show-close-button="false"
		:key="item.i"
		@click.stop="select(item)"
		:class="{selected : item.selected}"
		)


		.sect
			.draghandle
			q-icon.close(name="mdi-close-box" @click="remove(index)" dense)
			q-icon.resize(name="mdi-resize-bottom-right" @click="" dense size="16p") 

			FormSection

</template>

<style scoped lang="scss">
.list {
	// min-height: calc(100vh - 297px);
	min-height: v-bind(height);
	border-top: 1px solid #ccc;
	padding: 0.5rem;
	background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAAXNSR0IArs4c6QAAADhJREFUGFctjMERADAIwsL+MxZHoYetL8gFBSCJpAFsRwW9LAVPYUEVPvTUfHX9iDMn2h/fFtnVBb6XHglDcS5IAAAAAElFTkSuQmCC)
		repeat;
	&.green {
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAAXNSR0IArs4c6QAAAEVJREFUGFc1jMEJwDAQw+Rh2mUzTC5DlfsH8na5pP1YIIQlhGUEYBHZXW4LAzL0HCUF9gEwnvjLrzVEhtVm872uXdXU3wu++R1o8/ljbgAAAABJRU5ErkJggg==)
			repeat;
	}
	&.red {
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAAXNSR0IArs4c6QAAADtJREFUGFdFjMENwCAQw5z9F4RBCi9wddVJ/TlOlACEYAFw52PSgQJLLlO738sZu2Tr7u5YxrkVv1+aXpDQGwTZMqKrAAAAAElFTkSuQmCC)
			repeat;
	}
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
.sect {
	height: 100%;
	width: 100%;
	z-index: 1001;
	position: relative;
	overflow: hidden;
	background: #fefefe;
}
.selected .sect {
	border: 1px solid blue;
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
