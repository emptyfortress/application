<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import BpmnModeler from 'bpmn-js/lib/Modeler'
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
import empty from '@/stores/simple1.bpmn?raw'
import assist from '@/stores/assist.bpmn?raw'
import 'diagram-js-minimap/assets/diagram-js-minimap.css'

// import { useRouter, useRoute } from 'vue-router'
// import { useStore } from '@/stores/store'
import { useStorage } from '@vueuse/core'
import { useForms } from '@/stores/forms'
import { useData } from '@/stores/alldata'
import { useFlow } from '@/stores/flow'
import { useRoles } from '@/stores/roles'

// const store = useStore()
const myform = useForms()
const mydata = useData()
const myflow = useFlow()
const myrole = useRoles()

// const router = useRouter()
// const route = useRoute()
const canvas = ref()

// const app = useStorage('app', localStorage)

const bpmn = computed(() => {
	if (mydata.myxml == null && mydata.assist == false) {
		return empty
	}
	if (mydata.myxml == null && mydata.assist == true) {
		return assist.replace('Старт', mydata.button)
	}
	return mydata.myxml
})

let modeler = null as any

onMounted(() => {
	modeler = new BpmnModeler({
		container: canvas.value,
		keyboard: {
			bindTo: window,
		},
	})

	modeler
		.importXML(bpmn.value)
		.then(function (result: any) {
			const { warnings } = result
			console.log('success !', warnings)
			modeler.attachTo(canvas.value)
		})
		.catch(function (err: any) {
			const { warnings, message } = err
			console.log('something went wrong:', warnings, message)
		})

	var eventBus: any = modeler.get('eventBus')

	const myClick = eventBus.on('element.click', (e: any) => {
		if (e.element.id == 'Collaboration_00d62mw') {
			const element = modeler.get('selection') // Replace with the desired element
			modeler.get('selection').deselect(element._selectedElements[0])
			myform.setCurrentBO(null)
		}
		if (!!myform.currentBO && e.element.id == myform.currentBO.id) {
			const element = modeler.get('selection') // Replace with the desired element
			modeler.get('selection').deselect(element._selectedElements[0])
			myform.setCurrentBO(null)
		}
		else {
			myform.setCurrentBO(e.element.businessObject)
			myrole.rolesN.map((item) => item.selected = false)
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
			myflow.saveFlow(modeler._definitions.rootElements)
			const { xml } = await modeler.saveXML({ format: false })
			mydata.saveXML(xml)
		} catch (err) {
			console.error('Error happened saving XML: ', err)
		}
	}, 500)

	modeler.on('commandStack.changed', exportArtifacts)

	exportArtifacts()
})

const roles = ref()
const select = ((role: Role) => {
	myrole.rolesN.map(item => item.selected = false)
	role.selected = true
	const element = modeler.get('selection') // Replace with the desired element
	modeler.get('selection').deselect(element._selectedElements[0])
	myform.setCurrentBO(null)
})
</script>

<template lang="pug">
.canvas(ref="canvas")
	.undo
		q-btn(flat round dense color="primary" icon='mdi-undo') 
		q-btn(flat round dense color="primary" icon='mdi-redo') 
	.roles(ref="roles")
		.role(v-for="role in myrole.rolesN" :key="role.id" @click='select(role)' :class="{ selected: role.selected }") {{ role.name }}

</template>

<style scoped lang="scss">
.canvas {
	background: #fff;
	height: var(--panel-height);
	margin-right: 0.25rem;
	background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAAXNSR0IArs4c6QAAADBJREFUGFclioEJADAMwvSl7f8P1pfMaAsiCcT1inOPQJIlkwy3uT8JbmImh2zANh9STBXvibRbIgAAAABJRU5ErkJggg==) repeat;
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

:deep(.bpmn-icon-participant) {
	display: none;
}

.undo {
	position: absolute;
	top: 0;
	right: 0;
}

.roles {
	position: absolute;
	bottom: 1rem;
	left: 6rem;
	display: flex;
	gap: 1rem;
	z-index: 1;

	.role {
		width: 100px;
		height: 100px;
		background: #ccc;

		&.selected {
			background: red;
		}
	}
}
</style>
