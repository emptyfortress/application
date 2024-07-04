<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/stores/store'
import PropertyPanel from '@/components/PropertyPanel.vue'
import VueDraggableResizable from 'vue-draggable-resizable'
import { gsap } from 'gsap'

const store = useStore()
const route = useRoute()
const router = useRouter()
const split = ref(80)

// const go = (e: number) => {
// 	if (e == 1) router.push(`/${store.app.title}`)
// 	if (e == 2 && store.etap) {
// 		router.back()
// 		store.setEtap(null)
// 	} else return
// }

// onMounted(() => {
// 	gsap.from('.fuck', {
// 		delay: 0.5,
// 		x: -600,
// 		opacity: 0,
// 		ease: 'expo.out',
// 	})
// })
</script>

<template lang="pug">
q-page
	q-splitter.split(v-model="split")
		template(v-slot:before)
			router-view
		template(v-slot:after)
			PropertyPanel

Teleport(to="body")
	vue-draggable-resizable.fuck(:x="100" :y="-300" :w="200" :h="150" :active="false" :z="2000")
		q-card
			p Minimap
</template>

<style scoped lang="scss">
.split {
	height: var(--panel-height);
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
</style>
