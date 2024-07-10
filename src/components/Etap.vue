<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
</script>

<template lang="pug">
.bl
	.col
		.zag
			h5 Форма "{{ route.params.etap }}"
			q-btn(flat color="primary" label="Выбрать форму из доступных" @click="") 

		q-btn(flat icon="mdi-plus-circle-outline" color="primary" @click="" label="Добавить поле") 

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
	height: calc(100vh - 150px);
	padding: 1rem;
	margin-right: 0.5rem;
	position: relative;
}
.q-card {
	height: 100%;
	padding: 1rem;
}
</style>
