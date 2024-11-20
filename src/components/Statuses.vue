<script setup lang="ts">
import { ref } from 'vue'
import { useForms } from '@/stores/forms'
import draggable from 'vuedraggable'
import CreateDialog from '@/components/CreateDialog.vue'

const myform = useForms()

const selection = ref('')

const select = (e: string) => {
	selection.value = e
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
				q-item.node(@click='select(element)' clickable :class='{ selected: selection == element }')
					q-item-section(avatar)
						q-icon(name="mdi-circle-medium")
					q-item-section() {{ element }}
					q-item-section(side)
						q-btn(flat round dense icon="mdi-trash-can-outline" @click="myform.removeStatus(index)" size="sm") 

	br
	q-btn(unelevated color="primary" label="Добавить" @click="dialog = !dialog") 

CreateDialog(v-model="dialog" mode='status')
</template>

<style scoped lang="scss">
.node {
	background: #fff;

	// cursor: pointer;
	&:not(:last-child) {
		border-bottom: 1px solid #ccc;
	}

	&.selected {
		background: var(--bg-selected);
	}
}
</style>
