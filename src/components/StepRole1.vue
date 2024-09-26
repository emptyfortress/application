<script setup lang="ts">
import { ref } from 'vue'
import { uid } from 'quasar'

const rolename = ref('')
const input = ref()

const roles = ref([{ id: 'ini', name: 'Инициатор (встроенная)', trash: false }])
const add = () => {
	if (rolename.value.length > 0) {
		roles.value.push({
			id: uid(),
			name: rolename.value,
			trash: true,
		})
		rolename.value = ''
		input.value.focus()
	}
}
const destroy = (e: number) => {
	roles.value.splice(e, 1)
}
</script>

<template lang="pug">
q-form(@submit='add')
	div Кто участвует в процессе? Список должен включать только непосредственных участников.
	q-list.q-mb-md(separator)
		q-item(clickable v-for="(role, index) in roles" :key="role.id")
			q-item-section(avatar)
				q-icon(name="mdi-account" color="primary")
			q-item-section {{ role.name }}
			q-item-section(side v-if='role.trash')
				q-btn(flat round icon="mdi-trash-can-outline" color="primary" @click='destroy(index)') 

	.row.items-center
		q-input(ref='input' v-model="rolename" autofocus label='Участник процесса' dense outlined bg-color="white")
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
</style>
