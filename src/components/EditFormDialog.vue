<script setup lang="ts">
import { useStore } from '@/stores/store'
import draggable from 'vuedraggable'
import EditFormComp from '@/components/EditFormComp.vue'

const modelValue = defineModel()
const store = useStore()
</script>

<template lang="pug">
q-dialog(v-model="modelValue")
	q-card
		q-btn.close(round color="negative" icon="mdi-close" v-close-popup)
		q-card-section
			.text-h6 Настроить форму

		q-card-section
			EditFormComp
</template>

<style scoped lang="scss">
.q-card {
	min-height: 90vh;
	min-width: 80%;
}
.grid {
	display: grid;
	grid-template-columns: auto 1fr;
	justify-items: start;
	align-items: start;
	column-gap: 3rem;
}
.form {
	width: 100%;
	height: calc(100vh - 240px);
	background: #eee;
	padding: 1rem;
	// display: flex;
	// flex-direction: column;
	// justify-content: space-between;
	.zg {
		font-size: 1.2rem;
		span {
			border-bottom: dotted 1px $primary;
		}
	}
}
</style>
