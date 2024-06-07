<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { gsap } from 'gsap'

const pages = [
	{ id: 0, name: 'Процесс', icon: 'shuffle' },
	{ id: 1, name: 'Формы', icon: 'subject' },
	{ id: 2, name: 'Роли', icon: 'user' },
	{ id: 3, name: 'Списки', icon: 'sheet' },
]

onMounted(() => {
	nextTick()
	gsap.from('.item', {
		opacity: 0,
		y: 100,
		duration: 0.5,
		delay: 0.1,
		stagger: 0.1,
		ease: 'slow',
	})
})
</script>

<template lang="pug">
.grido
	.item(v-for="(page, index) in pages" :key="page.id")
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
