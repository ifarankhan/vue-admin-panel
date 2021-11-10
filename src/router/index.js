import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/login',
    name: 'Login',
    props: true,
    meta:{
      layout: 'visitorLayout'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/visitors/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
