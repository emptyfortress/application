<script setup lang="ts">
import { useForms } from '@/stores/forms'

const myform = useForms()
</script>

<template lang="pug">
.status
	span Статус:
	.stat {{ myform.status.join(', ') }}
</template>

<style scoped lang="scss">
.stat {
	display: inline-block;
	text-align: center;
	padding: 1px 8px;
	border: 3px double #aaa;
	color: $primary;
	margin-left: .5rem;
}

.status {
	background: #eee;
	padding: .3rem 1rem;
	font-size: .8rem;
	border-top: 1px solid #ccc;

}
</style>
