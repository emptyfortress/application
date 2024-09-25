<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoles } from '@/stores/roles'
import RoleRulesDialog from '@/components/RoleRulesDialog.vue'

const myrole = useRoles()

const role = ref()
const dialog = ref(false)
</script>

<template lang="pug">
.q-ma-md(v-if='!!myrole.selectedRole')
	.hd {{ myrole.selectedRole.name }}

	.other(v-if='myrole.selectedRole.name == "Все остальные"') Все остальные роли, не указанные явно.

	.ini(v-else)
		label Название роли:
		.val
			span {{ myrole.selectedRole.name }}
			q-popup-edit(v-model="myrole.selectedRole.name" title="Название роли" auto-save v-slot="scope")
				q-input(v-model="scope.value" dense autofocus counter @keyup.enter="scope.set")
		label Правила выбора:
		.val(@click='dialog = true')
			span(v-if='!!myrole.selectedRole.pers') {{ myrole.selectedRole.pers }}
			q-btn(v-else unelevated color="primary" label="Задать" size='sm') 

	RoleRulesDialog(v-model="dialog" :role='myrole.selectedRole.name' :pers='myrole.selectedRole.pers')
</template>

<style scoped lang="scss">
.hd {
	font-size: 1.1rem;
	font-weight: 600;
}
.dis {
	background: #ffefcc;
}
.ini {
	display: grid;
	grid-template-columns: auto 1fr;
	column-gap: 1rem;
	row-gap: 0.5rem;
}
.val {
	color: $primary;
	span {
		border-bottom: 1px dotted blue;
		cursor: pointer;
	}
}
</style>
