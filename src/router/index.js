import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/badge',
    name: 'Badge',
    component: () => import('../views/Badge.vue'),
    meta: {
      requireIdentity: true,
    },
  },
  {
    path: '/template',
    name: 'Template',
    component: () => import('../views/Template.vue'),
    meta: {
      requireIdentity: true,
    },
  },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requireIdentity)) {
    if (store.getters['setting/isIdentityExist'] === false) {
      next('/');
      return;
    }
  }
  next();
});

export default router;
