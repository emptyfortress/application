import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', () => {
	const index = ref(2)
	const colNum = ref(12)
	const dragType = ref(0)
	const layout = reactive([
		{
			x: 0,
			y: 0,
			w: 6,
			h: 6,
			i: 0,
			selected: false,
			data: {},
		},
	])

	const addSection = () => {
		layout.push({
			x: (layout.length * 3) % (colNum.value || 12),
			y: layout.length + (colNum.value || 12), // puts it at the bottom
			w: 3,
			h: 3,
			i: index.value,
			selected: false,
			data: {},
		})
		index.value += 1
	}
	const removeSection = (e: number) => {
		layout.splice(e, 1)
	}
	const setDragType = (e: number) => {
		dragType.value = e
	}

	const unselectBlock = () => {
		layout.map((item) => {
			item.selected = false
		})
	}

	return { layout, addSection, removeSection, setDragType, dragType, unselectBlock }
})
