<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import draggable from 'vuedraggable'
import { useStore } from '@/stores/store'
import AddFieldDialog from '@/components/AddFieldDialog.vue'
import { uid } from 'quasar'

interface Field {
	id: string
	name: string
	type: string
	selected: boolean
}

const fields: Field[] = reactive([
	{
		id: 'one',
		name: 'Сотрудник',
		type: 'Строка справочника',
		selected: false,
	},
	{
		id: 'two',
		name: 'Название этапа',
		type: 'Строка',
		selected: false,
	},
])
const fields1: Field[] = reactive([])

const store = useStore()
const log = () => {
	console.log('log')
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
	let idx = fields1.findIndex((e: any) => {
		return e.selected == true
	})
	fields1.splice(idx, 1)
	store.clearField()
}
onMounted(() => {
	store.setFormName(store.startFormName)
})
const select = (el: any) => {
	fields1.map((item) => {
		item.selected = false
	})
	el.selected = true
	store.setField(el)
}

// const cloneDog = ({ id, name, type }) => {
const cloneDog = (item: Field) => {
	return {
		id: uid(),
		name: item.name,
		type: item.type,
	}
}
</script>

<template lang="pug">
.grid
	div
		.field Список доступных полей
		q-list.q-mt-md
			draggable(
				:list="fields"
				:group="{ name: 'people', pull: 'clone', put: false }"
				:clone="cloneDog"
				@change="log"
				item-key="id"
				)
				template( #item="{element}" )
					q-item.rem(clickable dense)
						q-item-section {{element.name}}
						q-item-section(side)
							q-btn(flat round dense icon="mdi-trash-can-outline" color="primary" @click="" size="sm") 

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
					q-item(clickable @click="select(element)" :class="{selected: element.selected}")
						q-item-section {{element.name}}
						q-item-section(side v-if="element.selected")
							q-btn(flat round dense icon="mdi-close" color="primary" @click="remove" size="sm") 

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
	// background: #eee;
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
.rem {
	.q-btn {
		display: none;
	}
	padding-right: 0;
	&:hover {
		.q-btn {
			display: inline-flex;
		}
	}
}
</style>
