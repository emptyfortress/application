<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue'

const props = defineProps({
	id: {
		type: String,
		default: 'test',
	},
})
</script>

<template lang="pug">
q-page(padding)
	.grid
		div
			h4 {{ props.id}}
			.text-subtitle1 Здесь описание приложения
		.bl
			.text-overline модуль
			.big Web-клиент

		.q-gutter-x-sm
			q-btn(flat  round icon="mdi-pencil" color="primary" @click="action") 
				q-tooltip Редактировать
			q-btn(flat  round icon="mdi-content-duplicate" color="primary" @click="action") 
				q-tooltip Дублировать
			q-btn(unelevated color="negative" label="Удалить приложение" @click="action") 

	br
	br
	.podzag Настройки приложения
	.grid1
		.blo
			.txt Сценарии
			q-icon(name="mdi-movie-open" color="blue-grey-2" size="xl")
		.blo
			.txt Роли
			SvgIcon.icon(name="mask1" color="#cfd8dc")
		.blo
			.txt Процессы
			q-icon(name="mdi-shuffle-variant" color="blue-grey-2" size="xl")
		.blo
			.txt Субъекты
			SvgIcon.icon(name="subject" color="#cfd8dc")
		.blo
			.txt Реестры
			SvgIcon.icon(name="sheet" color="#cfd8dc")

</template>

<style scoped lang="scss">
.txt {
	text-transform: uppercase;
	color: $secondary;
}
.grid {
	display: grid;
	grid-template-columns: 2fr 1fr auto;
	// justify-items: start;
	align-items: center;
	column-gap: 1rem;
	row-gap: 0.5rem;
}
.big {
	font-size: 1.2rem;
}
.text-overline {
	line-height: 1;
}
.podzag {
	font-size: 1.1rem;
	margin-bottom: 1rem;
	// font-weight: 300;
}
.grid1 {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	// justify-items: start;
	// align-items: stretch;
	column-gap: 1rem;
	// div {
	// 	width: 100%;
	// 	height: 150px;
	// 	// background: #efefef;
	// }
}
.blo {
	border-radius: 0.5rem;
	cursor: pointer;
	height: 150px;
	background: #fff;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	&:hover {
		border: 1px solid #ccc;
		box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
	}
}
</style>
