const req = [(val: string) => (val && val.length > 0) || 'Это обязательное поле']
const reqnum = [(val: number) => val >= 0 || 'Недопустимое значение']
const reqtrue = [() => true || 'always true']

const randomArray = (length: number, min: number, max: number) => {
	let result = []
	while (result.length < length) {
		let random = Math.floor(Math.random() * (max - min + 1) + min)
		result.push(random)
	}
	return result
}

const randomNumber = (min: number, max: number, fixed: number) => {
	return (Math.random() * (max - min + 1) + min).toFixed(fixed)
}

const getMembers = (members: any[]): any[] => {
	let children = [] as any[]
	return members
		.map((mem) => {
			const m = { ...mem } // use spread operator
			if (m.children && m.children.length) {
				children = [...children, ...m.children]
			}
			delete m.children // this will not affect the original array object
			return m
		})
		.concat(children.length ? getMembers(children) : children)
}
const filterByLabel = (array: any, searchTerm: string) => {
	return array.reduce((prev: any, curr: any) => {
		const children = curr.children ? filterByLabel(curr.children, searchTerm) : undefined
		const even = (elem: any) => elem.toLowerCase().includes(searchTerm.toLowerCase())

		return curr.text?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			children?.length > 0 ||
			curr.parents?.some(even) ||
			curr.type == 0
			? [...prev, { ...curr, children }]
			: prev
	}, [])
}
const filterByKind = (array: any, searchTerm: number) => {
	return array.reduce((prev: any, curr: any) => {
		const children = curr.children ? filterByKind(curr.children, searchTerm) : undefined
		const even = (elem: any) => {
			elem == searchTerm ? true : false
		}

		return curr.kind == searchTerm || children?.length > 0 || curr.parents?.some(even)
			? [...prev, { ...curr, children }]
			: prev
	}, [])
}
const filterByCommon = (array: any, searchTerm: boolean) => {
	return array.reduce((prev: any, curr: any) => {
		const children = curr.children ? filterByCommon(curr.children, searchTerm) : undefined

		return curr.common !== searchTerm || children?.length > 0
			? [...prev, { ...curr, children }]
			: prev
	}, [])
}
const filterByArray = (array: any, searchTerm: string[]) => {
	return array.reduce((prev: any, curr: any) => {
		const children = curr.children ? filterByArray(curr.children, searchTerm) : undefined
		const odd = (elem: string) => (elem == curr.text ? true : false)

		const even = (elem: string) =>
			curr.parents?.some((item: string) => item == elem) ? true : false

		return searchTerm.some(odd) || searchTerm.some(even) || children?.length > 0
			? [...prev, { ...curr, children }]
			: prev
	}, [])
}

export {
	req,
	reqnum,
	reqtrue,
	randomNumber,
	randomArray,
	getMembers,
	filterByLabel,
	filterByKind,
	filterByCommon,
	filterByArray,
}
