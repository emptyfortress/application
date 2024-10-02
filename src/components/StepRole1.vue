<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { uid } from 'quasar'
import { useRoles } from '@/stores/roles'

const rolename = ref('')
const input = ref()

const myrole = useRoles()
// const roles = ref([{ id: 'ini', name: 'Инициатор (системная)', trash: false }])

const add = () => {
	if (rolename.value.length > 0) {
		myrole.addTemp({
			id: uid(),
			name: rolename.value,
			trash: true,
		})
		rolename.value = ''
		input.value.focus()
	}
}
const destroy = (e: number) => {
	myrole.destroyTemp(e)
}

const emit = defineEmits(['next'])

const nexxt = () => {
	add()
	emit('next')
}
</script>

<template lang="pug">
q-form(@submit='add')
	// div Кто участвует в процессе? Список должен включать только непосредственных участников.
	div В приложении в виде схемы будет определен процесс, согласно которому к работе будут подключаться следующие участники (роли):
	q-list.q-mb-md(separator)
		q-item(clickable v-for="(role, index) in myrole.tempRoles" :key="role.id")
			q-item-section(avatar)
				q-icon(name="mdi-account" color="primary")
			q-item-section {{ role.name }}
			q-item-section(side v-if='role.trash')
				q-btn(flat round icon="mdi-trash-can-outline" color="primary" @click='destroy(index)') 

	.row.items-center
		q-input(ref='input' v-model="rolename" autofocus label='Участник процесса' dense outlined bg-color="white")
		q-btn(flat color="primary" label="Добавить" type='submit') 

q-stepper-navigation
	q-btn(@click="nexxt" color="primary" label="Далее")
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
