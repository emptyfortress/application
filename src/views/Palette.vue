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
	h2 {{props.id}}
	.row
		.divi.pri
		.divi.sec
		.divi.acc
		.divi.dark
		.divi.pos
		.divi.neg
		.divi.info
		.divi.warn
</template>

<style scoped lang="scss">
h2 {
	color: $secondary;
}
.divi {
	width: 100px;
	height: 100px;
}
.pri {
	background: $primary;
}
.sec {
	background: $secondary;
}
.acc {
	background: $accent;
}
.dark {
	background: $dark;
}
.pos {
	background: $positive;
}
.neg {
	background: $negative;
}
.info {
	background: $info;
}
.warn {
	background: $warning;
}
</style>
