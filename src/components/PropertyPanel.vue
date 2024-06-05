<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useStore } from '@/stores/store'
import { useRouter, useRoute } from 'vue-router'
import EditFormDialog from '@/components/EditFormDialog.vue'

const store = useStore()
const tabs = ref('main')

const router = useRouter()
const route = useRoute()

const goto = () => {
	// store.setPage(route.params.id.toString())
	router.push(`/split/${store.page}/form`)
}
const prop1 = ref('')
const prop2 = ref('')

const isFormVisible = ref(false)
console.log(route)
</script>

<template lang="pug">
.panel
	template(v-if="route.name == 'process' ")
		.form
			.label Название:
			q-input.val(v-model="store.current.name" dense filled)
			.label Свойство 1:
			q-input.val(v-model="prop1" dense filled)
			.label Свойство 2:
			q-input.val(v-model="prop2" dense filled)

		br
		div Что видит пользователь?
		.vie(@click="goto") Настроить

	template(v-if="route.name == 'form' && store.currentField == null")
		.text-h6 {{ store.formName }}
		div Настройки формы 1
		div Настройки формы 2
	template(v-if="route.name == 'form' && store.currentField !== null")
		.text-h6  {{ store.currentField.name }}
		div Настройка 1 {{ store.currentField.name }}
		div Настройка 2 {{ store.currentField.name }}



	EditFormDialog(v-model="isFormVisible")
</template>

<style scoped lang="scss">
.q-tabs {
	margin: 0 6px;
}
.panel {
	box-sizing: border-box;
	padding: 1rem;
	background: #fff;
	height: 100%;
	box-shadow: var(--panel-shadow);
}
:deep(.q-tab-panels) {
	background: transparent;
	padding: 1rem;
}
.form {
	display: grid;
	width: 100%;
	grid-template-columns: auto 1fr;
	justify-items: start;
	align-items: center;
	column-gap: 1rem;
	row-gap: 0.5rem;
}
.val {
	width: 100%;
}
.vie {
	background: #eee;
	min-height: 200px;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	color: $primary;
}
</style>
