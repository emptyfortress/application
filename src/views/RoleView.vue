<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/stores/store'
import Roles from '@/components/Roles.vue'

const store = useStore()
</script>

<template lang="pug">
q-page(padding)
	div {{ store.page }}
	h4 Роли
	br
	Roles
</template>

<style scoped lang="scss"></style>
