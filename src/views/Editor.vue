<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/stores/store'
import PropertyPanel from '@/components/PropertyPanel.vue'
import VueDraggableResizable from 'vue-draggable-resizable'
import { uid } from 'quasar'

import BpmnModeler from 'bpmn-js/lib/Modeler'
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
import zay from '@/stores/zayavka.bpmn?raw'
import { gsap } from 'gsap'

const props = defineProps({
	id: {
		type: String,
		required: true,
	},
})

const store = useStore()
const route = useRoute()
const router = useRouter()
const split = ref(75)

onMounted(() => {
	gsap.from('.fuck', {
		delay: 0.5,
		x: -600,
		opacity: 0,
		ease: 'expo.out',
	})
})

const canv = ref()

onMounted(() => {
	var modeler = new BpmnModeler({
		container: canv.value,
		keyboard: {
			bindTo: window,
		},
	})

	modeler
		.importXML(zay)
		.then(function (result) {
			const { warnings } = result
			console.log('success !', warnings)
			modeler.attachTo(canv.value)
		})
		.catch(function (err) {
			const { warnings, message } = err
			console.log('something went wrong:', warnings, message)
		})

	// if (store.currentNode == null) {
	// 	store.setCurrentNode({
	// 		data: {
	// 			id: uid(),
	// 			text: 'Заявка',
	// 			text1: 'Описание',
	// 			selected: false,
	// 			type: 1,
	// 		},
	// 	})
	// }
})
</script>

<template lang="pug">
q-page
	q-splitter.split(v-model="split" :limits="[50, 100]")
		template(v-slot:before)
			router-view
		template(v-slot:after)
			PropertyPanel

	Teleport(to="body")
		vue-draggable-resizable.fuck(:x="100" :y="-300" :w="100" :h="100" :active="false" :z="2000")
			q-card
				.canv(ref="canv")
			
</template>

<style scoped lang="scss">
.split {
	height: var(--panel-height);
}
.q-page {
	padding-right: 1rem;
}
.q-card {
	height: 100%;
	padding: 1rem;
}
h6 {
	color: $primary;
}
span {
	cursor: pointer;
	&:hover {
		text-decoration: underline;
	}
}
.canv {
	width: 100%;
	height: 100%;
	background: #fff;
}
:deep(.canv .djs-palette) {
	display: none;
}
</style>
