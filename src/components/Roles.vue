<script setup lang="ts">
// import { useStore } from '@/stores/store'
// const store = useStore()
const roles = [
	{ id: 0, label: 'Роль 1' },
	{ id: 1, label: 'Роль 2' },
	{ id: 2, label: 'Роль 3' },
	{ id: 3, label: 'Роль 4' },
	{ id: 4, label: 'Роль 5' },
]
</script>

<template lang="pug">
.grid
	.bl
		q-list(separator)
			q-item(clickable v-for="role in roles" :key="role.id" to="/editor/etap")
				q-item-section(avatar)
					q-icon(name="mdi-account-circle-outline")
				q-item-section {{ role.label }}
				q-item-section(side)
				q-btn(flat round dense icon="mdi-trash-can-outline" @click="" size="sm") 

		br
		q-btn(unelevated color="primary" label="Создать роль" @click="") 

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
</style>
