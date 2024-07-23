<script setup lang="ts">
import { useStore } from '@/stores/store'
const store = useStore()

const list = [
	{ id: 0, label: 'Все карточки', descr: 'все доступные карточки' },
	{ id: 1, label: 'Список 1', descr: 'здесь описание списка' },
	{ id: 2, label: 'Список 2', descr: 'здесь описание списка' },
	{ id: 3, label: 'Список 3', descr: 'здесь описание списка' },
	{ id: 4, label: 'Список 4', descr: 'здесь описание списка' },
]
</script>

<template lang="pug">
.bl
	.q-mb-md Списки состоят из поисковых запросов и представлений.
	q-list
		q-expansion-item(label='Список 1' icon='mdi-script-text-outline' v-for="item in list" :key='item.id')
			template(v-slot:header)
				q-item-section(avatar)
					q-icon(name='mdi-script-text-outline')
				q-item-section()
					q-item-label {{ item.label }}
				q-item-section()
					q-item-label {{ item.descr }}
				q-item-section(side)
					.row.q-gutter-x-sm
						q-btn(flat round icon="mdi-content-duplicate" color="primary" dense size='sm') 
						q-btn(flat round icon="mdi-trash-can-outline" color="primary" dense size='sm') 
	br
	q-btn(unelevated color="primary" label="Создать список") 
			
</template>

<style scoped lang="scss">
.bl {
	background: #fff;
	height: var(--panel-height);
	padding: 1rem;
	margin-right: 0.25rem;
}
.center {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
