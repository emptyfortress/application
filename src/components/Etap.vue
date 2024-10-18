<script setup lang="ts">
import { ref, watchEffect, computed, onMounted } from 'vue'
import FormTop from '@/components/FormTop.vue'
import FormLayout from '@/components/FormLayout.vue'
import VueDraggableResizable from 'vue-draggable-resizable'
import Toolbar from '@/components/Toolbar.vue'
import ChooseFormDialog from '@/components/ChooseFormDialog.vue'
import { useRoute, useRouter } from 'vue-router'
import { useLayoutStore } from '@/stores/layout'
// import { useStore } from '@/stores/store'
import { useForms } from '@/stores/forms'
import { useRoles } from '@/stores/roles'
import { uid } from 'quasar'
import { gsap } from 'gsap'

// const store = useStore()
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

const myrole = useRoles()

const calcCreation = computed(() => {
	if (!myform.currentBO && myform.currentBO?.id == 'Activity_03rm8hy') return true
	else return false
})

const save = () => {
	if (!!myform.currentBO) {
		if (myform.newform == true) {
			let tmpform = {
				id: uid(),
				label: name.value,
				value: name.value,
				desc: '',
				selected: false,
				type: 1,
				layout:
				{
					x: 1,
					y: 0,
					w: 10,
					h: 5,
					i: 0,
					selected: false,
					fieldList: []
				},
			}

			myform.createForm(tmpform)

			let tmp = {
				id: uid(),
				etap: myform.currentBO.name,
				role: myrole.currentRole,
				form: name.value.toString(),
			}
			myform.newform = false
			myform.addCondition(tmp)
		} else {
			let currentCondition = myform.conditionList.find((el: Condition) => {
				return el.etap == myform.currentEtap && el.role == myrole.currentRole
			})
			currentCondition!.form = name.value.toString()
			let currentForm = myform.formList.find((el: Form) => el.label == name.value)
			if (!!currentForm) {
				currentForm.desc = tmpDesc.value
			}
			myform.notMain = false
			myform.newform = false
		}
	}
	lstore.saveLayout(name.value, startLayout.value)
	myform.setCurrentBO(null)
	router.back()
}

const back = () => {
	myform.newform = false
	myform.notMain = false
	router.back()
	myform.setCurrentBO(null)
}

const startLayout = ref<Layout[]>([])

let start = [
	{
		x: 1,
		y: 0,
		w: 10,
		h: 12,
		i: 0,
		selected: false,
		fieldList: [...lstore.fields],
	},
]

onMounted(() => {
	let tmp = lstore.allLayouts.find((el: LayoutSet) => el.form == name.value)

	if (tmp !== undefined) {
		startLayout.value = [...tmp.layout]
	} else {
		startLayout.value = [...start]
	}
})

const loadForm = (e: string) => {
	let tmp = lstore.allLayouts.find((el) => el.form == e)
	if (!!tmp) startLayout.value = [...tmp.layout]
}

const tmpDesc = ref('Это сопроводительный текст-описание')

const desc = computed({
	get() {
		let form = myform.formList?.find((el: Form) => el.label == name.value)
		if (!!form) return form.desc
		return tmpDesc.value
	},
	set(val: string) {
		tmpDesc.value = val
	},
})
const setDesc = (e: string) => {
	let form = myform.formList?.find((el: Form) => el.label == name.value)
	if (!!form) {
		form.desc = e
	}
}

const calcNav = computed(() => {
	return '/preview.png'
})

onMounted(() => {
	gsap.from('.fuck', {
		delay: 0.5,
		x: -600,
		opacity: 0,
		ease: 'expo.out',
	})
})

const nav = ref(true)
const closeNav = () => {
	nav.value = false
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
			q-btn(v-if='myform.formList.length > 0' flat color="primary" icon="mdi-content-duplicate" label="Скопировать из формы" @click="dialog = !dialog") 
			q-btn(flat color="primary" label="Сохранить" @click="save") 
			q-btn(flat round dense color="primary" icon='mdi-undo') 
			q-btn(flat round dense color="primary" icon='mdi-redo') 
	.inner
		FormTop(v-if='myform.showBt' v-model="desc" @update:modelValue='setDesc')
		FormLayout(:layout='startLayout')

ChooseFormDialog(v-model="dialog" @load='loadForm')

Teleport(to="body" v-if='nav')
	vue-draggable-resizable.fuck(:x="100" :y="-300" :w="250" :h="150" :active="false" :z="2000" :handles='["br"]' drag-handle='.bar')
		q-card(flat)
			.bar
				div Навигация
				q-icon(name="mdi-close" @click='closeNav')
			q-img(:src='calcNav')
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

.q-card {
	height: 100%;
	overflow: hidden;
}

.fuck {
	border: 1px solid #aaa;
}

.bar {
	height: 26px;
	background: #dedede;
	padding: 0 6px;
	// text-align: center;
	font-size: 0.9rem;
	line-height: 26px;
	display: flex;
	justify-content: space-between;
	align-items: center;

	.q-icon {
		cursor: pointer;
	}
}
</style>
