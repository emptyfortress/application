<script setup lang="ts">
import FormTop from '@/components/FormTop.vue'
import FormLayout from '@/components/FormLayout.vue'
</script>

<template lang="pug">
.bl
	FormTop
	FormLayout
	q-btn.prev(color="primary" label="Просмотр" size="sm") 
	q-btn.help(round color="primary" icon="mdi-help" size="sm") 

</template>

<style scoped lang="scss">
.bl {
	background: #fff;
	min-height: var(--panel-height);
	padding: 1rem;
	margin-right: 0.25rem;
	position: relative;
}
.help {
	position: absolute;
	bottom: 1rem;
	right: 1rem;
}
.prev {
	position: absolute;
	bottom: 1rem;
	left: 1rem;
}
</style>
