<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BpmnModeler from 'bpmn-js/lib/Modeler'
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
import zay from '@/stores/zayavka.bpmn?raw'

import { useRouter, useRoute } from 'vue-router'
import { useStore } from '@/stores/store'

const store = useStore()

const router = useRouter()
const route = useRoute()
const canvas = ref()

const goto = (e: string) => {
	store.setEtap(e)
	router.push('/editor/etap')
}

onMounted(() => {
	var modeler = new BpmnModeler({
		container: canvas.value,
		keyboard: {
			bindTo: window,
		},
	})

	modeler
		.importXML(zay)
		.then(function (result) {
			const { warnings } = result
			console.log('success !', warnings)
			modeler.attachTo(canvas.value)
		})
		.catch(function (err) {
			const { warnings, message } = err
			console.log('something went wrong:', warnings, message)
		})
})
</script>

<template lang="pug">
.canvas(ref="canvas")
</template>

<style scoped lang="scss">
.canvas {
	background: #fff;
	height: var(--panel-height);
	margin-right: 0.25rem;
	background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAAXNSR0IArs4c6QAAADBJREFUGFclioEJADAMwvSl7f8P1pfMaAsiCcT1inOPQJIlkwy3uT8JbmImh2zANh9STBXvibRbIgAAAABJRU5ErkJggg==)
		repeat;
	position: relative;
}
.etap {
	border: 2px solid #333;
	padding: 1rem;
	border-radius: 1rem;
	cursor: pointer;
	position: absolute;
	background: #fff;
	top: 5rem;
	left: 13rem;
	&:hover {
		background: #dedede;
	}
}
.more {
	top: 9rem;
	left: 26rem;
}
</style>
