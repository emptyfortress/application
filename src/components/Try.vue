<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Test from '@/components/icons/Test.vue'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'

gsap.registerPlugin(Flip)

const squares = ref([])

onMounted(() => {
	squares.value = gsap.utils.toArray('.square')
	console.log(squares)
})

const doFlip = () => {
	const state = Flip.getState(squares.value)
	swap(squares.value)
	Flip.from(state, { duration: 1, ease: 'power1.inOut' })
}

function swap([a, b]) {
	a.parentNode.children[0] === a ? a.parentNode.appendChild(a) : a.parentNode.appendChild(b)
}
const fuck = () => {
	doFlip()
}
</script>

<template lang="pug">
q-page(padding)
	h5 try
	.fl(@click="fuck")
		.start.square(@click="doFlip")
		.end.square

	.fuck
		Test.ic
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
.end {
	width: 200px;
	height: 200px;
	background: yellow;
}
</style>
