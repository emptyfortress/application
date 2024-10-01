<script setup lang="ts">
import { ref } from 'vue'
import { uid } from 'quasar'
import { useRoles } from '@/stores/roles'
import { useForms } from '@/stores/forms'
import { useStorage } from '@vueuse/core'

// const props = defineProps({
// 	mode: {
// 		type: String,
// 		default: 'app',
// 	},
// })
const icon = ref(3)
const modelValue = defineModel<boolean>()
const myform = useForms()

const name = ref('Мое приложение')
const descr = ref('')

const close = () => {
	modelValue.value = false
}

const emit = defineEmits(['create'])

// const allroles = useStorage('roles', {})
const app = useStorage('app', localStorage)

// const myrole = useRoles()

const create = (data: any) => {
	console.log(data)
	modelValue.value = false
}
const versions = ref([
	{ id: 0, version: '0.0', created: '20.06.23', published: '23.06.23', author: 'Орлов П.С.' },
	{
		id: 1,
		version: '1.0',
		created: '28.09.23',
		published: '18.10.23',
		author: 'Орлов П.С.',
		current: true,
	},
	{ id: 2, version: '2.0', created: '13.11.23', published: '21.11.23', author: 'Орлов П.С.' },
])
const selected = ref()

const select = (e: number) => {
	selected.value = e
}
</script>

<template lang="pug">
q-dialog(v-model="modelValue")
	q-card(style="min-width: 400px;")
		q-btn.close(round color="negative" icon="mdi-close" v-close-popup)
		q-card-section
			.text-h6 Новая версия "{{ app.text }}"
		q-card-section
			div Выберите источник для новой версии
			q-markup-table(flat)
				thead
					tr
						th Версия
						th Дата создания
						th Дата публикации
						th Автор
						th
				tbody
					tr(v-for="version in versions" :key='version.id' @click='select(version.id)' :class='{selected: selected == version.id}')
						td {{ version.version }}
						td {{ version.created }}
						td {{ version.published }}
						td {{ version.author }}
						td
							div(v-if='version.current') текущая

		q-card-section
			FormKit(type="form" id="newapp" submit-label="Создать" @submit="create")
</template>

<style scoped lang="scss">
.selected {
	background: var(--bg-selected);
}
</style>
