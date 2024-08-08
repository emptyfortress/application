import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { useStore } from '@/stores/store'

declare module 'vue-router' {
	interface Bread {
		label?: string
		to?: string
		icon?: string
	}
	interface RouteMeta {
		title?: string
		bread?: Bread[]
		transition?: any
		mode?: any
	}
}

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
			children: [
				{
					path: ':id',
					name: 'start',
					component: () => import('@/components/Start.vue'),
					props: true,
				},
			],
		},
		{
			path: '/:id/editor',
			name: 'editor',
			component: () => import('@/views/Editor.vue'),
			props: true,
			children: [
				{
					path: 'process',
					name: 'Процесс',
					component: () => import('@/components/Process.vue'),
				},
				{
					path: 'forms',
					name: 'Формы',
					component: () => import('@/components/Forms.vue'),
				},
				{
					path: 'roles',
					name: 'Роли',
					component: () => import('@/components/Roles.vue'),
				},
				{
					path: 'lists',
					props: true,
					name: 'Списки',
					component: () => import('@/components/List.vue'),
				},
				{
					path: 'state',
					name: 'States',
					component: () => import('@/components/State.vue'),
				},
				{
					path: '/:id/editor/process/:etap',
					name: 'Этап',
					component: () => import('@/components/Etap.vue'),
				},
				{
					path: '/:id/editor/lists/:req/request',
					name: 'Запрос',
					props: true,
					component: () => import('@/components/Request.vue'),
				},
				{
					path: '/:id/editor/lists/:req/view',
					name: 'Представление',
					props: true,
					component: () => import('@/components/View.vue'),
				},
			],
		},
		{
			path: '/emulate',
			name: 'emulate',
			component: () => import('@/views/Emulate.vue'),
		},
		{
			path: '/palette',
			name: 'palette',
			component: () => import('@/views/Palette.vue'),
		},
		{
			path: '/try',
			name: 'try',
			component: () => import('@/components/Try.vue'),
		},
	],
})

const DEFAULT_TITLE = 'Конструктор приложений'
router.beforeEach((to) => {
	const store = useStore()
	document.title = store.currentNode?.data.text || DEFAULT_TITLE
	if (to.path == '/') {
		store.drawer = false
		document.title = DEFAULT_TITLE
	} else {
		document.title = store.currentNode?.data.text || DEFAULT_TITLE
	}
	store.drawer = true
})

export default router
