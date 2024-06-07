<script setup lang="ts">
import { ref, computed, onMounted, reactive, nextTick } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'

gsap.registerPlugin(Flip)

const content = ref<HTMLElement | null>(null)

const pages = [
	{ id: '0', name: 'Процесс', icon: 'shuffle' },
	{ id: '1', name: 'Формы', icon: 'subject' },
	{ id: '2', name: 'Роли', icon: 'user' },
	{ id: '3', name: 'Списки', icon: 'sheet' },
]

let dogs = ref([])
let bigDog = ref(null)

onMounted(() => {
	dogs.value = gsap.utils.toArray('.item')
	bigDog.value = dogs.value[0]

	dogs.value.forEach((dog) => {
		dog.addEventListener('click', (e) => changeGrid(dog))
	})
})

const changeGrid = (dog: any) => {
	if (dog == bigDog.value) return

	let state = Flip.getState(dogs.value)

	bigDog.value.dataset.grid = dog.dataset.grid
	dog.dataset.grid = '0'
	bigDog.value = dog

	Flip.from(state, {
		absolute: true,
		ease: 'power1.inOut',
	})
}
</script>

<template lang="pug">
.parent(ref="content")
	.item(v-for="(page, index) in pages" :key="page.id" :data-grid="page.id")
		.txt {{ page.name }}
		SvgIcon.icon(:name="page.icon")

</template>

<style scoped lang="scss">
.parent {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(4, 1fr);
	grid-column-gap: 0.5rem;
	grid-row-gap: 0.5rem;
	height: 65vh;
	width: 100%;
	aspect-ratio: 1;
}

.item[data-grid='0'] {
	grid-area: 1 / 1 / 4 / 4;
}
.item[data-grid='1'] {
	grid-area: 4 / 1 / 5 / 2;
}
.item[data-grid='2'] {
	grid-area: 4 / 2 / 5 / 3;
}
.item[data-grid='3'] {
	grid-area: 4 / 3 / 5 / 4;
}

.item {
	cursor: pointer;
	background-color: white;
	padding: 1rem;
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
	text-align: center;
	text-transform: uppercase;
}
</style>
