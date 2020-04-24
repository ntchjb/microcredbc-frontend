import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';
import { roles } from '@/constants';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      isLoginPage: true,
    },
  },
  {
    path: '/badges',
    name: 'Badges',
    component: () => {
      if (store.getters['setting/role'] === roles.issuer) {
        return import('../views/IssuerBadges.vue');
      } if (store.getters['setting/role'] === roles.earner) {
        return import('../views/EarnerBadges.vue');
      } if (store.getters['setting/role'] === roles.consumer) {
        return import('../views/ConsumerBadges.vue');
      }
      return import('../views/Loading.vue');
    },
    meta: {
      requireIdentity: true,
    },
  },
  {
    path: '/badges/:id',
    name: 'Badge',
    component: () => {
      if (store.getters['setting/role'] === roles.issuer) {
        return import('../views/IssuerBadge.vue');
      } if (store.getters['setting/role'] === roles.earner) {
        return import('../views/EarnerBadge.vue');
      } if (store.getters['setting/role'] === roles.consumer) {
        return import('../views/ConsumerBadge.vue');
      }
      return import('../views/Loading.vue');
    },
    meta: {
      requireIdentity: true,
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      requireIdentity: true,
    },
  },
  {
    path: '/badges/:id/recipients',
    name: 'Recipients',
    component: () => import('../views/IssuerRecipients.vue'),
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

router.beforeEach(async (to, from, next) => {
  if (store.getters['setting/isIdentityExist'] === false) {
    await store.dispatch('setting/loadIdentity');
    await store.dispatch('setting/loadProfile');
  }
  if (to.matched.some((record) => record.meta.requireIdentity)) {
    if (store.getters['setting/isIdentityExist'] === false) {
      next({ name: 'Home' });
      return;
    }
  } else if (to.matched.some((record) => record.meta.isLoginPage)) {
    if (store.getters['setting/isIdentityExist'] === true) {
      next({ name: 'Badges' });
      return;
    }
  }
  next();
});

export default router;
