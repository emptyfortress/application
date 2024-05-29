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
			path: '/subcard',
			name: 'subcard',
			component: () => import('@/views/SubCard.vue'),
			props: true,
			meta: {
				transition: 'zoomin',
			},
		},
		{
			path: '/app/:id',
			name: 'app',
			component: () => import('@/views/DashBoard.vue'),
			props: true,
		},
		{
			path: '/split/:id',
			name: 'split',
			component: () => import('@/views/SplitView.vue'),
			props: true,
		},
		{
			path: '/palette',
			name: 'palette',
			component: () => import('@/views/Palette.vue'),
		},
		{
			path: '/flip',
			name: 'flip',
			component: () => import('@/components/Flip.vue'),
		},
		{
			path: '/scene',
			name: 'scene',
			component: () => import('@/views/SceneView.vue'),
			meta: {
				title: 'Сценарии',
			},
		},
		{
			path: '/role',
			name: 'role',
			component: () => import('@/views/RoleView.vue'),
			meta: {
				title: 'Роли',
			},
		},
		{
			path: '/process',
			name: 'process',
			component: () => import('@/views/ProcessView.vue'),
			meta: {
				title: 'Процессы',
			},
		},
		{
			path: '/subject',
			name: 'subject',
			component: () => import('@/views/SubjectView.vue'),
			meta: {
				title: 'Субъекты',
			},
		},
		{
			path: '/list',
			name: 'list',
			component: () => import('@/views/ListView.vue'),
			meta: {
				title: 'Реестры',
			},
		},
	],
})

const DEFAULT_TITLE = 'Конструктор приложений'
router.beforeEach((to) => {
	document.title = to.meta.title || DEFAULT_TITLE
})

export default router
