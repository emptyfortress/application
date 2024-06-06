<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { gsap } from 'gsap'

const big = ref(false)

const toggle = () => {
	big.value = !big.value
}
const full = ref(false)

const active = ref(0)

const emit = defineEmits(['active', 'inactive'])

const expand = (e: number) => {
	if (active.value == e) {
		active.value = 0
		full.value = false
		emit('inactive')
	} else {
		full.value = true
		active.value = e
		emit('active')
	}
}

const pages = [
	{ id: 0, name: 'Процесс', icon: 'shuffle' },
	{ id: 1, name: 'Формы', icon: 'subject' },
	{ id: 2, name: 'Роли', icon: 'user' },
	{ id: 3, name: 'Списки', icon: 'sheet' },
]

const onBeforeEnter = (el) => {
	el.style.opacity = 0
	el.style.transfrom = 'translateY(100px)'
}

const onEnter = (el, done) => {
	gsap.to(el, {
		opacity: 1,
		y: 0,
		duration: 0.8,
		onComplete: done,
	})
}
onMounted(() => {
	nextTick()
	gsap.fromTo(
		'.item',
		{
			opacity: 0,
			y: 100,
		},
		{
			duration: 0.6,
			opacity: 1,
			y: 0,
			delay: 0.1,
			stagger: 0.2,
			ease: 'expo.out',
		}
	)
})
</script>

<template lang="pug">
.grido
	.item(v-for="(page, index) in pages" :key="page.id" :data-index="index")
		.txt {{ page.name }}
		SvgIcon.icon(:name="page.icon")

</template>

<style scoped lang="scss">
.grido {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	gap: 0.5rem;
	.item {
		cursor: pointer;
		background-color: white;
		padding: 1rem;
		height: 200px;
		position: relative;
		color: $secondary;
		.icon {
			position: absolute;
			bottom: 1rem;
			left: 1rem;
		}
		&:hover {
			border: 1px solid #ccc;
			box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
			color: $primary;
		}
	}
}

.txt {
	text-align: center;
	text-transform: uppercase;
}
</style>
