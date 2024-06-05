<script setup lang="ts">
import { ref } from 'vue'

const cards = ref([
	{
		id: 1,
		name: 'Форма 1',
		icon: 1,
	},
	{
		id: 2,
		name: 'Форма 2',
		icon: 2,
	},
])
</script>

<template lang="pug">
.cards
	.card(v-for="(item, index) in cards" :key="item.id")

		.label {{ item.name }}

		q-card-actions.q-mt-md.full-width
			q-btn(flat round icon="mdi-pencil" color="primary" @click="" size="sm") 
			q-space
			q-btn(flat round icon="mdi-trash-can-outline" color="primary" @click="remove(index)" size="sm") 
</template>

<style scoped lang="scss">
.cards {
	display: flex;
	gap: 0.5rem;
	justify-content: flex-start;
	align-items: center;
}
.card {
	background: #fff;
	padding: 1rem;
	border: 1px solid #ccc;
	display: flex;
	width: 160px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
</style>
