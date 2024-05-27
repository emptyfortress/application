<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SvgIcon from '@/components/SvgIcon.vue'
import { useStore } from '@/stores/store'
import Flip from '@/components/Flip.vue'

const props = defineProps({
	id: {
		type: String,
		default: 'test',
	},
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
</script>

<template lang="pug">
q-page(padding)
	.grid
		div
			h4 {{ props.id}}
			.text-subtitle1 Простые служебные записки
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

	.podzag Настройки приложения
	Flip

</template>

<style scoped lang="scss">
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
