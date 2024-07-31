<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import FormTop from '@/components/FormTop.vue'
import FormLayout from '@/components/FormLayout.vue'
import VueDraggableResizable from 'vue-draggable-resizable'
import Toolbar from '@/components/Toolbar.vue'
import { useRoute } from 'vue-router'
import chooseDialog from '@/components/chooseDialog.vue'
import { useLayoutStore } from '@/stores/layout'

const lstore = useLayoutStore()
const route = useRoute()
const name = ref(route.params.etap)
const dialog = ref(false)

const width = ref('100%')
watchEffect(() => {
	switch (lstore.mode) {
		case 'phone':
			return (width.value = '480px')
		case 'tablet':
			return (width.value = '800px')
		case 'desk':
			return (width.value = '100%')
		default:
			return (width.value = '100%')
	}
})
</script>

<template lang="pug">
.bl
	vue-draggable-resizable(:x="0" :y="180"
		:w="32"
		:h="180"
		:active="false"
		:z="2000"
		:parent='true'
		:resizable='false'
		)
		Toolbar

	.zag
		h5 Форма "{{ name }}"
			q-popup-edit(v-model="name" title="Название формы" auto-save v-slot="scope")
				q-input(v-model="scope.value" dense autofocus counter @keyup.enter="scope.set")
		q-btn(flat color="primary" icon="mdi-content-duplicate" label="Выбрать форму" @click="dialog = !dialog") 

	.inner
		FormTop
		FormLayout

chooseDialog(v-model="dialog" kind='form')
</template>

<style scoped lang="scss">
.bl {
	position: relative;
}
.vdr {
	border: 1px solid #ccc;
	background: #fff;
	box-shadow: 2px 2px 4px rgba($color: #000000, $alpha: 0.2);
	padding: 3px;
}
.zag {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: start;
	h5 {
		text-align: center;
		border-bottom: 1px dotted $primary;
	}
}
.inner {
	margin: 0 auto;
	width: v-bind(width);
}
</style>
