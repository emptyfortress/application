<script setup lang="ts">
// import { useStore } from '@/stores/store'
// const store = useStore()

const forms = [
	{ id: 0, label: 'Форма 1' },
	{ id: 1, label: 'Форма 2' },
	{ id: 2, label: 'Форма 3' },
	{ id: 3, label: 'Форма 4' },
	{ id: 4, label: 'Форма 5' },
]
</script>

<template lang="pug">
.grid
	.bl
		q-list(separator)
			q-item(clickable v-for="form in forms" :key="form.id" to="/editor/etap")
				q-item-section(avatar)
					q-icon(name="mdi-list-box-outline")
				q-item-section {{ form.label }}
				q-item-section
					.row.items-center.q-gutter-x-sm
						q-icon(name="mdi-shuffle-variant" size="sm")
						span Этап {{ form.id + 1 }}
				q-item-section(side)
				q-btn(flat round dense icon="mdi-trash-can-outline" @click="" size="sm") 

		br
		q-btn(unelevated color="primary" label="Создать форму" @click="") 

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
