<script setup lang="ts">
import Text1 from '@/components/Text1.vue'

const props = defineProps({
	req: {
		type: String,
		required: true,
	},
})
</script>

<template lang="pug">
.bl
	Text1(:req='props.req')
</template>

<style scoped lang="scss"></style>
