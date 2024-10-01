<script setup lang="ts">
import { ref } from 'vue'
import { uid } from 'quasar'
import { useRoles } from '@/stores/roles'
import { useForms } from '@/stores/forms'
import { useStorage } from '@vueuse/core'
import PublishDialog from '@/components/PublishDialog.vue'

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

// const emit = defineEmits(['create'])

// const allroles = useStorage('roles', {})
const app = useStorage('app', localStorage)

// const myrole = useRoles()

const ind = ref(3)
const create = (data: any) => {
	// console.log(data)
	let tmp = {
		id: ind.value,
		version: `${ind.value}.0`,
		created: '25.11.24',
		published: '',
		author: 'Орлов П.С.',
		current: false,
	}
	versions.value.unshift(tmp)
	ind.value += 1

	// modelValue.value = false
}

const versions = ref([
	{
		id: 2,
		version: '2.0',
		created: '13.11.23',
		published: null,
		author: 'Орлов П.С.',
		comment: '',
		current: true,
	},
	{
		id: 1,
		version: '1.0',
		created: '28.09.23',
		published: '18.10.23',
		author: 'Орлов П.С.',
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
const selected = ref(2)

const select = (e: number) => {
	selected.value = e
}
const dialog2 = ref(false)

const publish = (e: string) => {
	dialog2.value = false
	versions.value[0].published = '25.11.24'
	versions.value[0].comment = e
	// versions.value[0].current = false
	// let tmp = {
	// 	id: ind.value,
	// 	version: `${ind.value}.0`,
	// 	created: '25.11.24',
	// 	published: '',
	// 	author: 'Кто здесь',
	// 	current: true,
	// }
	// versions.value.unshift(tmp)
	// ind.value += 1
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
						td
							span(v-if='version.published') {{ version.published }}
							q-btn(v-else unelevated color="primary" label="Опубликовать" @click.stop="dialog2 = true" size='sm') 
						td {{ version.author }}
						td {{ version.comment }}
						td
							div(v-if='version.current') текущая

		q-card-actions.q-mx-md.q-mb-md(align="right")
			// q-btn(flat color="primary" label="Отмена" v-close-popup) 
			q-btn(flat color="primary" label="Создать версию на основе выбранной" @click="create") 
			q-btn(unelevated color="primary" label="Выбрать" v-close-popup) 

	PublishDialog(v-model="dialog2" @create='publish')
</template>

<style scoped lang="scss">
.selected {
	background: var(--bg-selected);
}
</style>
