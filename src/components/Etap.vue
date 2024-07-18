<script setup lang="ts">
import FormTop from '@/components/FormTop.vue'
import FormLayout from '@/components/FormLayout.vue'
</script>

<template lang="pug">
.bl
	FormTop
	FormLayout

</template>

<style scoped lang="scss">
.bl {
	background: #fff;
	min-height: var(--panel-height);
	padding: 1rem;
	margin-right: 0.25rem;
	position: relative;
}
</style>
