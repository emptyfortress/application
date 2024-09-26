<script setup lang="ts">
import { ref } from 'vue'
import { uid } from 'quasar'

const rolename = ref('')

const roles = ref([])
const add = () => {
	if (rolename.value.length > 0) {
		roles.value.push({
			id: uid(),
			name: rolename.value,
			trash: true,
		})
		rolename.value = ''
	}
}
const destroy = (e: number) => {
	roles.value.splice(e, 1)
}
</script>

<template lang="pug">
q-form(@submit='add')
	div Кто наблюдает за процессом? Список включает всех, кто может видеть карточку приложения.
	.no(v-if='roles.length == 0') Наблюдатели не заданы
	q-list.q-mb-md(separator v-else)
		q-item(clickable v-for="(role, index) in roles" :key="role.id")
			q-item-section(avatar)
				q-icon(name="mdi-account" color="primary")
			q-item-section {{ role.name }}
			q-item-section(side v-if='role.trash')
				q-btn(flat round icon="mdi-trash-can-outline" color="primary" @click='destroy(index)') 

	.row.items-center
		q-input(v-model="rolename" label='Наблюдатель' dense outlined bg-color="white")
		q-btn(flat color="primary" label="Добавить" type='submit') 
</template>

<style scoped lang="scss">
.q-list {
	margin-bottom: 1rem;
	max-width: 800px;
}
.q-input {
	width: 300px;
	margin-bottom: 3px;
}
.no {
	color: $negative;
	margin-bottom: 1rem;
}
</style>
