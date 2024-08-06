<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from '@/stores/store'
import { requests } from '@/stores/tree'
import CreateDialog from '@/components/CreateDialog.vue'

const props = defineProps({
	id: {
		type: String,
		required: true,
	},
})

const router = useRouter()
const route = useRoute()

const store = useStore()

const request = (e: string) => {
	router.push(`/${props.id}/editor/lists/${e}/request`)
}
const view = (e: string) => {
	router.push(`/${props.id}/editor/lists/${e}/view`)
}

const dialog = ref(false)
</script>

<template lang="pug">
.bl
	h5 Списки
	q-list(separator)
		q-expansion-item(icon='mdi-script-text-outline' v-for='item in requests' :key='item.id')
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
				q-btn(unelevated color='primary' label='Редактировать запрос' @click='request(item.label)' size='sm') 
				q-btn(unelevated color='primary' label='Редактировать представление' @click='view(item.label)' size='sm') 
	br
	q-btn.q-ml-md(unelevated color='primary' label='Создать список' @click='dialog = !dialog') 

CreateDialog(v-model="dialog" mode='list')
</template>

<style scoped lang="scss">
.center {
	display: flex;
	justify-content: center;
	align-items: center;
}
:deep(.q-expansion-item--expanded .q-expansion-item__container) {
	border: 1px solid $primary;
	margin-bottom: 1rem;
}
</style>
