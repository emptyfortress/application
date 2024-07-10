<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import CreateDialog from '@/components/CreateDialog.vue'
import { useStore } from '@/stores/store'
import { myApps } from '@/stores/tree'
import BaseTree from '@/components/BaseTree.vue'

const store = useStore()
const router = useRouter()

const goto = () => {
	router.push('/editor/process')
	store.setBread('Процесс')
}

const dialog = ref(false)

const action = () => {
	dialog.value = !dialog.value
}
const create = (e: App) => {
	// store.addAppToList(e)
}
const selected = ref('0.1.5')
const splitterModel = ref(30)

const hei = computed(() => {
	return 'height: ' + (window.innerHeight - 180) + 'px;'
})
</script>

<template lang="pug">
q-page(padding)
	.container
		h5 Мои приложения
		q-splitter.q-mt-md(v-model="splitterModel" :limits="[0, 100]" :style="hei" )
			template(v-slot:before)
				.blo
					q-scroll-area.list
						BaseTree(:treeData="myApps")
						q-btn.fab(round icon="mdi-plus" color="primary") 

			template(v-slot:after)
				router-view

	CreateDialog(v-model="dialog" @create="create")
</template>

<style scoped lang="scss">
.container {
	max-width: 1400px;
	margin: 0 auto;
}
.list {
	height: 100%;
}
.blo {
	margin-right: 1rem;
	height: calc(100vh - 180px);
	position: relative;
}
.fab {
	position: absolute;
	bottom: 1rem;
	right: 1rem;
}
</style>
