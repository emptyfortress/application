<script setup lang="ts">
const props = defineProps({
	id: {
		type: String,
		default: 'test',
	},
})
</script>

<template lang="pug">
q-page(padding)
	h4 {{ props.id }}
</template>

<style scoped lang="scss"></style>
