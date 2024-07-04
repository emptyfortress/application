<script setup lang="ts">
import { useStore } from '@/stores/store'
const store = useStore()

const forms = [
	{ id: 0, label: 'Форма 1' },
	{ id: 1, label: 'Форма 2' },
	{ id: 2, label: 'Форма 3' },
	{ id: 3, label: 'Форма 4' },
	{ id: 4, label: 'Форма 5' },
]
</script>

<template lang="pug">
.bl
	q-list(separator)
		q-item(clickable v-for="form in forms" :key="form.id" to="/editor/etap" @click="store.setEtap(form.label)")
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

</template>

<style scoped lang="scss">
.bl {
	background: #fff;
	height: var(--panel-height);
	padding: 1rem;
	margin-right: 0.25rem;
}
</style>
