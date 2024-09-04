<script setup lang="ts">
// import { useForms } from '@/stores/forms'
// import { useRouter, useRoute } from 'vue-router'
//
// const router = useRouter()
// const route = useRoute()
// const myform = useForms()
</script>

<template lang="pug">
.list
	.grid
		label Автор:
		div
			span Сидоров А.Г.
		label Исполнитель:
		div
			span Орлов П.А.
		label Описание:
		div
			span Это описание заявки, достаточно длинное, чтобы поместиться в text-area. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi aspernatur provident, optio voluptates doloribus unde nesciunt cumque ut! Ex a saepe commodi, inventore harum tempora necessitatibus voluptatibus. Neque, expedita delectus!

</template>

<style scoped lang="scss">
.list {
	border-top: 1px solid #ccc;
	padding: 0.5rem;
	background: #f5f5f4;
	min-height: 400px;
}
.grid {
	display: grid;
	grid-template-columns: auto 1fr;
	column-gap: 1rem;
	row-gap: 0.5rem;
}
.val {
	color: $primary;
	border-bottom: 1px dotted blue;
}
</style>
