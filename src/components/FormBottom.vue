<script setup lang="ts">
import { useForms } from '@/stores/forms'

const modelValue = defineModel()

const myform = useForms()
</script>

<template lang="pug">
.done
	q-btn(flat color="primary" label="Отмена")
	q-btn(unelevated color="primary" label="Сохранить") 


</template>

<style scoped lang="scss">
.all {
	container-type: inline-size;
}
.done {
	background: #eee;
	padding: 1rem;
	text-align: center;
}
</style>
