/**
 * @type {import('vite').UserConfig}
 */
const path = require('path');
import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
// import legacy from '@vitejs/plugin-legacy'

const config = {
	base: './',
	resolve: {
		alias: [
			{ find: '@', replacement: path.resolve(__dirname, './src')},
			{ find: 'public', replacement: path.resolve(__dirname, './public')}
		],
		extensions: ['.vue', '.js', '.json']
	},
	server: {
		open: true,
		port: 8085,
		proxy: {
			'/api': {
				target: 'http://localhost:8080',
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, '')
			}
		},
	},
	build: {
		outDir: 'dist',
		emptyOutDir: true,
		rollupOptions: {
			output: {
				entryFileNames: 'js/main.[hash].js',
				assetFileNames: 'css/[name]-[hash][extname]',
				chunkFileNames: chunkInfo => {
					const s = '/[name]-[hash].js';
					const m = Object.keys(chunkInfo.modules);
					if (m[0].includes('node_modules')) return 'vendor' + s;
					const match = m[0].match(/src\/modules\/([a-zA-Z]*)\/views\/([a-zA-Z]*)/);
					if (!match) return 'js' + s;
					const [, modulesName, viewsName] = match;
					return `js/${modulesName}/${viewsName}${s}`;
				},
				manualChunks: {
					moment: ['moment'],
					vue: ['vue'],
					itFk: ['@it/fk-it-component'],
					fk: ['@fk/faicomponent'],
					axios: ['axios'],
					qs: ['qs'],
					'vue-router': ['vue-router'],
					vuex: ['vuex']
				}
			},
		}
	},
	plugins: [
		createVuePlugin(),
		// 兼容旧版浏览器
		// legacy({
		// 	polyfills: ['features/object']
		// })
	]
}

export default defineConfig(config);
