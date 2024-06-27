<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SvgIcon from '@/components/SvgIcon.vue'
import { useStore } from '@/stores/store'
import Swap from '@/components/Swap.vue'

const props = defineProps({
	id: {
		type: String,
		default: 'test',
	},
})

const router = useRouter()
const route = useRoute()
const store = useStore()

const currentApp = computed(() => {
	return store.appList.find((item) => item.name == props.id)
})

store.setApp(currentApp.value!)
</script>

<template lang="pug">
q-page(padding)
	.container
		.grid
			div
				h4 {{ currentApp.name }}
				.text-subtitle1 {{ currentApp.descr }}
			transition(name="fade")
				.bl
					.text-overline version
					.big
						q-icon(name="mdi-source-branch" color="primary")
						span.q-ml-sm v. {{currentApp.version }}
							q-menu
								q-list
									q-item(clickable)
										q-item-section v.0.2.0
									q-item(clickable)
										q-item-section v.1.1.0

			transition(name="fade")
				.q-gutter-x-sm
					q-btn(flat  round icon="mdi-pencil" color="primary" @click="") 
						q-tooltip Редактировать
					q-btn(flat  round icon="mdi-content-duplicate" color="primary" @click="") 
						q-tooltip Дублировать
					q-btn(unelevated color="negative" label="Удалить приложение" @click="") 

		.podzag Настройки приложения
		Swap

</template>

<style scoped lang="scss">
.container {
	max-width: 1000px;
	margin: 0 auto;
}
h4 {
	transition: 0.2s ease all;
	&.expand {
		font-size: 1.2rem;
		font-weight: 600;
	}
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
}
</style>
