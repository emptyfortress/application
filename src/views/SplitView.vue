<script setup lang="ts">
import { ref } from 'vue'
import ProcessTab from '@/components/ProcessTab.vue'
import PropertyPanel from '@/components/PropertyPanel.vue'
import RolePanel from '@/components/RolePanel.vue'
import RoleTab from '@/components/RoleTab.vue'
import { useStore } from '@/stores/store'
import { useRoute } from 'vue-router'

const props = defineProps({
	id: {
		type: String,
		default: 'test',
	},
})

const store = useStore()
const route = useRoute()
const split = ref(70)
</script>

<template lang="pug">
q-page
	.grid
		RouterLink.bl(:to="`/split/${store.page}/process`" exactActiveClass="active") Процессы
		RouterLink.bl(:to="`/split/${store.page}/card`" exactActiveClass="active") Карточки
		RouterLink.bl(:to="`/split/${store.page}/role`" exactActiveClass="active") Роли
		RouterLink.bl(:to="`/split/${store.page}/list`" exactActiveClass="active") Реестры

	q-splitter(v-model="split")
		template(v-slot:before)
			router-view

		template(v-slot:after)
			PropertyPanel

</template>

<style scoped lang="scss">
// .q-page {
// 	--height: calc(100vh - 150px);
// }

.q-splitter {
	margin-top: 0.5rem;
	height: var(--height);
}
.grid {
	display: grid;
	grid-template-columns: repeat(4, 150px);
	align-items: center;
	column-gap: 0.25rem;
	row-gap: 0.5rem;
}
.bl {
	background: #ffffff7a;
	height: 48px;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	text-transform: uppercase;
	color: #333;
	text-decoration: none;
	&:hover {
		background: #fff;
	}
}
.active {
	background: $primary;
	color: white;
	&:hover {
		background: $primary;
	}
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
	height: var(--height);
	background: transparent;
}
:deep(.q-tab-panel) {
	padding: 0;
}
</style>
