import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
// import { uid } from 'quasar'
// import { useForms } from '@/stores/forms'
// const myform = useForms()

export const useLayoutStore = defineStore('layout', () => {
	const index = ref(2)
	// const colNum = ref(12)
	const dragType = ref(0)
	const forms = ref([])
	const layout = [
		{
			x: 1,
			y: 0,
			w: 10,
			h: 4,
			i: 0,
			selected: false,
		},
	]
	const fields = reactive([
		{
			id: 4,
			type: 'select',
			label: 'Автор',
			name: 'Автор',
			typ: 'Сотрудник',
			readonly: true,
			visible: true,
			options: ['Иванов', 'Петров', 'Орлов'],
			selected: false,
		},
		{
			id: 5,
			type: 'date',
			label: 'Дата создания',
			name: 'Дата создания',
			typ: 'Дата',
			visible: true,
			readonly: true,
			selected: false,
		},
		{
			id: 6,
			type: 'date',
			label: 'Дата изменения',
			name: 'Дата изменения',
			typ: 'Дата',
			visible: true,
			readonly: false,
			selected: false,
		},
		{
			id: 7,
			type: 'text',
			label: 'Название',
			name: 'Название',
			typ: 'Строка',
			visible: true,
			readonly: false,
			selected: false,
		},
		{
			id: 8,
			type: 'textarea',
			label: 'Содержание',
			name: 'Содержание',
			typ: 'Текст',
			visible: true,
			readonly: false,
			selected: false,
		},
	])
	const fieldsVisible = computed(() => {
		return fields.filter((item) => item.visible)
	})

	const fieldLength = computed(() => {
		return fieldsVisible.value.length
	})
	const addField = (e: Field) => {
		fields.push(e)
	}

	// const removeSection = (e: number) => {
	// 	console.log('remove')
	// 	layout.splice(e, 1)
	// }
	const setDragType = (e: number) => {
		dragType.value = e
	}

	const unselectBlock = () => {
		layout.map((item) => {
			item.selected = false
		})
	}

	const mode = ref('phone')

	const move = ref(false)
	const toggleMove = () => {
		move.value = !move.value
	}

	const preview = ref(false)

	const togglePreview = () => {
		preview.value = !preview.value
	}
	const calcMode = (e: string) => {
		if (mode.value == e) {
			return 'selected'
		} else return ''
	}
	const setMode = (e: string) => {
		mode.value = e
	}

	const allLayouts = ref<LayoutSet[]>([])

	const saveLayout = (e: string, l: Layout[]) => {
		let old = allLayouts.value.find((el) => el.form == e)
		if (!!old) {
			old.layout = [...l]
		} else {
			let tmp = {
				form: e,
				layout: [...l],
			}
			allLayouts.value.push(tmp)
		}
	}

	return {
		layout,
		dragType,
		fields,
		fieldsVisible,
		fieldLength,
		mode,
		move,
		preview,
		forms,
		index,

		allLayouts,
		saveLayout,

		// addSection,
		// removeSection,
		setDragType,
		unselectBlock,
		togglePreview,
		calcMode,
		setMode,
		toggleMove,
		addField,
		// addColumns,
		// addHead,
	}
})
