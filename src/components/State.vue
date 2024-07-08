<script setup lang="ts"></script>

<template lang="pug">
.state.parent
	.div1 Роль/состояние
	.div2 Новая
	.div3 В работе
	.div4 Завершена

	.div5 Инициатор
	.div6 Руководитель
	.div7 Исполнитель
	.div8 Все остальные

	.div9 P1
	.div10 P5
	.div11 h
	.div12 P2
	.div13 P6
	.div14 P1
</template>

<style scoped lang="scss">
.state {
	height: var(--panel-height);
	// background: #fff;
	display: grid;
	margin-right: 4px;
}
.parent {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: 100px 1fr 1fr 1fr 1fr;
	grid-column-gap: 0.5rem;
	grid-row-gap: 0.5rem;
	div {
		// background: #fff;
		display: grid;
		place-items: center;
	}
}

.div1 {
	grid-area: 1 / 1 / 2 / 2;
	background: #fff;
}
.div2 {
	grid-area: 1 / 2 / 2 / 3;
	background: #fff;
}
.div3 {
	grid-area: 1 / 3 / 2 / 4;
	background: #fff;
}
.div4 {
	grid-area: 1 / 4 / 2 / 5;
	background: #fff;
}
.div5 {
	grid-area: 2 / 1 / 3 / 2;
	background: #fff;
}
.div6 {
	grid-area: 3 / 1 / 4 / 2;
	background: #fff;
}
.div7 {
	grid-area: 4 / 1 / 5 / 2;
	background: #fff;
}
.div8 {
	grid-area: 5 / 1 / 6 / 2;
	background: #fff;
}
.div9 {
	grid-area: 2 / 2 / 3 / 3;
	background: pink;
}
.div10 {
	grid-area: 2 / 3 / 4 / 4;
	background: $blue-2;
}
.div11 {
	grid-area: 2 / 4 / 5 / 5;
	background: $blue-grey-3;
}
.div12 {
	grid-area: 3 / 2 / 5 / 3;
	background: $warning;
}
.div13 {
	grid-area: 4 / 3 / 5 / 4;
	background: $green-3;
}
.div14 {
	grid-area: 5 / 2 / 6 / 5;
	background: pink;
}
</style>
