type Field = {
	id: number
	type: string
	label: string
	name: string
	typ: string
	readonly: boolean
	visible: boolean
	options: string[]
	selected: boolean
}

interface BusinessObject {
	id: string
	type: string
	name: string
}

interface App {
	id: string
	name: string
	title: string
	version: string
	descr: string
	author: string
	created: string
	icon?: number
}

interface NodeData {
	id: string
	text: string
	text1: string
	// text2: string
	// text3?: string
	// inp?: string
	// edit?: boolean
	attribute?: boolean
	selected?: boolean
	// restrict?: boolean
	// icon?: string
	type: number
	// typ?: boolean
	// drop?: boolean
	// drag?: boolean
	// parents?: string[]
	// fields: Select[]
	// man?: boolean
	// date?: boolean
	// state?: boolean
	// ruk?: boolean
	// vis?: boolean
	// check?: boolean
	// sort?: boolean
	// label?: string
	// inp?: boolean
	// focus?: boolean
	// kind?: number
	// synparents: string[]
	// syn: string[]
}

interface Stat {
	data: NodeData
	open: boolean // Is opened.
	parent: Stat<T> | null // Parent stat.
	children: Stat<T>[] // Children stats.
	level: number // Level start from 1.
	isStat: boolean // Detect if is stat object.
	hidden: boolean // If hidden.
	checked: boolean | null // If checked. null mean just some children checked.
	draggable: boolean | null // null means inherit parent.
	droppable: boolean | null // null means inherit parent.
	style: any // Customize node style. Vue's style format.
	class: any // Customize node class name. Vue's class format.
}

interface TreeNode {
	text: string
	text1?: string
	hidden: boolean
	type: number
	selected: boolean
	children?: TreeNode[]
}
