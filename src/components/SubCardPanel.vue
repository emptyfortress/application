<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/stores/store'

const store = useStore()
const tabs = ref('main')
const temp = ref('')
</script>

<template lang="pug">
q-tabs(v-model="tabs" dense active-color="primary" align="left")
	q-tab(name="main" label="Свойства")
	q-tab(name="field" label="Поля")
	q-tab(name="role" label="Роли")

.panel
	q-tab-panels(v-model="tabs" animated)
		q-tab-panel(name="main")
			template(v-if="store.currentField == null")
				div Название формы
				q-input(v-model="store.formName" dense filled)
				br
				div Правила выбора
				div Другие свойства

			template(v-else)
				div Поле
				q-input(v-model="tmp" dense filled)


		q-tab-panel(name="field")
			div Список доступных полей (таскаем нужные на форму)
				div(v-for="n in 10" draggable="true") Поле {{ n }}

		q-tab-panel(name="role")
			div Здесь роли для выбранной разметки ?
			div Список ролей (таскаем на выбранную разметку)
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
</style>
