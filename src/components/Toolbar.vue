<script setup lang="ts">
import { ref } from 'vue'
import { useLayoutStore } from '@/stores/layout'

const lstore = useLayoutStore()

const preview = () => {
	const url = 'https://medium.com'
	window.open(url, '_blank')!.focus()
}
</script>

<template lang="pug">
.square(@click='lstore.toggleMove' :class='{selected: lstore.move}')
	q-icon(name="mdi-arrow-all" size='18px') 
	q-tooltip.bg-primary(anchor="center right" self="center left") Двигать блоки

br
.square(@click='lstore.setMode("phone")' :class='lstore.calcMode("phone")')
	q-icon(name="mdi-cellphone" size='18px') 
	q-tooltip.bg-primary(anchor="center right" self="center left") Телефон
.square(@click='lstore.setMode("tablet")' :class='lstore.calcMode("tablet")')
	q-icon(name="mdi-tablet" size='18px') 
	q-tooltip.bg-primary(anchor="center right" self="center left") Планшет
.square(@click='lstore.setMode("desk")' :class='lstore.calcMode("desk")')
	q-icon(name="mdi-monitor" size='18px') 
	q-tooltip.bg-primary(anchor="center right" self="center left") Десктоп
br
.square(@click='preview')
	q-icon(name="mdi-eye" size='18px') 
	q-tooltip.bg-primary(anchor="center right" self="center left") Превью
</template>

<style scoped lang="scss">
.square {
	background: #fefefe;
	text-align: center;
	margin-bottom: 1px;
	.q-icon {
		transform: translateY(-2px);
	}
	&.selected {
		background: $primary;
		.q-icon {
			color: #fff;
		}
	}
}
</style>
