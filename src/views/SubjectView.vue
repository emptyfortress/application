<script setup lang="ts">
import { useStore } from '@/stores/store'

const store = useStore()
</script>

<template lang="pug">
q-page(padding)
	div {{ store.page }}
	h4 Субъекты
</template>
