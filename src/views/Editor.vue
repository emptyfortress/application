<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/stores/store'
import PropertyPanel from '@/components/PropertyPanel.vue'
import VueDraggableResizable from 'vue-draggable-resizable'
import { uid } from 'quasar'

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
const split = ref(70)

onMounted(() => {
	gsap.from('.fuck', {
		delay: 0.5,
		x: -600,
		opacity: 0,
		ease: 'expo.out',
	})
})
</script>

<template lang="pug">
q-page
	q-splitter.split(v-model="split" :limits="[10, 100]")
		template(v-slot:before)
			router-view
		template(v-slot:after)
			PropertyPanel

	Teleport(to="body")
		vue-draggable-resizable.fuck(:x="100" :y="-300" :w="250" :h="150" :active="false" :z="2000" :handles='["br"]' drag-handle='.bar')
			q-card
				.bar Навигация
				q-img(src='@/assets/img/preview.png')
			
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
	overflow: hidden;
}
.bar {
	height: 26px;
	background: #dedede;
	text-align: center;
	font-size: 0.9rem;
	line-height: 26px;
}
.fuck {
	border: 1px solid #aaa;
}
</style>
