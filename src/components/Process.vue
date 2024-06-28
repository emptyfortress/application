<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useStore } from '@/stores/store'

const store = useStore()

const router = useRouter()
const route = useRoute()

const goto = () => {
	store.setEtap('Консолидация')
	router.push('/editor/etap')
}
</script>

<template lang="pug">
.grid
	.bl.center
		.etap(@click="goto") Консолидация
	.bl.right Свойства
</template>

<style scoped lang="scss">
.grid {
	display: grid;
	grid-template-columns: 1fr 300px;
	align-items: start;
	column-gap: 1rem;
	row-gap: 0.5rem;
}
.bl {
	background: #fff;
	height: calc(100vh - 175px);
	padding: 1rem;
}
.center {
	display: flex;
	justify-content: center;
	align-items: center;
}
.etap {
	// width: 100px;
	// height: 100px;
	border: 2px solid #333;
	padding: 1rem;
	border-radius: 1rem;
	cursor: pointer;
	&:hover {
		background: #dedede;
	}
}
.item {
	display: block;
	padding: 1rem;
	text-decoration: none;
	background: #fff;
	color: $secondary;
	margin-bottom: 0.5rem;
}
.router-link-active {
	background: $primary;
	color: #fff;
}
</style>
