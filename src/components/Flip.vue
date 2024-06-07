<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { gsap } from 'gsap'

const content = ref(null)

const pages = [
	{ id: 0, name: 'Процесс', icon: 'shuffle' },
	{ id: 1, name: 'Формы', icon: 'subject' },
	{ id: 2, name: 'Роли', icon: 'user' },
	{ id: 3, name: 'Списки', icon: 'sheet' },
]

onMounted(() => {
	gsap.from(content.value.children, {
		y: +100,
		duration: 0.5,
		delay: 0.3,
		autoAlpha: 0,
		stagger: 0.1,
		ease: 'back.out(1.7)',
	})

	// tl = gsap.timeline({ paused: true })
	// tl.to(content.value.children, {
	// 	scale: 1.1,
	// 	duration: 0.2,
	// 	ease: 'bounce',
	// })
})

const hover = () => {}
</script>

<template lang="pug">
.grido(ref="content")
	.item(v-for="(page, index) in pages" :key="page.id" @mouseover="hover")
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
			color: $primary;
			border: 1px solid $secondary;
		}
	}
}

.txt {
	text-align: center;
	text-transform: uppercase;
}
</style>
