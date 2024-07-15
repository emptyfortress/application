<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import chooseFormDialog from '@/components/chooseFormDialog.vue'
import draggable from 'vuedraggable'
import { useStore } from '@/stores/store'

const router = useRouter()
const route = useRoute()

const dialog1 = ref(false)
const name = ref(route.params.etap)

const list2 = ref([
	{ type: 'Сотрудник', label: 'Автор', name: 'Автор', id: 1, visible: true, readonly: true },
	{
		type: 'Дата',
		label: 'Дата создания',
		name: 'Дата создания',
		id: 2,
		visible: true,
		readonly: true,
	},
])
const list3 = [
	{ id: 0, label: 'Поле 1', name: 'Поле 1', type: '', visible: true, readonly: false },
	{ id: 1, label: 'Поле 2', name: 'Поле 2', type: '', visible: true, readonly: false },
	{ id: 2, label: 'Поле 3', name: 'Поле 3', type: '', visible: true, readonly: false },
	{ id: 3, label: 'Поле 4', name: 'Поле 4', type: '', visible: true, readonly: false },
	{ id: 4, label: 'Поле 5', name: 'Поле 5', type: '', visible: true, readonly: false },
	{ id: 5, label: 'Поле 6', name: 'Поле 6', type: '', visible: true, readonly: false },
	{ id: 6, label: 'Поле 7', name: 'Поле 7', type: '', visible: true, readonly: false },
	{ id: 7, label: 'Поле 8', name: 'Поле 8', type: '', visible: true, readonly: false },
	{ id: 8, label: 'Поле 9', name: 'Поле 9', type: '', visible: true, readonly: false },
]
const remove = (e: number) => {
	list2.value.splice(e, 1)
}

const store = useStore()
watch(
	() => store.formSelected,
	() => {
		if (store.formSelected == true) {
			list2.value = [...list3]
			store.unselectForm()
		}
	}
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

	.grid
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
					.node1
						q-input(dense filled v-model="element.name" :disable="element.readonly" :class="{op: !element.visible}")
						div
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
.grid {
	margin-top: 1rem;
	display: grid;
	grid-template-columns: 1fr 1fr;
	// justify-items: start;
	// align-items: stretch;
	column-gap: 3rem;
	row-gap: 0.5rem;
}
.node1 {
	padding: 0.5rem;
	background: #fff;
	display: grid;
	grid-template-columns: 1fr auto;
	align-items: center;
	&.ghost {
		opacity: 0.5;
		background: #c8ebfb;
	}
}
.op {
	opacity: 0.2;
}
</style>
