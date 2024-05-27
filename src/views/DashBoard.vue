<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SvgIcon from '@/components/SvgIcon.vue'
import { useStore } from '@/stores/store'
import { wrapGrid } from 'animate-css-grid'

const props = defineProps({
	id: {
		type: String,
		default: 'test',
	},
})

const grid = ref()
onMounted(() => {
	wrapGrid(grid.value, {})
})
const router = useRouter()
const route = useRoute()

const goto = (e: string) => {
	const url = '/app/' + props.id + '/' + e
	router.push(url)
}
const store = useStore()
store.setPage(props.id)

const version = ref('0.1.0')
const padding = ref(true)

const roleMax = ref(false)
const setRole = () => {
	padding.value = !padding.value
	roleMax.value = !roleMax.value
}
const calcH = computed(() => {
	return padding.value == false ? 'expand' : ''
})
const calcP = computed(() => {
	return padding.value == false ? 'expand' : ''
})
const calcHide = computed(() => {
	return padding.value == false ? 'hide' : ''
})

onMounted(() => {
	wrapGrid(grid.value)
})
watch(roleMax, (val) => {
	if (val) {
		console.log(22222)
	}
})
</script>

<template lang="pug">
q-page(:padding="padding")
	.grid
		div
			h4(:class="calcH") {{ props.id}}
			.text-subtitle1(:class="calcHide") Простые служебные записки
		.bl
			.text-overline version
			.big
				q-icon(name="mdi-source-branch" color="primary")
				span.q-ml-sm v. 0.1.0
					q-menu
						q-list
							q-item(clickable)
								q-item-section v.0.2.0
							q-item(clickable)
								q-item-section v.1.1.0

		.q-gutter-x-sm
			q-btn(flat  round icon="mdi-pencil" color="primary" @click="") 
				q-tooltip Редактировать
			q-btn(flat  round icon="mdi-content-duplicate" color="primary" @click="") 
				q-tooltip Дублировать
			q-btn(unelevated color="negative" label="Удалить приложение" @click="") 

	.podzag(:class="calcP") Настройки приложения

	.grida(ref="grid" :class="{role : roleMax}")
		.blo.left(@click="setRole" :class="{max : roleMax}")
				// .txt Роли
				// SvgIcon.icon(name="mask1" color="#cfd8dc")
		.blo(@click="")
			// .txt Процессы
			// q-icon(name="mdi-shuffle-variant" color="blue-grey-2" size="xl")
		.blo(@click="")
			// .txt Карточки
			// SvgIcon.icon(name="subject" color="#cfd8dc")
		.blo(@click="")
			// .txt Реестры
			// SvgIcon.icon(name="sheet" color="#cfd8dc")

</template>

<style scoped lang="scss">
.grida {
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr;
	gap: 1rem;
	// &.role {
	// 	grid-template-columns: 1fr;
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
	&.max {
		grid-column: 1/-1;
		height: 400px;
	}
}
h4 {
	transition: 0.2s ease all;
	&.expand {
		font-size: 1.2rem;
		font-weight: 600;
	}
}
.q-page {
	transition: 0.2s ease all;
}
.txt {
	text-transform: uppercase;
	color: $secondary;
}
.grid {
	display: grid;
	grid-template-columns: 2fr 1fr auto;
	align-items: center;
	column-gap: 1rem;
	row-gap: 0.5rem;
}
.big {
	font-size: 1.2rem;
	color: $primary;
	cursor: pointer;
}
.text-overline {
	line-height: 1;
}
.hide {
	display: none;
}
.podzag {
	font-size: 1.1rem;
	margin-bottom: 1rem;
	margin-top: 3rem;
	transition: 0.2s ease all;
	&.expand {
		margin-top: 0;
	}
	// font-weight: 300;
}
</style>
