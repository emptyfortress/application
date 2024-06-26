<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import Test from '@/components/icons/Test.vue'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'

gsap.registerPlugin(Flip)

const squares = ref([])

onMounted(() => {
	squares.value = gsap.utils.toArray('.square')
})
onMounted(() => {
	gsap.from('.ani', {
		y: 100,
		opacity: 0,
		stagger: 0.2,
	})
})

const doFlip = () => {
	const state = Flip.getState(squares.value)
	swap(squares.value)
	Flip.from(state, { duration: 1, ease: 'power2.inOut' })
}

const swap = ([a, b]: HTMLElement[]) => {
	a.parentNode?.children[0] === a ? a.parentNode?.appendChild(a) : a.parentNode?.appendChild(b)
}

const expand = ref(false)

const doExpand = () => {
	const state = Flip.getState('.test')
	expand.value = !expand.value
	nextTick(() => {
		Flip.from(state, { duration: 0.5, ease: 'power3.in' })
	})
}
</script>

<template lang="pug">
q-page(padding)
	q-btn(flat round icon="mdi-arrow-left-circle-outline" @click="$router.back" size="lg") 
	h5.ani try
	.fl(@click="doFlip")
		.start.square.ani
		.end.square.ani

	.fuck.ani
		Test.ic
	br
	.test.ani(:class="{full: expand}" @click="doExpand")
</template>

<style scoped lang="scss">
.fl {
	display: flex;
	justify-content: space-between;
}
.start {
	width: 200px;
	height: 200px;
	background: pink;
}
.test {
	width: 200px;
	height: 200px;
	background: pink;

	&.full {
		width: 600px;
	}
}
.end {
	width: 200px;
	height: 200px;
	background: yellow;
}
</style>
