<script setup lang="ts">
import { ref, reactive, computed, watch, watchEffect, onMounted } from 'vue'
import { Draggable } from '@he-tree/vue'
import '@he-tree/vue/style/default.css'
import { useStore } from '@/stores/store'
import WordHighlighter from 'vue-word-highlighter'
import DirMenu from '@/components/DirMenu.vue'

const props = defineProps<{
	treeData: TreeNode[]
	reset: Boolean
}>()

const store = useStore()
const query = ref('')

const clearFilter = () => {
	query.value = ''
	tree.value.statsFlat.map((item: Stat) => (item.hidden = false))
}

// watch(query, (newValue) => {
// 	if (newValue !== '') {
// 		tree.value.statsFlat.map((stat: Stat) => {
// 			stat.hidden = true
// 			if (stat.data.text.toLowerCase().includes(query.value.toLowerCase())) {
// 				stat.hidden = false
// 				for (const parentStat of tree.value.iterateParent(stat, { withSelf: false })) {
// 					parentStat.hidden = false
// 				}
// 			}
// 		})
// 	} else clearFilter()
// })

// watchEffect(() => {
// 	if (store.del === true) {
// 		tree.value.remove(store.currentNode)
// 		store.setCurrentNode(null)
// 		store.del = false
// 	}
// 	if (store.dub === true) {
// 		let temp = {
// 			text: store.currentNode!.data.text + '-copy',
// 			text1: store.currentNode!.data.text1,
// 			hidden: false,
// 			type: 1,
// 		}
// 		tree.value.add(temp, store.currentNode!.parent)
// 		let one = tree.value.getStat(temp)
// 		select(one)
// 		store.toggleDub()
// 	}
// })

const tree = ref()

const select = (n: Stat) => {
	tree.value.statsFlat.map((item: Stat) => (item.data.selected = false))
	n.data.selected = true
	store.setCurrentNode(n)
	console.log(n)
}

const toggle = (stat: any) => {
	stat.open = !stat.open
}

// const add = (e: Stat) => {
// 	if (e.data.type === 0) {
// 		tree.value.add({ text: 'New item', text1: 'Здесь описание', hidden: false, type: 1 }, e)
// 	} else {
// 		tree.value.add({ text: 'New item', text1: 'Здесь описание', hidden: false, type: 1 }, e.parent)
// 	}
// }

// const addFolder = (e: Stat) => {
// 	if (e.data.type === 0) {
// 		tree.value.add({ text: 'New folder', hidden: false, type: 0 }, e)
// 	} else {
// 		tree.value.add({ text: 'New folder', hidden: false, type: 0 }, e.parent)
// 	}
// }

// const remove = (e: Stat) => {
// 	tree.value.remove(e)
// 	if (e === store.currentNode) {
// 		store.setCurrentNode(null)
// 	}
// }

// const duble = (e: Stat) => {
// 	let temp = {
// 		text: e.data.text + '-copy',
// 		text1: e.data.text1,
// 		hidden: false,
// 		type: 1,
// 	}
// 	tree.value.add(temp, e.parent)
// 	select(tree.value.getStat(temp))
// }

// const edit = (e: Stat) => {
// 	e.data.edit = true
// }

// const setText = (e: Stat, ev: any) => {
// 	e.data.text = ev.target.value
// 	e.data.edit = false
// }

const isDrop = (e: any) => {
	if (e.data.type == 0) return true
	else return false
}

// const adding = {
// 	text: 'Задания на контроле',
// 	text1: 'Описание поиска',
// 	hidden: false,
// 	selected: false,
// 	type: 1,
// 	fields: [
// 		{
// 			id: 1,
// 			check: true,
// 			sort: true,
// 			filter: true,
// 			type: 2,
// 			label: 'Тип',
// 			options: ['Документ', 'Задание', 'Группа заданий', 'Любой'],
// 			val: 'Документ',
// 			notset: false,
// 		},
// 		{
// 			id: 2,
// 			check: true,
// 			sort: true,
// 			filter: true,
// 			type: 2,
// 			label: 'Вид карточки',
// 			val: 'Любой',
// 			options: [
// 				'Любой',
// 				'Заявка',
// 				'Договор',
// 				'Письмо',
// 				'Входящий',
// 				'Исходящий',
// 				'Приказ',
// 				'Заявление',
// 				'Письмо',
// 				'Черновик',
// 			],
// 			notset: false,
// 		},
// 	],
// }

const initial = (stat: any) => {
	if (props.reset == false) {
		return stat
	} else {
		stat.data.selected = false
		return stat
	}
}

// onMounted(() => {
// 	if (props.load === true) {
// 		tree.value.add(adding, tree.value.rootChildren[0])
// 		select(tree.value.getStat(adding))
// 	}
// })

// const mychips = useChips()

// watch(
// 	() => mychips.count,
// 	() => {
// 		let temp = {
// 			text: mychips.newSearchItem,
// 			text1: 'Описание поиска',
// 			hidden: false,
// 			selected: true,
// 			type: 1,
// 		}
// 		tree.value.add(temp, tree.value.rootChildren[0])
// 		select(tree.value.getStat(temp))
// 		store.setCurrentNode(tree.value.getStat(temp))
// 	}
// )
</script>

<template lang="pug">
div
	q-form.quick
		q-input(dense
			v-model="query"
			autofocus
			clearable
			@clear="clearFilter"
			placeholder="фильтр"
			).query
			template(v-slot:prepend)
				q-icon(name="mdi-magnify")

	Draggable(v-model="props.treeData"
		ref="tree"
		treeLine
		:treeLineOffset="18"
		:indent="30"
		:eachDroppable="isDrop"
		:statHandler="initial"
		:watermark="false")
		template(#default="{ node, stat }")
			.node(@click="select(stat)" :class="{ 'selected': stat.data.selected }")
				q-icon(name="mdi-chevron-down" v-if="stat.children.length" @click.stop="toggle(stat)" :class="{ 'closed': !stat.open }").trig
				q-icon(name="mdi-folder-outline" v-if="stat.data.type === 0").fold
				WordHighlighter(:query="query") {{ node.text }}
				DirMenu(
					:stat="stat"
					@kill="remove(stat)"
					@add="add(stat)"
					@addFolder="addFolder(stat)"
					@rename="edit(stat)"
					@duble="duble(stat)")
				q-menu.q-px-md(no-parent-event v-model="stat.data.edit" cover anchor="top left")
					q-input(:model-value="stat.data.text"
					dense
					autofocus counter
					@keyup.enter="setText(stat, $event)"
					)
</template>

<style scoped lang="scss">
.node {
	padding: 4px 8px;
	cursor: pointer;

	&.selected {
		background: #b1ddfc;
		color: #1565c0;

		&:hover {
			background: #b1ddfc;
		}
	}

	&:hover {
		background: hsla(0, 0%, 91%);
	}
}

.quick .q-field--dense .q-field__control,
.q-field--dense .q-field__marginal {
	height: 28px !important;
}
.quick {
	margin-bottom: 0.5rem;
}

.fold {
	font-size: 1.3rem;
	margin-right: 0.5rem;
}

.trig {
	font-size: 1.3rem;
	margin-right: 0.5rem;
	transition: 0.2s ease all;

	&.closed {
		transform: rotate(-90deg);
	}
}
</style>
