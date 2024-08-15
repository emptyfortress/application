<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import BpmnModeler from 'bpmn-js/lib/Modeler'
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
import zay from '@/stores/zayavka.bpmn?raw'
import empty from '@/stores/simple.bpmn?raw'
import 'diagram-js-minimap/assets/diagram-js-minimap.css'

import { useRouter, useRoute } from 'vue-router'
import { useStore } from '@/stores/store'
import { useStorage } from '@vueuse/core'
import { useForms } from '@/stores/forms'
import { useData } from '@/stores/alldata'

const store = useStore()
const myform = useForms()
const mydata = useData()

const router = useRouter()
const route = useRoute()
const canvas = ref()

const app = useStorage('app', localStorage)

const reload = ref(false)

const bpmn = computed(() => {
	// return app.value.file ? zay : empty

	if (mydata.myxml == null) {
		return app.value.file ? zay : empty
	}
	return mydata.myxml
})

onMounted(() => {
	var modeler = new BpmnModeler({
		container: canvas.value,
		keyboard: {
			bindTo: window,
		},
	})

	modeler
		.importXML(bpmn.value)
		.then(function (result) {
			const { warnings } = result
			console.log('success !', warnings)
			modeler.attachTo(canvas.value)
		})
		.catch(function (err) {
			const { warnings, message } = err
			console.log('something went wrong:', warnings, message)
		})

	var eventBus: any = modeler.get('eventBus')

	const events = ['element.click']

	const myClick = eventBus.on('element.click', (e: any) => {
		// console.log(e.element.businessObject)
		console.log(e.element)
		if (!!myform.currentBO && e.element.id == myform.currentBO.id) {
			myform.setCurrentBO(null)
			// localStorage.setItem('bo', '')
		} else {
			let tmp = e.element.businessObject
			// localStorage.setItem('bo', JSON.stringify(tmp))
			myform.setCurrentBO(e.element.businessObject)
		}
	})

	// helpers //////////////////////

	function debounce(fn: any, timeout: number) {
		var timer: any
		return function () {
			if (timer) {
				clearTimeout(timer)
			}
			timer = setTimeout(fn, timeout)
		}
	}

	var exportArtifacts = debounce(async function () {
		try {
			console.log('save')
			const { xml } = await modeler.saveXML({ format: false })
			mydata.saveXML(xml)
		} catch (err) {
			console.error('Error happened saving XML: ', err)
			// setEncoded(downloadLink, 'dia.bpmn', null)
		}
	}, 500)

	modeler.on('commandStack.changed', exportArtifacts)

	// events.forEach(function (event) {
	// 	eventBus.on(event, function (e) {
	// 		// e.element = the model element
	// 		// e.gfx = the graphical element
	// 		console.log(e.element)
	// 		console.log(e.element.businessObject.name)
	// 	})
	// })
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
:deep(.bpmn-icon-group) {
	display: none;
}
:deep(.bpmn-icon-data-store) {
	display: none;
}
:deep(.bpmn-icon-data-object) {
	display: none;
}
:deep(.bpmn-icon-subprocess-expanded) {
	display: none;
}
:deep(.bpmn-icon-space-tool) {
	display: none;
}
:deep(.bpmn-icon-lasso-tool) {
	display: none;
}
</style>
