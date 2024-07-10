<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AddFieldDialog from '@/components/AddFieldDialog.vue'

const router = useRouter()
const route = useRoute()

const dialog = ref(false)
</script>

<template lang="pug">
.bl
	.col
		.zag
			h5 Форма "{{ route.params.etap }}"
			q-btn(flat color="primary" label="Выбрать форму из доступных" @click="") 

		q-btn(flat icon="mdi-plus-circle-outline" color="primary" @click="dialog = !dialog" label="Добавить поле") 

AddFieldDialog(v-model="dialog")
</template>

<style scoped lang="scss">
.col {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: start;
	gap: 0.5rem;
}
.zag {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.inp {
	width: 200px;
	background: #dedede;
	padding: 0.5rem;
}
.bl {
	background: #fff;
	height: var(--panel-height);
	padding: 1rem;
	margin-right: 0.5rem;
	position: relative;
}
.q-card {
	height: 100%;
	padding: 1rem;
}
</style>
