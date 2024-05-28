<script setup lang="ts">
import { ref, computed } from 'vue'

const roles = ref([
	{
		id: 1,
		name: 'Инициатор',
		icon: 1,
	},
	{
		id: 2,
		name: 'Руководитель',
		icon: 2,
	},
	{
		id: 3,
		name: 'Рассматривающий',
		icon: 3,
	},
	{
		id: 4,
		name: 'Исполнитель',
		icon: 4,
	},
])
const selected = ref(0)

const calcClass = (id: number) => {
	return selected.value == id ? 'selected' : ''
}
const select = (id: number) => {
	selected.value = id
}
</script>

<template lang="pug">
.roles
	.role(v-for="(item, index) in roles" :key="item.id" :class="calcClass(item.id)" @click="select(item.id)")
			q-avatar(color="blue-4" size="64px")
				img(:src="`/user${item.icon}.svg`")
			.label {{ item.name }}

</template>

<style scoped lang="scss">
.panel {
	display: flex;
	padding: 2rem;
}
.roles {
	padding: 2rem;
	display: flex;
	gap: 0.5rem;
	justify-content: flex-start;
	align-items: center;
}
.role {
	padding: 1rem;
	border: 1px solid transparent;
	width: 160px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	&:hover {
		border: 1px solid $primary;
	}
	&.selected {
		border: 1px solid $primary;
		background: #fff;
	}
}
</style>
