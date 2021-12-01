import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/login',
    name: 'login',
    props: true,
    meta:{
      layout: 'visitorLayout',
      title: 'Login',
      fullScreen: true,
      requiresAuth: false
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/visitors/Login.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    props: true,
    meta:{
      layout: 'mainLayout',
      requiresAuth: true,
      title: 'Dashboard',
      fullScreen: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/authorized/Dashboard.vue')
  },
  {
    path: '/table',
    name: 'table',
    props: true,
    meta:{
      layout: 'visitorLayout',
      requiresAuth: false,
      title: 'table',
      fullScreen: true
    },
    component: () => import(/* webpackChunkName: "about" */ '@/components/TableDemo.vue')
  },
  {
    path: '/client-control',
    name: 'client-control',
    props: true,
    meta:{
      layout: 'mainLayout',
      requiresAuth: true,
      title: 'client-control',
      fullScreen: true
    },
    component: () => import('../views/authorized/client-control/ClientControl.vue'),
    children: [
      {
        path: 'create-client',
        name: 'client-control-create-client',
        component: () => import('../views/authorized/client-control/Account.vue'),
      },
    ]
  },
  {
    // path: "*",
    path: "/:catchAll(.*)",
    name: "notFound",
    redirect: '/login',
    meta: {
      requiresAuth: false
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Meta Handling
router.beforeEach((to, from, next) => {
  const USER_DATA = JSON.parse(localStorage.getItem('userData'))
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!USER_DATA?.authToken) {
      next({
        path: '/login',
      })
    } else {
      next()
    }
  } else {
    if (USER_DATA?.authToken) {
      next({
        path: '/dashboard',
      })
    } else {
      next()
    }
  }
})

export default router
