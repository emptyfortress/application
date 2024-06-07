<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { gsap } from 'gsap'

const content = ref<HTMLElement | null>(null)

const pages = reactive([
	{ id: 0, expanded: false, name: 'Процесс', icon: 'shuffle' },
	{ id: 1, expanded: false, name: 'Формы', icon: 'subject' },
	{ id: 2, expanded: false, name: 'Роли', icon: 'user' },
	{ id: 3, expanded: false, name: 'Списки', icon: 'sheet' },
])

onMounted(() => {
	gsap.from(content.value!.children, {
		y: +100,
		duration: 0.5,
		delay: 0.3,
		autoAlpha: 0,
		stagger: 0.1,
		ease: 'back.out(1.7)',
	})
})

const doFlip = (e: App) => {
	pages.map((el) => (el.expanded = false))
	e.expanded = true
}
</script>

<template lang="pug">
.grido(ref="content")
	.item(v-for="(page, index) in pages" :key="page.id" @click="doFlip(page)" :class="{expand: page.expanded}")
		.txt {{ page.name }}
		SvgIcon.icon(:name="page.icon")

</template>

<style scoped lang="scss">
.grido {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr;
	gap: 0.5rem;
}

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
	&.expand {
		grid-column: 1/-1;
		grid-row: 1/2;
	}
}
.txt {
	text-align: center;
	text-transform: uppercase;
}
</style>
