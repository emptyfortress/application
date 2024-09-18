<script setup lang="ts">
import { ref } from 'vue'
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from '@/stores/store'
import CommonLib from '@/components/CommonLib.vue'
import RoleRule from '@/components/RoleRule.vue'
import CommonProp from '@/components/CommonProp.vue'

const store = useStore()
const router = useRouter()
const route = useRoute()
</script>

<template lang="pug">
.prop
	q-tabs(v-model="store.tabs" dense active-color="primary" indicator-color="primary" inline-label)
		q-tab(name="property" label="Свойства")
		q-tab(name="lib" label="Библиотека" v-if="route.name == 'Этап'")
		q-tab(name="role" label="Правила" v-if="route.name == 'Роли'")
	q-separator

	q-tab-panels(v-model="store.tabs")
		q-tab-panel(name="property")
			CommonProp

		q-tab-panel(name="lib")
			CommonLib
		q-tab-panel(name='role')
			RoleRule
</template>

<style scoped lang="scss">
.prop {
	background: #fff;
	margin-left: 0.5rem;
	height: var(--panel-height);
}
.q-tab-panel {
	padding: 0;
}
</style>
