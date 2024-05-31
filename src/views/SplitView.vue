<script setup lang="ts">
import { ref } from 'vue'
import ProcessTab from '@/components/ProcessTab.vue'
import PropertyPanel from '@/components/PropertyPanel.vue'
import RolePanel from '@/components/RolePanel.vue'
import RoleTab from '@/components/RoleTab.vue'
import { useStore } from '@/stores/store'

const props = defineProps({
	id: {
		type: String,
		default: 'test',
	},
})

const store = useStore()
const split = ref(70)
</script>

<template lang="pug">
q-page
	.grid
		div
			h4 {{ props.id}}
			.text-subtitle1(v-if="props.id == 'Заявка'") Простая заявка
		.bl
			.text-overline version
			.big
				q-icon(name="mdi-source-branch" color="primary")
				span.q-ml-sm v. 0.1.0
					q-menu
						q-list
							q-item(clickable)
								q-item-section v.0.2.0
							q-item(clickable)
								q-item-section v.1.1.0

		.q-gutter-x-sm
			q-btn(flat  round icon="mdi-pencil" color="primary" @click="") 
				q-tooltip Редактировать
			q-btn(flat  round icon="mdi-content-duplicate" color="primary" @click="") 
				q-tooltip Дублировать
			q-btn(unelevated color="negative" label="Удалить приложение" @click="") 
			
	


	q-splitter(v-model="split")
		template(v-slot:before)

			q-tabs(v-model="store.tabs" inline-label active-color="primary" align="left" dense)
				q-tab(name="process" icon="mdi-shuffle-variant" label="Процессы")
				q-tab(name="role" icon="mdi-drama-masks" label="Роли")
				q-tab(name="card" icon="mdi-card-bulleted-outline" label="Карточки")
				q-tab(name="list" icon="mdi-invoice-list-outline" label="Реестры")

			q-tab-panels(v-model="store.tabs" vertical animated transition-prev="jump-up" transition-next="jump-up")
				q-tab-panel(name="process")
					ProcessTab
				q-tab-panel(name="role")
					RoleTab
				q-tab-panel(name="card")
					q-img(src="@/assets/img/card.png" width="80%")
				q-tab-panel(name="list") list

		template(v-slot:after)
			transition(name="page1")
				div(v-if="store.tabs == 'process'")
					PropertyPanel
			transition(name="page1")
				div(v-if="store.tabs == 'role'")
					RolePanel
			transition(name="page1")
				div(v-if="store.tabs == 'card'")
					RolePanel


</template>

<style scoped lang="scss">
.q-splitter {
	margin-top: 1rem;
	height: calc(100vh - 160px);
}
.grid {
	display: grid;
	grid-template-columns: 2fr 1fr auto;
	align-items: center;
	column-gap: 1rem;
	row-gap: 0.5rem;
}
.big {
	font-size: 1.2rem;
	color: $primary;
	cursor: pointer;
}
.text-overline {
	line-height: 1;
}
.podzag {
	font-size: 1.1rem;
	margin-bottom: 1rem;
	margin-top: 3rem;
	transition: 0.2s ease all;
	&.expand {
		margin-top: 0;
	}
}
.q-tabs {
	border-bottom: 1px solid #ccc;
}
:deep(.q-tab-panels) {
	height: calc(100vh - 200px);
	background: transparent;
}
:deep(.q-tab-panel) {
	padding: 0;
}
</style>
