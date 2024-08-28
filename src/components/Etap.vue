<script setup lang="ts">
import { ref, watchEffect, computed, onMounted } from 'vue'
import FormTop from '@/components/FormTop.vue'
import FormLayout from '@/components/FormLayout.vue'
import FormLayout1 from '@/components/FormLayout1.vue'
import VueDraggableResizable from 'vue-draggable-resizable'
import Toolbar from '@/components/Toolbar.vue'
import ChooseFormDialog from '@/components/ChooseFormDialog.vue'
import { useRoute, useRouter } from 'vue-router'
import { useLayoutStore } from '@/stores/layout'
import { useStore } from '@/stores/store'
import { useStorage } from '@vueuse/core'
import { useForms } from '@/stores/forms'
import { useRoles } from '@/stores/roles'
import { uid } from 'quasar'

const store = useStore()
const myform = useForms()
const route = useRoute()
const router = useRouter()
const name = ref(route.params.etap.toString())
const dialog = ref(false)
const lstore = useLayoutStore()

const width = ref('100%')
watchEffect(() => {
	switch (lstore.mode) {
		case 'phone':
			return (width.value = '480px')
		case 'tablet':
			return (width.value = '800px')
		case 'desk':
			return (width.value = '100%')
		default:
			return (width.value = '100%')
	}
})

const app = useStorage('app', localStorage)

const resetZay = () => {
	setTimeout(() => {
		myform.toggleZay()
	}, 100)
}
const myrole = useRoles()

const save = () => {
	console.log('first save')
	if (myform.newform == true) {
		myform.createForm(name.value.toString())
		let tmp = {
			id: uid(),
			etap: myform.currentBO.name,
			role: myrole.currentRole,
			form: name.value.toString(),
		}
		myform.newform = false
		myform.addCondition(tmp)
	} else {
		console.log(222)
		let currentCondition = myform.conditionList.find((el: Condition) => {
			return el.etap == myform.currentEtap && el.role == myrole.currentRole
		})
		currentCondition!.form = name.value.toString()
		myform.notMain = false
		myform.newform = false
	}
	console.log(333)
	lstore.saveLayout(name.value, startLayout.value)
	router.back()
	resetZay()
}

const back = () => {
	myform.newform = false
	myform.notMain = false
	router.back()
	resetZay()
}

const startLayout = ref<Layout[]>([])

let start = [
	{
		x: 1,
		y: 0,
		w: 10,
		h: 4,
		i: 0,
		selected: false,
		fieldList: [],
	},
]

onMounted(() => {
	if (myform.newform == true) {
		startLayout.value = start
	} else {
		let tmp = lstore.allLayouts.find((el: LayoutSet) => el.form == name.value)

		if (tmp !== undefined) {
			startLayout.value = [...tmp.layout]
		} else {
			startLayout.value = [...start]
		}
	}
})

const loadForm = (e: string) => {
	let tmp = lstore.allLayouts.find((el) => el.form == e)
	if (!!tmp) startLayout.value = [...tmp.layout]
}
</script>

<template lang="pug">
.bl
	vue-draggable-resizable(:x="0" :y="180"
		:w="32"
		:h="140"
		:active="false"
		:z="2000"
		:parent='true'
		:resizable='false'
		)
		Toolbar

	.zag
		h5 Форма "{{ name }}"
			q-popup-edit(v-model="name" title="Название формы" auto-save v-slot="scope")
				q-input(v-model="scope.value" dense autofocus counter @keyup.enter="scope.set")
		div
			q-btn(flat color="primary" label="Отмена" @click="back") 
			q-btn(v-if='myform.formList.length > 0' flat color="primary" icon="mdi-content-duplicate" label="Скопировать форму" @click="dialog = !dialog") 
			q-btn(flat color="primary" label="Сохранить" @click="save") 
	.inner
		FormTop(v-if='myform.showBt')
		FormLayout1(v-if='myform.zay' :form='myform.zayform')
		FormLayout(v-else :layout='startLayout')

ChooseFormDialog(v-model="dialog" @load='loadForm')
</template>

<style scoped lang="scss">
.bl {
	position: relative;
}
.vdr {
	border: 1px solid #ccc;
	background: #fff;
	box-shadow: 2px 2px 4px rgba($color: #000000, $alpha: 0.2);
	padding: 3px;
}
.zag {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: start;
	h5 {
		text-align: center;
		border-bottom: 1px dotted $primary;
	}
}
.inner {
	margin: 1rem auto;
	width: v-bind(width);
}
</style>
