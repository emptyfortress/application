<script setup lang="ts">
import { ref, computed } from 'vue'
import { useForms } from '@/stores/forms'
import { useRoute } from 'vue-router'

const route = useRoute()

const myform = useForms()

const form = ref(route.params.etap)

const list = computed(() => {
	return myform.conditionList.reduce((result: any[], current: any) => {
		if (current.form == form.value) {
			result.push(current.etap)
		}
		return result
	}, [])
})

</script>

<template lang="pug">
.q-pa-md.text-bold Форма "{{ form }}" используется в следующих этапах:
q-list()
	q-item(dense v-for="(item, index) in list")
		q-item-section(side) {{ index + 1 }}
		q-item-section
			q-item-label {{ item }}

</template>

<style scoped lang="scss"></style>
