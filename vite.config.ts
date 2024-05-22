import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue({
			template: { transformAssetUrls },
		}),
		VueDevTools(),

		// @quasar/plugin-vite options list:
		// https://github.com/quasarframework/quasar/blob/dev/vite-plugin/index.d.ts
		quasar({
			sassVariables: 'src/quasar-variables.scss',
		}),

		createSvgIconsPlugin({
			// Specify the icon folder to be cached
			iconDirs: [path.resolve(process.cwd(), 'src/assets/img/icons')],
			// Specify symbolId format
			symbolId: 'icon-[dir]-[name]',

			/**
			 * custom insert position
			 * @default: body-last
			 */
			// inject?: 'body-last' | 'body-first'

			/**
			 * custom dom id
			 * @default: __svg__icons__dom__
			 */
			customDomId: '__svg__icons__dom__',
		}),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	assetsInclude: ['**/*.bpmn'],
})
