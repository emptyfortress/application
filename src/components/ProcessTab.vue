<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BpmnModeler from 'bpmn-js/lib/Modeler'
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
import pizza from '@/stores/bpm.bpmn?raw'
import { useStore } from '@/stores/store'

const store = useStore()

const canvas = ref()

onMounted(() => {
	var modeler = new BpmnModeler({
		container: canvas.value,
		keyboard: {
			bindTo: window,
		},
	})

	modeler
		.importXML(pizza)
		.then(function (result) {
			const { warnings } = result
			console.log('success !', warnings)
			modeler.attachTo(canvas.value)
		})
		.catch(function (err) {
			const { warnings, message } = err
			console.log('something went wrong:', warnings, message)
		})

	modeler.on('element.click', (event) => {
		let tmp = {
			id: event.element.businessObject.id,
			type: event.element.businessObject.$type,
			name: event.element.businessObject.name,
		}
		store.setCurrent(tmp)
	})
})
</script>

<template lang="pug">
.canvas(ref="canvas")
</template>

<style scoped lang="scss">
.canvas {
	width: 100%;
	height: 100%;
	background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAAXNSR0IArs4c6QAAADBJREFUGFclioEJADAMwvSl7f8P1pfMaAsiCcT1inOPQJIlkwy3uT8JbmImh2zANh9STBXvibRbIgAAAABJRU5ErkJggg==)
		repeat;
	border: 1px solid #ccc;
}
:deep(.bpmn-icon-lasso-tool) {
	display: none;
}
:deep(.bpmn-icon-hand-tool) {
	display: none;
}
:deep(.bpmn-icon-space-tool) {
	display: none;
}
:deep(.bpmn-icon-subprocess-expanded) {
	display: none;
}
:deep(.bpmn-icon-data-object) {
	display: none;
}
:deep(.bpmn-icon-data-store) {
	display: none;
}
:deep(.bpmn-icon-group) {
	display: none;
}
:deep(.bpmn-icon-intermediate-event-none) {
	display: none;
}
:deep(.djs-palette.two-column.open) {
	width: 50px;
}
</style>
