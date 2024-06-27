import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

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
		},
		{
			path: '/main',
			name: 'main',
			component: () => import('@/views/Main.vue'),
			props: true,
		},
		// {
		// 	path: '/:id',
		// 	name: 'app',
		// 	component: () => import('@/views/DashBoard.vue'),
		// 	props: true,
		// },
		{
			path: '/:id',
			name: 'main',
			component: () => import('@/views/Main.vue'),
			props: true,
		},
		{
			path: '/editor',
			name: 'editor',
			component: () => import('@/views/Editor.vue'),
			props: true,
			children: [
				{
					path: 'process',
					name: 'process',
					component: () => import('@/components/Process.vue'),
				},
				{
					path: 'forms',
					name: 'forms',
					component: () => import('@/components/Forms.vue'),
				},
				{
					path: 'roles',
					name: 'roles',
					component: () => import('@/components/Roles.vue'),
				},
				{
					path: 'list',
					name: 'list',
					component: () => import('@/components/List.vue'),
				},
			],
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
	document.title = to.meta.title || DEFAULT_TITLE
})

export default router
