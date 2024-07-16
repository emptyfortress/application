<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import chooseFormDialog from '@/components/chooseFormDialog.vue'
import draggable from 'vuedraggable'
import { useStore } from '@/stores/store'
import { onClickOutside } from '@vueuse/core'

const router = useRouter()
const route = useRoute()

const dialog1 = ref(false)
const name = ref(route.params.etap)

const list2 = ref([
	{
		id: 1,
		type: 'select',
		typ: 'Сотрудник',
		label: 'Автор',
		name: 'Автор',
		visible: true,
		readonly: true,
		selected: false,
		options: ['Иванов', 'Петров', 'Орлов'],
	},
	{
		id: 2,
		type: 'date',
		typ: 'Дата',
		label: 'Дата создания',
		name: 'Дата создания',
		visible: true,
		readonly: true,
		selected: false,
	},
])
const list3 = ref([
	{
		id: 0,
		label: 'Поле 1',
		name: 'Поле 1',
		type: 'text',
		typ: 'Placeholder',
		visible: true,
		readonly: false,
		selected: false,
	},
	{
		id: 1,
		type: 'select',
		typ: 'Сотрудник',
		label: 'Автор',
		name: 'Автор',
		visible: true,
		readonly: true,
		options: ['Иванов', 'Петров', 'Орлов'],
		selected: false,
	},
	{
		id: 2,
		type: 'date',
		typ: 'Дата',
		label: 'Дата создания',
		name: 'Дата создания',
		visible: true,
		readonly: true,
		selected: false,
	},
	{
		id: 3,
		label: 'Поле 2',
		name: 'Поле 2',
		type: 'text',
		typ: 'Placeholder',
		visible: true,
		readonly: false,
		selected: false,
	},
])
const remove = (e: number) => {
	list2.value.splice(e, 1)
}

const store = useStore()
watch(
	() => store.formSelected,
	() => {
		if (store.formSelected == true) {
			list2.value = [...list3.value]
			store.unselectForm()
		}
	}
)
const select = (e: any) => {
	list2.value.map((item: any) => {
		item.selected = false
	})
	e.selected = !e.selected
}
const target = ref(null)

onClickOutside(target, (event) =>
	list2.value.map((item) => {
		item.selected = false
	})
)
</script>

<template lang="pug">
.bl
	.zag
		q-btn(flat color="primary" icon="mdi-menu" label="Показать поля" @click="store.toggleDrawer") 
		q-btn(flat color="primary" icon="mdi-form-select" label="Выбрать форму из доступных" @click="dialog1 = !dialog1") 

	h5.q-mt-md Форма "{{ name }}"
		q-popup-edit(v-model="name" title="Название формы" auto-save v-slot="scope")
			q-input(v-model="scope.value" dense autofocus counter @keyup.enter="scope.set")

	.list
		.drop(v-if="list2.length == 0")
			span Перетащите сюда нужное поле
		draggable(
			class="list-group"
			:list="list2"
			group="people"
			ghost-class="ghost"
			itemKey="id")

			template(#item="{ element, index }")
				.node1(ref="target" @click="select(element)" :class="{selected: element.selected}")
					FormKit(:type="element.type" :label="element.label" :placeholder="element.typ" :options="element.options")
					.bt
						q-btn(dense flat round @click="element.visible = !element.visible" size="sm") 
							q-icon(name="mdi-eye" v-if="element.visible")
							q-icon(name="mdi-eye-off" v-else)

						q-btn(dense flat round @click="element.readonly = !element.readonly" size="sm") 
							q-icon(name="mdi-pencil-off" v-if="element.readonly")
							q-icon(name="mdi-pencil" v-else)

						q-btn(dense flat round icon="mdi-close" @click="remove(index)" size="sm") 

chooseFormDialog(v-model="dialog1")

</template>

<style scoped lang="scss">
.cl {
	.q-btn {
		display: block;
	}
}
.list {
	min-height: 100px;
	width: 100%;
}
.zag {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.bl {
	background: #fff;
	height: var(--panel-height);
	padding: 1rem;
	margin-right: 0.25rem;
	position: relative;
}
.sec {
	margin-top: 1rem;
}
.list-group {
	max-width: 300px;
}
.node1 {
	// max-width: 300px;
	padding: 0.5rem;
	background: #fff;
	position: relative;
	margin-bottom: 2px;
	.bt {
		position: absolute;
		top: -26px;
		right: 0;
		background: #ffaa5b;
		display: none;
	}
	&.ghost {
		opacity: 0.5;
		background: #c8ebfb;
	}
	&:hover,
	&.selected {
		outline: 2px solid #ffaa5b;
		.bt {
			display: block;
		}
	}
}
.op {
	opacity: 0.2;
}
</style>
