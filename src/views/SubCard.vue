<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useStore } from '@/stores/store'
import SubCardPanel from '@/components/SubCardPanel.vue'
import VueDraggableResizable from 'vue-draggable-resizable'
import SvgIcon from '@/components/SvgIcon.vue'
import { uid } from 'quasar'
import EditFormComp from '@/components/EditFormComp.vue'

const store = useStore()
const split = ref(70)

const tabs = ref('main')

const slide = ref(1)
const frm = ref()

const editMode = ref(false)
const prev = computed(() => {
	return '/split/' + store.page
})
const drag = ref(false)
</script>

<template lang="pug">
q-page
	q-breadcrumbs
		template(v-slot:separator)
			q-icon(name="mdi-arrow-right" color="primary")

		q-breadcrumbs-el(:to="prev" icon="mdi-arrow-left-circle-outline" label="Назад")


		q-breadcrumbs-el(to="/subcard1" :label="store.page")
			// SvgIcon(name="process")
			// q-item-label {{ store.page }}
		q-breadcrumbs-el.cursor-pointer
			// SvgIcon.item(name="rect")
			q-item-label {{ store.current.name }}
			q-menu
				.size
					q-img(src="@/assets/img/map.png")
				

	// .top
		q-btn(flat round dense icon="mdi-arrow-left-circle-outline" color="primary" @click="$router.back()" size="lg") 
		div
			div {{ store.page }}
			h5 {{ store.current?.name }}
		.q-gutter-x-xs
			q-btn(flat color="primary" label="Отмена") 
			q-btn(unelevated color="primary" label="Сохранить изменения") 
	

	q-splitter(v-model="split")
		template(v-slot:before)
			q-tabs.q-px-sm(v-model="tabs" dense active-color="primary" align="left")
				q-tab(name="main" label="Форма")
				q-tab(name="sec" label="Состояния")

			q-tab-panels.panel(v-model="tabs" animated)
				q-tab-panel(name="main")
					EditFormComp

				q-tab-panel(name="sec")
					.q-pa-lg Здесь состояния ?


		template(v-slot:after)
			SubCardPanel

	Teleport(to="body")
		vue-draggable-resizable.drag(:x="0" :y="0" :w="200" :h="150" :active="false" :z="2005")
			q-img(src="@/assets/img/map.png")

</template>

<style scoped lang="scss">
.drag {
	padding: 0.5rem;
	background: #fff;
	box-shadow: 3px 3px 6px 0px rgba(0, 0, 0, 0.2);
	position: absolute;
	top: 70%;
	left: 80%;
}
.top {
	display: grid;
	grid-template-columns: auto 1fr auto;
	justify-items: space-between;
	align-items: center;
	column-gap: 1rem;
}
.q-splitter {
	margin-top: 1rem;
	height: calc(100vh - 160px);
}
.panel {
	box-sizing: border-box;
	margin: 0 6px 6px 6px;
	background: #fff;
	height: calc(100vh - 202px);
	padding: 1rem;
	box-shadow: var(--panel-shadow);
}

:deep(.q-tab-panel) {
	padding: 0;
	background: transparent;
}
.small {
	font-size: 0.8rem;
	white-space: nowrap;
}
:deep(.q-carousel) {
	background: transparent;
}
.q-breadcrumbs {
	font-size: 1.1rem;
	.q-item__label {
		margin-left: 0.5rem;
	}
}
svg.icon.item {
	width: 1.4rem;
}
.size {
	// height: 200px;
	width: 400px;
}
</style>
