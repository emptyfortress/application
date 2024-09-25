<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoles } from '@/stores/roles'
import CreateDialog from '@/components/CreateDialog.vue'
import draggable from 'vuedraggable'

const myrole = useRoles()

const dialog = ref(false)

const selection = ref('')

const select = (e: Role) => {
	selection.value = e.name
	myrole.selectRole(e)
}
const list1 = ref(myrole.roles)

watch(
	() => myrole.roles,
	() => {
		list1.value = myrole.roles
	}
)
</script>

<template lang="pug">
.bl
	h5 Роли
	q-list(separator)
		draggable(
			class="list-group"
			:list="list1"
			itemKey="id")

			template(#item="{ element, index }")
				q-item.node(@click='select(element)' clickable :class='{selected: selection == element.name}')
					q-item-section(avatar)
						q-icon(name="mdi-guy-fawkes-mask")
					q-item-section(:class='{"text-bold" : element.type}') {{ element.name }}
					q-item-section(v-if='element.descr') {{ element.descr }}
					q-item-section(side v-if='element.type' )
						q-icon(v-if='element.type' name="mdi-shuffle-variant")
						q-tooltip Используется в процессе
					q-item-section(side v-else)
						q-btn(v-if='!element.type' flat round dense icon="mdi-trash-can-outline" @click="myrole.removeRole(role)" size="sm") 


	br
	q-btn(unelevated color="primary" label="Создать роль" @click="dialog = !dialog") 

CreateDialog(v-model="dialog" mode='role')

</template>

<style scoped lang="scss">
.q-item.selected {
	background: var(--bg-selected);
}
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
