<script setup lang="ts">
import { ref } from 'vue'
import { uid } from 'quasar'
import { useRoles } from '@/stores/roles'
import StepRole2 from '@/components/StepRole2.vue'

const props = defineProps({
	app: {
		type: String,
	}
})
const rolename = ref('')
const input1 = ref()

const myrole = useRoles()

const add = () => {
	if (rolename.value.length > 0) {
		myrole.addTemp({
			id: uid(),
			name: rolename.value,
			trash: true,
		})
		rolename.value = ''
		input1.value.focus()
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
.twocol
	q-form(@submit='add')
		br
		q-markup-table(flat bordered)
			thead
				tr
					th.text-left Участники <span class="q-ml-lg">(принимают участие в процессе)</span>
					th
			tbody
				tr(v-for="(role, index) in myrole.tempRoles" :key="role.id")
					td
						span {{ role.name }}
					td.text-right
						q-btn(v-if='role.trash' flat round icon="mdi-close" color="primary" @click='destroy(index)' size='sm') 

		.row.items-center.q-mt-md
			q-input(ref='input1' v-model="rolename" autofocus label='Участник процесса' dense outlined bg-color="white")
			q-btn(flat color="primary" label="Добавить" type='submit') 

	div
		StepRole2(:app='props.app')

q-stepper-navigation
	q-btn(@click="nexxt" color="primary" label="Далее")
</template>

<style scoped lang="scss">
.twocol {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	justify-items: start;
	column-gap: 1rem;
	row-gap: 0.5rem;
}

.q-list {
	margin-bottom: 1rem;
	max-width: 800px;
}

.q-input {
	width: 300px;
	margin-bottom: 3px;
}

.hd {
	font-weight: 600;
	text-align: center;
}

.q-table thead tr {
	height: 28px;
}
</style>
