import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
	{
    path: '/helloVite',
    name: 'helloVite',
    component: () => import('../modules/helloVite'),
	},
	{
		path: '/',
		redirect: '/helloVite'
	}
]

const router = createRouter({ history: createWebHashHistory(), routes })

router.beforeEach((to, from, next) => {
  next()
})

export function setupRouter(app) {
  app.use(router)
}

export default router
