import Vue from 'vue';
import VueRouter from 'vue-router';
const modules = import.meta.globEager('../modules/*/router.js');

const o = VueRouter.prototype.replace;

VueRouter.prototype.replace = function replace(l) {
	return o.call(this, l).catch(err => err);
}

Vue.use(VueRouter);

const routes = [
	...Object.values(modules).map(r => r.router),
	{
		path: '/',
		redirect: '/helloVite'
	}
];

const router = new VueRouter({
	routes
});

router.beforeEach((to, from, next) => {
	if (to?.meta?.title) document.title = to.meta.title;
	next()
})

export default router;
