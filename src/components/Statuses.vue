<script setup lang="ts">
import { ref } from 'vue'
import { useForms } from '@/stores/forms'
import draggable from 'vuedraggable'
import CreateDialog from '@/components/CreateDialog.vue'

const myform = useForms()

const selection = ref('')

const select = (e: Role) => {
	selection.value = e.name
	// myrole.selectRole(e)
}

const dialog = ref(false)

</script>

<template lang="pug">
.bl
	h5 Статусы
	q-list(separator)
		draggable(
			class="list-group"
			:list="myform.status"
			itemKey="id")

			template(#item="{ element, index }")
				q-item.node(@click='select(element)' clickable :class='{ selected: selection == element.name }')
					q-item-section(avatar)
						q-icon(name="mdi-circle-medium")
					q-item-section() {{ element.label }}
					q-item-section(side)
						q-btn(flat round dense icon="mdi-trash-can-outline" @click="myform.removeStatus(index)" size="sm") 

	br
	q-btn(unelevated color="primary" label="Добавить" @click="dialog = !dialog") 

CreateDialog(v-model="dialog" mode='status')
</template>

<style scoped lang="scss"></style>
