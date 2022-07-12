const path = require('path');
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'

const config = {
	base: './',
	resolve: {
		alias: [
			{ find: '@', replacement: path.resolve(__dirname, './src')}
		],
		extensions: ['.vue', '.js', '.json']
	},
	server: {
		open: true,
		port: 3000,
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
				chunkFileNames(chunkInfo) {
					const s = '/[name]-[hash].js';
					const m = Object.keys(chunkInfo.modules);
					if (m[0].includes('node_modules')) return 'vendor' + s;
					const match = m[0].match(/src\/modules\/([a-zA-Z]*)\/views\/([a-zA-Z]*)/);
					if (!match) return 'js' + s;
					const [, modulesName, viewsName] = match;
					return `js/${modulesName}/${viewsName}${s}`;
				},
				manualChunks(id) {
					if (id.includes('node_modules')) {
						return id.match(/node_modules\/(.+?)\//)
							?.[1]
							?.match(/_?(.+?)@\d/)
							?.[1]
							?? 'vender';
					}
				}
			},
		}
	},
	plugins: [
		vue(),
	]
}

export default defineConfig(config);
