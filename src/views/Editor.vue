<script setup lang="ts">
import { ref } from 'vue'
// import { useRoute, useRouter } from 'vue-router'
import PropertyPanel from '@/components/PropertyPanel.vue'
// import VueDraggableResizable from 'vue-draggable-resizable'
// import { useForms } from '@/stores/forms'
// import { gsap } from 'gsap'
// import { useStore } from '@/stores/store'

const split = ref(70)
</script>

<template lang="pug">
q-page
	q-splitter.split(v-model="split" :limits="[10, 100]")
		template(v-slot:before)
			router-view
		template(v-slot:after)
			PropertyPanel

</template>

<style scoped lang="scss">
.split {
	height: var(--panel-height);
}
.q-page {
	padding-right: 1rem;
}
.q-card {
	height: 100%;
	overflow: hidden;
}
.bar {
	height: 26px;
	background: #dedede;
	text-align: center;
	font-size: 0.9rem;
	line-height: 26px;
}
.fuck {
	border: 1px solid #aaa;
}
</style>
