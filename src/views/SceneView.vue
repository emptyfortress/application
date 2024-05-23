<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/stores/store'
import CreateDialog from '@/components/CreateDialog.vue'

const store = useStore()
const dialog = ref(false)

const showDialog = () => {
	dialog.value = !dialog.value
}
</script>

<template lang="pug">
q-page(padding)
	.row.justify-between.items-end
		div
			div {{ store.page }}
			h4 Сценарии
		q-btn(flat icon="mdi-plus-circle" color="primary" label="Создать" @click="showDialog") 


	CreateDialog(v-model="dialog" @create="" mode="scene")
</template>

<style scoped lang="scss"></style>
