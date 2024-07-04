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
				.q-ml-md
					template(v-if="store.currentNode")
						.grid
							h6 {{ store.currentNode.data.text }}
									// .text-subtitle1 {{ store.app.descr }} desr

							.bl
								.text-overline version
								.big
									q-icon(name="mdi-source-branch" color="primary")
									span.q-ml-sm v. 1.2.5
										q-menu
											q-list
												q-item(clickable)
													q-item-section v.0.2.0
												q-item(clickable)
													q-item-section v.1.1.0

						.q-mt-md Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, autem consequatur. Aperiam quis consectetur beatae et labore rerum ut optio incidunt dolor ab exercitationem aliquam, fugit dolorum aspernatur, maiores ratione!

						.q-mt-lg.q-gutter-x-lg
							q-btn(flat  icon="mdi-pencil" label="Редактировать" color="primary" @click="goto") 
								q-tooltip Редактировать
							q-btn(flat  icon="mdi-content-duplicate" label="Дублировать" color="primary" @click="") 
								q-tooltip Дублировать
							q-btn(unelevated color="negative" label="Удалить приложение" @click="") 

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

.grid {
	display: grid;
	grid-template-columns: 2fr auto;
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
