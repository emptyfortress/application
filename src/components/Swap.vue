<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import { templateRef } from '@vueuse/core'

gsap.registerPlugin(Flip)

// const content = templateRef<null | HTMLElement>('content')
// const dogs = templateRef<null | HTMLElement>('items')
const content = ref()
const items = ref()

const pages = [
	{ id: '0', name: 'Процесс', icon: 'shuffle' },
	{ id: '1', name: 'Формы', icon: 'subject' },
	{ id: '2', name: 'Роли', icon: 'user' },
	{ id: '3', name: 'Списки', icon: 'sheet' },
]

let bigItem = ref()

onMounted(() => {
	bigItem.value = items.value[0]
})

const changeGrid = (e: number) => {
	let item = items.value[e]
	if (item == bigItem.value) return

	let state = Flip.getState(items.value)

	bigItem.value.dataset.grid = item.dataset.grid
	item.dataset.grid = '0'
	bigItem.value = item

	Flip.from(state, {
		absolute: true,
		ease: 'power1.inOut',
	})
}
</script>

<template lang="pug">
.parent(ref="content")
	.item(v-for="(page, index) in pages" :key="page.id" :data-grid="page.id" @click="changeGrid(index)" ref="items")
		.txt {{ page.name }}
		SvgIcon.icon(:name="page.icon")
	.item(data-grid="4")

</template>

<style scoped lang="scss">
.parent {
	display: grid;
	height: 700px;
	grid-template-columns: 150px 1fr 250px;
	grid-template-rows: repeat(3, 100px);
	grid-column-gap: 1rem;
	grid-row-gap: 1rem;
}

.item[data-grid='0'] {
	grid-area: 1 / 2 / 4 / 3;
}
.item[data-grid='1'] {
	grid-area: 1 / 1 / 2 / 2;
}
.item[data-grid='2'] {
	grid-area: 2 / 1 / 3 / 2;
}
.item[data-grid='3'] {
	grid-area: 3 / 1 / 4 / 2;
}
.item[data-grid='4'] {
	grid-area: 1 / 3 / 4 / 4;
}

.item {
	cursor: pointer;
	background-color: white;
	padding: 0.5rem;
	position: relative;
	color: $secondary;
	border: 1px solid white;
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
.txt {
	text-align: left;
	text-transform: uppercase;
}
</style>
