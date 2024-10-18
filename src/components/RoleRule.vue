<script setup lang="ts">
import { ref, } from 'vue'
import { useRoles } from '@/stores/roles'
import RoleRulesDialog from '@/components/RoleRulesDialog.vue'
import { useStorage } from '@vueuse/core'
import FormaLine from '@/components/FormaLine.vue'

const app = useStorage('app', localStorage)
const myrole = useRoles()

const role = ref()
const dialog = ref(false)
</script>

<template lang="pug">
.q-ma-md(v-if='!!myrole.selectedRole')
	.hd {{ myrole.selectedRole.name }}

	.ini
		label Название роли:
		.val
			span {{ myrole.selectedRole.name }}
			q-popup-edit(v-model="myrole.selectedRole.name" title="Название роли" auto-save v-slot="scope")
				q-input(v-model="scope.value" dense autofocus counter @keyup.enter="scope.set")

		label Правила определения роли:
		div(v-if='myrole.selectedRole.id == "Lane_0kutmjb"')
			.des Сотрудник, создавший заявление на отпуск
			.sma Роль существует по умолчанию не может быть удалена.
		.val(v-else @click='dialog = true')
			span(v-if='!!myrole.selectedRole.pers') {{ myrole.selectedRole.pers }}
			q-btn(v-else unelevated color="primary" label="Задать" size='sm') 

	q-separator.q-my-md
	// div Данная роль видит следующую форму, при просмотре через реестр.
	div Форма, для показа <span class='text-bold text-uppercase'>{{ app.card }}</span> через реестр
	.grid
		FormaLine

	RoleRulesDialog(v-model="dialog" :role='myrole.selectedRole.name' :pers='myrole.selectedRole.pers')
</template>

<style scoped lang="scss">
.grid {
	padding: 0 1rem;
	display: grid;
	grid-template-columns: auto 2fr;
	align-items: center;
	column-gap: 2rem;
	row-gap: 1rem;
	line-height: 1.1;
}

.hd {
	font-size: 1.1rem;
	font-weight: 600;
}

.dis {
	background: #ffefcc;
}

.ini {
	display: grid;
	grid-template-columns: 120px 1fr;
	column-gap: 1rem;
	row-gap: 1rem;
	line-height: 1.2;
}

.val {
	color: $primary;

	span {
		border-bottom: 1px dotted blue;
		cursor: pointer;
	}
}

.des {
	font-weight: 600;
	margin-bottom: 1rem;
}

.sma {
	font-size: 0.8rem;
}
</style>
