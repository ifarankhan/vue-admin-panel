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
        // layout: 'mainLayout',
        requiresAuth: true,
        component: () => import('../views/authorized/client-control/Account.vue'),
      },
      {
        path: 'edit-client',
        name: 'client-control-edit-client',
        // layout: 'mainLayout',
        requiresAuth: true,
        component: () => import('../views/authorized/client-control/Edit.vue'),
      },
      {
        path: 'list',
        name: 'client-control-list',
        // layout: 'mainLayout',
        component: () => import('../views/authorized/client-control/mainList.vue'),
        requiresAuth: true,
        children: [
          {
            path: '',
            name: 'list-page',
            requiresAuth: true,
            // layout: 'mainLayout',
            component: () => import('../views/authorized/client-control/List.vue'),
          },
          {
            path: 'detail',
            name: 'client-control-list-detail',
            requiresAuth: true,
            // layout: 'mainLayout',
            component: () => import('../views/authorized/client-control/ClientDetail.vue'),
          },
          {
            path: 'add-user',
            name: 'client-control-add-user',
            requiresAuth: true,
            // layout: 'mainLayout',
            component: () => import('../views/authorized/client-control/user/AddUser.vue'),
          },
          {
            path: 'edit-user',
            name: 'client-control-edit-user',
            requiresAuth: true,
            // layout: 'mainLayout',
            component: () => import('../views/authorized/client-control/user/EditUser.vue'),
          },
          {
            path: 'view-user',
            name: 'client-control-view-user',
            requiresAuth: true,
            component: () => import('../views/authorized/client-control/user/ViewUser.vue'),
          }
        ]
      },
    ]
  },
  {
    path: '/credit-control',
    name: 'credit-control',
    props: true,
    meta:{
      layout: 'mainLayout',
      requiresAuth: true,
      title: 'credit-control',
      fullScreen: true
    },
    component: () => import('../views/authorized/credit-control/CreditControl.vue'),
    children: [
        {
          path: 'credits',
          name: 'credit-control-list',
          // layout: 'mainLayout',
          component: () => import('../views/authorized/client-control/mainList.vue'),
          requiresAuth: true,
          children: [
            {
              path: '',
              name: 'credit-list-page',
              requiresAuth: true,
              // layout: 'mainLayout',
              component: () => import('../views/authorized/credit-control/List.vue'),
            }
          ]
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

/* Default title tag */
const defaultDocumentTitle = 'Psytech Distributor panel'
router.afterEach(to => {
    /* Set document title from route meta */
    if (to.meta && to.meta.title) {
      document.title = `${to.meta.title} — ${defaultDocumentTitle}`
    } else {
      document.title = defaultDocumentTitle
    }
  
      /* Full screen mode */
  // store.dispatch('fullScreenToggle', !!to.meta.fullScreen)

    /* Dark mode */
    // store.dispatch('darkMode')
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
