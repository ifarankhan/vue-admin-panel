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
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('authToken') == null) {
      next({
        path: '/login',
      })
    } else {
      next()
    }
  } else{
    next()
  }
})

export default router
