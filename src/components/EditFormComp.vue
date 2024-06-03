<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import draggable from 'vuedraggable'
import { useStore } from '@/stores/store'
import AddFieldDialog from '@/components/AddFieldDialog.vue'

interface Field {
	id: string
	name: string
	type: string
}

const fields: Field[] = reactive([])
const fields1: Field[] = reactive([])

const store = useStore()
const log = () => {
	console.log(111)
}
const drag = ref(false)

const dialog = ref(false)
const add = () => {
	dialog.value = !dialog.value
}
const create = (e: Field) => {
	fields.push(e)
}
const remove = () => {
	// let idx = razm.findIndex((e: any) => {
	// 	return e.selected == true
	// })
	// razm.splice(idx, 1)
	// // currentForm.value = razm[0].name
	// razm[0].selected = true
}
onMounted(() => {
	store.setFormName(store.startFormName)
})
</script>

<template lang="pug">
.grid
	div
		.field Список доступных полей
		q-list.q-mt-md
			draggable(
				:list="fields"
				:group="{ name: 'people', pull: 'clone', put: false }"
				@change="log"
				item-key="id"
				)
				template( #item="{element}" )
					q-item(clickable dense) {{element.name}}

		.empty(v-if="!fields.length") Ничего нет

			// q-item(clickable dense v-for="item in fields" :key="item.id" :class="{selected : item.selected}" @click="select(item)")
				q-item-section
					q-item-label {{ item.name }}
				q-item-section.small(side)
					q-item-label {{ item.type }}

		br
		q-btn(flat color="primary" icon="mdi-plus-circle" label="Создать" @click="add") 
	.form
		.zg
			span {{ store.formName}}
				q-popup-edit(v-model="store.formName" v-slot="scope")
					q-input(ref="frm" v-model="scope.value" dense autofocus @focus="frm.select()" @keyup.enter="scope.set")

		.list
			draggable(
				:list="fields1"
				group="people"
				@change="log"
				item-key="id"
				)
				template( #item="{element}" )
					q-item(clickable) {{element.name}}

	AddFieldDialog(v-model="dialog" @create="create")
</template>

<style scoped lang="scss">
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
	.zg {
		font-size: 1.2rem;
		span {
			border-bottom: dotted 1px $primary;
		}
	}
}
.selected {
	background: #d3e8ff;
}
.list {
	margin-top: 1rem;
	min-height: 150px;
}
</style>
