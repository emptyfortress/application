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
	store.setPage(route.params.id.toString())
	router.push('/subcard')
}
const prop1 = ref('')
const prop2 = ref('')

const isFormVisible = ref(false)
</script>

<template lang="pug">
q-tabs(v-model="tabs" dense active-color="primary" align="left")
	q-tab(name="main" label="Свойства")
	q-tab(name="sec" label="Дополнительно")


.panel
	q-tab-panels(v-model="tabs" animated)
		q-tab-panel(name="main")
			// pre {{ store.current}}
			template(v-if="store.current.type == 'bpmn:Process'")
				div Ничего не выбрано.
			template(v-else)
				.form
					.label Название:
					q-input.val(v-model="store.current.name" dense filled)
					.label Свойство 1:
					q-input.val(v-model="prop1" dense filled)
					.label Свойство 2:
					q-input.val(v-model="prop2" dense filled)

			template(v-if="store.current.type == 'bpmn:Task'")
				br
				div Что видит пользователь?
				.vie(@click="isFormVisible = true") Настроить


		q-tab-panel(name="sec") sec

	EditFormDialog(v-model="isFormVisible")
</template>

<style scoped lang="scss">
.q-tabs {
	margin: 0 6px;
}
.panel {
	box-sizing: border-box;
	margin: 0 6px 6px 6px;
	background: #fff;
	height: calc(100vh - 202px);
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
