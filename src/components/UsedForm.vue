<script setup lang="ts">
import { ref, computed } from 'vue'
import { useForms } from '@/stores/forms'
import { useRoute } from 'vue-router'

const route = useRoute()

const myform = useForms()

const form = ref(route.params.etap)

// const list = computed(() => {
// 	return myform.conditionList.reduce((result, current) => {
// 		let groupKey = form.value
// 		if (!result[groupKey]) {
// 			result[groupKey] = []
// 		}
// 	}, [])
// })

</script>

<template lang="pug">
.q-pa-md.text-bold Свойства формы
pre {{ myform.conditionList }}
// div {{ form }}

</template>

<style scoped lang="scss"></style>
