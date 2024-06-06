<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'

const big = ref(false)

const toggle = () => {
	big.value = !big.value
}
const full = ref(false)

const active = ref(0)

const emit = defineEmits(['active', 'inactive'])

const expand = (e: number) => {
	if (active.value == e) {
		active.value = 0
		full.value = false
		emit('inactive')
	} else {
		full.value = true
		active.value = e
		emit('active')
	}
}

const pages = [
	{ id: 0, name: 'Процесс', icon: 'shuffle' },
	{ id: 1, name: 'Формы', icon: 'subject' },
	{ id: 2, name: 'Роли', icon: 'user' },
	{ id: 3, name: 'Списки', icon: 'sheet' },
]
</script>

<template lang="pug">
.grido(ref="grid" :class="{full : full}")
	.item(v-for="page in pages" :key="page.id")
		.txt {{ page.name }}
		SvgIcon.icon(:name="page.icon")

</template>

<style scoped lang="scss">
.grido {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	gap: 0.5rem;
	.item {
		cursor: pointer;
		background-color: white;
		padding: 1rem;
		height: 200px;
		position: relative;
		color: $secondary;
		.icon {
			position: absolute;
			bottom: 1rem;
			left: 1rem;
		}
		&:hover {
			border: 1px solid #ccc;
			box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
			color: $primary;
		}
	}
}

.txt {
	text-align: center;
	text-transform: uppercase;
}
</style>
