<script setup lang="ts">
import { ref, reactive } from 'vue'
import { GridItem, GridLayout } from 'vue-ts-responsive-grid-layout'
import { useLayoutStore } from '@/stores/layout'
import FormSection from '@/components/FormSection.vue'

const lstore = useLayoutStore()

const remove1 = (e: number) => {
	let temp = [...document.getElementsByClassName('vue-grid-item')]
	temp.forEach((el) => el.classList.add('move'))
	layout.splice(e, 1)
}

const over = ref(false)

const onDragOver = () => {
	over.value = true
}
const onDrop = () => {
	layout.push({
		x: 0,
		y: 6,
		w: 5,
		h: 6,
		i: 4,
	})
}
</script>

<template lang="pug">
.list(
	@dragover.prevent
	@dragenter.prevent
	@dragenter="onDragOver"
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

		GridItem(v-for="( item ) in lstore.layout"
			:x="item.x"
			:y="item.y"
			:w="item.w"
			:h="item.h"
			:i="item.i"
			:show-close-button="false"
			:key="item.i")

			FormSection

			// .sect
				q-icon.close(name="mdi-close-bo" @click="remove1(item.i)" dense)
				q-icon.resize(name="mdi-resize-bottom-right" @click="" dense size="16p") 

				.drop(v-if="list2.length == 0")
					span Перетащите сюда нужное поле из библиотеки справа.

				draggable(
					class="list-group"
					:list="list2"
					group="people"
					ghost-class="ghost"
					itemKey="id")

					template(#item="{ element, index }")
						.node1(ref="target" @click="select(element)" :class="{selected: element.selected}")
							FormKit(:type="element.type" :label="element.label" :placeholder="element.typ" :options="element.options")
							.bt
								q-btn(dense flat @click="element.visible = !element.visible" size="sm") 
									q-icon(name="mdi-eye" v-if="element.visible")
									q-icon(name="mdi-eye-off" v-else)

								q-btn(dense flat @click="element.readonly = !element.readonly" size="sm") 
									q-icon(name="mdi-pencil-off" v-if="element.readonly")
									q-icon(name="mdi-pencil" v-else)

								q-btn(dense flat icon="mdi-close" @click="remove(index)" size="sm") 
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
</style>
