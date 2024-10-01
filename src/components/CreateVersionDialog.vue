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
const ind = ref(3)
const versions = ref([
	{
		id: 2,
		version: '2.0',
		created: '13.11.23',
		published: '21.11.23',
		author: 'Орлов П.С.',
		comment: 'Отпуска отдела тестирования',
	},
	{
		id: 1,
		version: '1.0',
		created: '28.09.23',
		published: '18.10.23',
		author: 'Орлов П.С.',
		current: true,
		comment: 'Доработки формы создания',
	},
	{
		id: 0,
		version: '0.0',
		created: '20.06.23',
		published: '23.06.23',
		author: 'Орлов П.С.',
		comment: 'Стартовая версия',
	},
])
const selected = ref()

const select = (e: number) => {
	selected.value = e
}
</script>

<template lang="pug">
q-dialog(v-model="modelValue")
	q-card(style="max-width: 900px;")
		q-btn.close(round color="negative" icon="mdi-close" v-close-popup)
		q-card-section
			.text-h6 История версий "{{ app.text }}"
		q-card-section
			// div Выберите источник для новой версии
			q-markup-table(flat)
				thead
					tr
						th Версия
						th Дата создания
						th Дата публикации
						th Автор
						th Комментарий
						th
				tbody
					tr(v-for="version in versions" :key='version.id' @click='select(version.id)' :class='{selected: selected == version.id}')
						td
							q-icon(v-if='version.current' name="mdi-chevron-right" color="primary" size='16px')
							span {{ version.version }}
						td {{ version.created }}
						td {{ version.published }}
						td {{ version.author }}
						td {{ version.comment }}
						td
							div(v-if='version.current') текущая

		q-card-actions.q-mx-md.q-mb-md(align="right")
			q-btn(flat color="primary" label="Отмена" v-close-popup) 
			q-btn(unelevated color="primary" label="Создать версию" @click="action") 
</template>

<style scoped lang="scss">
.selected {
	background: var(--bg-selected);
}
</style>
