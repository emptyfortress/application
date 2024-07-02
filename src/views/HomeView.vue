<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import CreateDialog from '@/components/CreateDialog.vue'
import { useStore } from '@/stores/store'
// import { gsap } from 'gsap'
import { myApps } from '@/stores/tree'
import BaseTree from '@/components/BaseTree.vue'

const store = useStore()
const router = useRouter()

// const goto = (evt: Event, row: any, index: number) => {
// 	router.push(`/${row.name}`)
// 	store.setApp(row)
// }

const dialog = ref(false)

const action = () => {
	dialog.value = !dialog.value
}
const create = (e: App) => {
	store.addAppToList(e)
}
const selected = ref('0.1.5')
const splitterModel = ref(30)

const hei = computed(() => {
	return 'height: ' + (window.innerHeight - 180) + 'px;'
})
const treedata = []
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
				template(v-if="store.currentNode")
					h6 {{ store.currentNode.data.text }}

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
	margin-right: 0.5rem;
	height: calc(100vh - 180px);
	position: relative;
}
.fab {
	position: absolute;
	bottom: 1rem;
	right: 1rem;
}

// :deep(.q-table th) {
// 	background: $primary;
// 	color: white;
// }
// .q-tree {
// 	margin: 1rem;
// }
// :deep(.q-tree__node--selected) {
// 	background: $secondary;
// 	color: white;
// }
// :deep(.q-tree__node--selected .q-tree__node-header-content) {
// 	color: white;
// }
</style>
