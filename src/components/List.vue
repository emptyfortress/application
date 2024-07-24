<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useStore } from '@/stores/store'

const props = defineProps({
	id: {
		type: String,
		required: true,
	},
})

const router = useRouter()
const route = useRoute()

const store = useStore()

const list = [
	{ id: 0, label: 'Все карточки', descr: 'все доступные карточки' },
	{ id: 1, label: 'Список 1', descr: 'здесь описание списка' },
	{ id: 2, label: 'Список 2', descr: 'здесь описание списка' },
	{ id: 3, label: 'Список 3', descr: 'здесь описание списка' },
	{ id: 4, label: 'Список 4', descr: 'здесь описание списка' },
]

const request = (e: string) => {
	router.push(`/${props.id}/editor/lists/${e}/request`)
}
const view = () => {
	router.push('/view')
}
</script>

<template lang="pug">
.bl
	q-list()
		q-expansion-item(icon='mdi-script-text-outline' v-for='item in list' :key='item.id' popup)
			template(v-slot:header)
				q-item-section(avatar)
					q-icon(name='mdi-script-text-outline')
				q-item-section()
					q-item-label {{ item.label }}
				q-item-section()
					q-item-label {{ item.descr }}
				q-item-section(side)
					.row.q-gutter-x-sm
						q-btn(flat round icon='mdi-content-duplicate' color='primary' dense size='sm') 
						q-btn(flat round icon='mdi-trash-can-outline' color='primary' dense size='sm') 
			.q-ma-md Lorem ipsum dolor sit amet consectetur adipisicing elit. At voluptatibus maxime, iure quam, doloremque esse fuga officiis ea porro totam dolor, blanditiis ipsum facere nulla quisquam! Quibusdam totam quis autem.
			q-card-actions
				q-btn(unelevated color='blue-grey-4' label='Редактировать запрос' @click='request(item.label)' size='sm') 
				q-btn(unelevated color='blue-grey-4' label='Редактировать представление' @click='view' size='sm') 
	br
	q-btn.q-ml-md(unelevated color='primary' label='Создать список') 
			
</template>

<style scoped lang="scss">
.center {
	display: flex;
	justify-content: center;
	align-items: center;
}
:deep(.q-expansion-item--expanded .q-expansion-item__container) {
	border: 1px solid $primary;
}
</style>
