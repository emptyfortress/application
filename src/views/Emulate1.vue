<script setup lang="ts">
import { ref, onMounted } from 'vue'
import VueDraggableResizable from 'vue-draggable-resizable'
import FormTopEmulate from '@/components/FormTopEmulate.vue'
import { useRouter, useRoute } from 'vue-router'
import { useForms } from '@/stores/forms'
import FormEmulate1 from '@/components/FormEmulate1.vue'
import { gsap } from 'gsap'

const route = useRoute()
const myform = useForms()

const role = ref('Инициатор')
const options = ref([role.value, 'Все остальные'])

const etap = ref(myform.currentBO.name)

const next = (e: string, r: string) => {
	etap.value = e
	role.value = r
	options.value = [r, 'Все остальные']
}

const nav = ref(true)
const closeNav = () => {
	nav.value = false
}

onMounted(() => {
	gsap.from('.fuck', {
		delay: 0.5,
		x: -600,
		opacity: 0,
		ease: 'expo.out',
	})
})
</script>

<template lang="pug">
q-page

	.preview
		.center
			div
				|этап:
				span.text-bold.q-ml-md {{ etap }}
			div
			div роль:
			q-select(v-model="role" dense fulled :options='options')

		template(v-if='route.params.pag == "1"')
			FormTopEmulate(@setEtap='next')
			FormEmulate1

	Teleport(to="body" v-if='nav')
		vue-draggable-resizable.fuck(:x="100" :y="-300" :w="250" :h="150" :active="false" :z="2000" :handles='["br"]' drag-handle='.bar')
			q-card(flat)
				.bar
					div Навигация
					q-icon(name="mdi-close" @click='closeNav')
				q-img(src='/empty.png')
</template>

<style scoped lang="scss">
.preview {
	width: 600px;
	margin: 1rem auto;
	height: 400px;
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

.tool {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.center {
	display: flex;
	gap: 1rem;
	align-items: center;
}

.bar {
	height: 26px;
	background: #dedede;
	padding: 0 6px;
	font-size: 0.9rem;
	line-height: 26px;
	display: flex;
	justify-content: space-between;
	align-items: center;

	.q-icon {
		cursor: pointer;
	}
}
</style>
