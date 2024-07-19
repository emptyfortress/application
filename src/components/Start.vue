<script setup lang="ts">
import { useStore } from '@/stores/store'
import { useRouter } from 'vue-router'

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
</script>

<template lang="pug">
.q-ml-md
	template(v-if="store.currentNode")
		.grid
			div
				h6 {{ store.currentNode.data.text }}
					q-popup-edit(v-model="store.currentNode.data.text" title="Название приложения" auto-save v-slot="scope")
						q-input(v-model="scope.value" dense autofocus counter @keyup.enter="scope.set")

				.text-subtitle1 {{ store.currentNode.data.descr }}
					q-popup-edit(v-model="store.currentNode.data.descr" title="Описание приложения" auto-save v-slot="scope")
						q-input(v-model="scope.value" dense autofocus counter @keyup.enter="scope.set")

			.bl(v-if="store.currentNode.data.type == 1")
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

		template(v-if="store.currentNode.data.type == 1")
			.row.q-mt-lg.q-gutter-md
				.text-bold Карточка:
				div {{ store.currentNode.data.text }}
			.q-mt-md Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, autem consequatur. Aperiam quis consectetur beatae et labore rerum ut optio incidunt dolor ab exercitationem aliquam, fugit dolorum aspernatur, maiores ratione!

			.q-mt-lg.q-gutter-x-lg
				q-btn(flat  icon="mdi-pencil" label="Редактировать" color="primary" @click="goto") 
					q-tooltip Редактировать
				q-btn(flat  icon="mdi-content-duplicate" label="Дублировать" color="primary" @click="store.dub = true") 
					q-tooltip Дублировать
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
</style>
