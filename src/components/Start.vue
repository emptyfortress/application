<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/stores/store'
import { useRouter } from 'vue-router'
import { myApps } from '@/stores/tree'

const props = defineProps({
	id: {
		type: String,
		required: true,
	},
})

const store = useStore()
const router = useRouter()

const goto = () => {
	router.push(`/${props.id}/editor/process`)
}
const ass = () => {
	router.push('/assistent')
}
</script>

<template lang="pug">
.q-ml-md
	template(v-if="store.currentNode")
		.grid
			div
				h6
					span.edit {{ store.currentNode.data.text }}
					q-popup-edit(v-model="store.currentNode.data.text" buttons title="Название приложения" auto-save v-slot="scope")
						q-input(v-model="scope.value" dense autofocus counter @keyup.enter="scope.set")

				.text-subtitle1(v-if='store.currentNode.data.type == 1')
					span.edit(v-if='store.currentNode.data.descr') {{ store.currentNode.data.descr }}
					span.edit(v-else) Описание приложения
					q-popup-edit(v-model="store.currentNode.data.descr" buttons title="Описание приложения" auto-save v-slot="scope")
						q-input(v-model="scope.value" dense autofocus counter @keyup.enter="scope.set")

			div(v-if="store.currentNode.data.type == 1")
				.text-overline version
				.big
					q-icon(name="mdi-source-branch" color="primary")
					span.q-ml-sm v. {{ store.currentNode.data.version}}
						q-menu
							q-list
								q-item(clickable)
									q-item-section v.0.2.0
								q-item(clickable)
									q-item-section v.1.1.0

		template(v-if="store.currentNode.data.type == 1")
			.grid1
				.text-bold Создано:
				div 21.10.24  15:40
				.text-bold Автор:
				div Орлов П.С.
				div &nbsp;
				div &nbsp;

			q-card-actions.q-mt-xl
				q-btn(unelevated  icon="mdi-pencil" label="Настроить приложение" color="primary" @click="goto") 
				q-btn(unelevated  icon="mdi-school" label="Ассистент" color="primary" @click="ass") 
				q-space
				// q-btn(flat  icon="mdi-content-duplicate" label="Дублировать" color="primary" @click="store.dub = true") 
				q-btn(unelevated color="negative" label="Удалить приложение" @click="store.del = true") 
</template>

<style scoped lang="scss">
.big {
	font-size: 1.2rem;
	color: $primary;
	cursor: pointer;
}
.text-overline {
	line-height: 1;
}
.grid {
	display: grid;
	grid-template-columns: 2fr auto;
	align-items: center;
	column-gap: 1rem;
	row-gap: 0.5rem;
}
.grid1 {
	margin-top: 1rem;
	display: grid;
	grid-template-columns: auto 1fr;
	// justify-items: start;
	// align-items: stretch;
	column-gap: 1rem;
}
.app {
	width: 200px;
	height: 200px;
	background: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
}
.edit {
	border-bottom: 1px dotted $primary;
}
</style>
