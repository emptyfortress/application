<script setup lang="ts">
import { ref } from 'vue'

const act = () => {
	console.log(111)
}

const sel = ref(false)
const arr = [1, 1, 1, 2, 3]
const unique = arr.filter((item, index) => arr.indexOf(item) === index)
// fibonachi number
</script>

<template lang="pug">
div(v-if='sel') laksjdl
</template>

<style scoped lang="scss"></style>
